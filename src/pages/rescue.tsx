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
