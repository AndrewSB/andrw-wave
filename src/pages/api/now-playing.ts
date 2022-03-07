const LISTENBRAINZ_KEY = process.env.LISTENBRAINZ_KEY;
const SPOTIFY_KEY = process.env.SPOTIFY_KEY;

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

async function spotifyNowPlaying(): Promise<any> {
  const nowPlaying = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        "User-Agent":
          "https://andrew.energy now playing (asbreckenridge@me.com)",
        Authorization: `Bearer ${SPOTIFY_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const nowPlayingJSON = await nowPlaying.json();
  console.log("spotify JSON", nowPlayingJSON);

  if (nowPlayingJSON.error) {
    throw new Error("No data returned from Spotify");
  } else {
    return {
      isPlaying: nowPlayingJSON.is_playing,
      progress_ms: nowPlayingJSON.progress_ms,
      track: nowPlayingJSON.item.name,
      artist: nowPlayingJSON.item.artists[0].name,
      album: nowPlayingJSON.item.album.name,
      album_art: nowPlayingJSON.item.album.images[0].url,
    };
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
