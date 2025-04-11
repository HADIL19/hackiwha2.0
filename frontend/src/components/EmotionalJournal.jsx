import React, { useState } from 'react';

export function EmotionalJournal() {
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    alert("Journal saved!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Journal Émotionnel</h2>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Notez ici les émotions, humeurs..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button onClick={handleSave} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </div>
  );
}
