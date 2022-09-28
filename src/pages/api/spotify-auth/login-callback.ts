import { SPOTIFY_SECRET } from "../../../constants";

export default async function handler(req, res) {
  var client_id = "ac7e09a1710b4fe1ac114d5770570f05";

  var code = req.query.code || null;

  console.log("code", code);

  const reponse = await fetch("https://accounts.spotify.com/api/token", {
    body: new URLSearchParams(
      "code=" +
        code +
        "&grant_type=authorization_code&redirect_uri=http://localhost:3000/api/spotify-auth/login-callback"
    ),
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + SPOTIFY_SECRET).toString("base64"),
    },
    method: "POST",
  });

  res.json(await reponse.json());
}
