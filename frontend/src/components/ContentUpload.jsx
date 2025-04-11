import React, { useState } from 'react';

export function ContentUpload() {
  const [FILE, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    alert('File uploaded successfully!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload de Contenus</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        {FILE && <p>Selected file: {FILE.name}</p>}
        <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
