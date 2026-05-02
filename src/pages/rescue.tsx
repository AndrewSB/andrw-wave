import React, { useEffect, useMemo, useRef, useState } from "react";
import CryptoJS from "crypto-js";

const encrypted =
  "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";

function decryptHtml(password: string) {
  if (!password) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    return bytes.toString(CryptoJS.enc.Utf8) || null;
  } catch {
    return null;
  }
}

export default function Rescue() {
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const decryptedHtml = useMemo(() => decryptHtml(password), [password]);

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

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
        ref={passwordInputRef}
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
      {decryptedHtml && (
        <div
          dangerouslySetInnerHTML={{ __html: decryptedHtml }}
          style={{ marginTop: "20px", width: "80%", textAlign: "center" }}
        />
      )}
    </div>
  );
}
