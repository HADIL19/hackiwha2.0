import React from 'react';

export function ChildReport() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rapport de l'Enfant</h2>
      <p className="mb-4">Télécharger le rapport mensuel ou voir les statistiques du comportement de votre enfant.</p>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">
        Télécharger Rapport PDF
      </button>
    </div>
  );
}
