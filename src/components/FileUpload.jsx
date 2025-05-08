import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://chat-api-bot-backend.onrender.com/upload",
        formData
      );
      alert("File uploaded successfully");
    } catch (err) {
      alert("Upload failed", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
