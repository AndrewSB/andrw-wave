import React, { useState } from "react";
import CryptoJS from "crypto-js";

// use this if you need to change the encrypted div
const encryptedFactory = CryptoJS.AES.encrypt(
  `the div you want to encrypt, as vanilla HTML`,
  "the password you'll enter on the website"
).toString();

// output from `encryptedFactory` for a valid HTML payload i've encrypted
const encrypted =
  "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";

export default function Rescue() {
  const [password, setPassword] = useState("");

  const decryptDiv = () => {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    try {
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      // likely invalid password
      return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "20px",
      }}
    >
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        style={{
          padding: "10px",
          fontSize: "20px",
          marginBottom: "20px",
          width: "300px",
          border: "1px solid black",
        }}
      />
      {password === "" ? (
        <p style={{ color: "red" }}>enter password</p>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: decryptDiv() }}
          style={{ marginTop: "20px", width: "80%", textAlign: "center" }}
        />
      )}
    </div>
  );
}
