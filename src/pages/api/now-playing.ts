import {
  LISTENBRAINZ_KEY,
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_SECRET,
} from "../../constants";
import { spotifyAPI } from "../../lib/spotify";
import type { INowPlaying } from "../../lib/types";

export type INowPlayingResponse = {
  isPlaying: boolean;
  track: {
    track_name: string;
    artist_name: string;
    additional_info: {
      origin_url: string;
    };
  };
};

async function listenBrainzNowPlaying(): Promise<INowPlayingResponse> {
  const nowPlaying = await fetch(
    "https://api.listenbrainz.org/1/user/asbreckenridge/playing-now",
    {
      headers: {
        "User-Agent":
          "https://andrew.energy now playing (asbreckenridge@me.com)",
        Authorization: `Token ${LISTENBRAINZ_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (nowPlaying.status !== 200) {
    throw new Error("No data returned from ListenBrainz");
  } else {
    const nowPlayingJSON = await nowPlaying.json();
    const nowPlayingData = nowPlayingJSON.payload.listens;
    return {
      isPlaying: nowPlayingData.isPlaying,
      track: nowPlayingData.track_metadata,
    };
  }
}

async function spotifyAuth(): Promise<any> {
  var client_id = "ac7e09a1710b4fe1ac114d5770570f05";
  // const kvStoreUrl = "https://keyvalue.immanuel.co/api/KeyVal/GetValue/9e4jit20";

  // const apiKey = await fetch(`${kvStoreUrl}/a`);
  // const t = await fetch(`${kvStoreUrl}/t`);

  // if (new Date(await t.text()) > new Date()) {
  //   return await apiKey.text();
  // } else {
  //   // refresh, then update, then return
  //   const rt = await fetch(`${kvStoreUrl}/r`);

  console.log("about to refresh spotify");

  const refreshResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + SPOTIFY_SECRET).toString("base64"),
      },
      body: new URLSearchParams(
        "grant_type=refresh_token&refresh_token=" + SPOTIFY_REFRESH_TOKEN
      ),
      method: "POST",
    }
  );
  const refreshJSON = await refreshResponse.json();

  console.log("refreshed spotify", refreshResponse.status, refreshJSON);

  const newApiKey = refreshJSON.access_token;
  return newApiKey;
}

async function spotifyNowPlaying(): Promise<any> {
  try {
    const nowPlayingJSON = await spotifyAPI(
      "https://api.spotify.com/v1/me/player/currently-playing"
    );

    console.log("spotify JSON", nowPlayingJSON);

    if (nowPlayingJSON.error) {
      throw new Error("No data returned from Spotify");
    } else {
      return {
        item: {
          is_playing: nowPlayingJSON.is_playing,
          progress_ms: nowPlayingJSON.progress_ms,
          track: nowPlayingJSON.item.name,
          artist: nowPlayingJSON.item.artists[0].name,
          album: nowPlayingJSON.item.album.name,
          album_art: nowPlayingJSON.item.album.images[0].url,
          external_link: nowPlayingJSON.item.external_urls.spotify,
          preview_url: nowPlayingJSON.item.preview_url,
        } as INowPlaying,
      };
    }
  } catch (error) {
    console.error("error", error);
    return {};
  }
}

export default async function handler(req, res) {
  try {
    const nowPlaying = await spotifyNowPlaying();
    res.status(200).json(nowPlaying);
  } catch (error) {
    res.status(500).json({ error });
  }
}
