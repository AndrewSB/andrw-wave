export default async function handler(req, res) {
  var client_id = "ac7e09a1710b4fe1ac114d5770570f05";
  var redirect_uri = "http://localhost:3000/api/spotify-auth/login-callback";

  var state = "dc72nco59amvjq6f"; // this is a random 16 character string
  var scope =
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state streaming app-remote-control user-modify-playback-state user-read-playback-position user-read-recently-played user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      encodeURIComponent(client_id) +
      (scope ? "&scope=" + encodeURIComponent(scope) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri) +
      "&state=" +
      encodeURIComponent(state)
  );
}
