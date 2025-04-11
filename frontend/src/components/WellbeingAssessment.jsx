import React, { useState } from 'react';

export function WellbeingAssessment() {
  const [stress, setStress] = useState(5);

  const handleSave = () => {
    alert("Évaluation enregistrée !");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Auto-évaluation du Bien-être</h2>
      <label>Niveau de stress : {stress}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={stress}
        onChange={(e) => setStress(e.target.value)}
        className="w-full"
      />
      <button onClick={handleSave} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </div>
  );
}
