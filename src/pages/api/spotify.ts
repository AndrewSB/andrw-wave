import { spotifyAPI } from "../../lib/spotify";

async function spotifyInfo(): Promise<any> {
  const tracks = await spotifyAPI(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term"
  );
  const artists = await spotifyAPI(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term"
  );

  const topTracks = tracks.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists[0].name,
    };
  });
  const topArtists = artists.items.map((item) => {
    return {
      name: item.name,
    };
  });

  return {
    tracks: topTracks,
    artists: topArtists,
  };
}

export default async function handler(req, res) {
  try {
    res.status(200).json(await spotifyInfo());
  } catch (error) {
    res.status(500).json({ error });
  }
}
