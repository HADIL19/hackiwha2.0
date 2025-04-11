import React, { useState } from 'react';
import { wellbeingApi, goalsApi, emotionalJournalApi } from '../services/api';

export function CombinedWellbeingComponent() {
  // Wellbeing state
  const [stress, setStress] = useState(5);

  // Therapy goals state
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');

  // Emotional journal state
  const [entry, setEntry] = useState('');

  // Save wellbeing
  const handleSaveWellbeing = async () => {
    try {
      await wellbeingApi.create({ stress });
      alert('Évaluation de bien-être enregistrée !');
    } catch (err) {
      alert('Erreur lors de l\'enregistrement.');
      console.error(err);
    }
  };

  // Add and toggle goals
  const handleAddGoal = async () => {
    if (!goalInput) return;
    const newGoal = { text: goalInput, done: false };
    try {
      await goalsApi.create(newGoal);
      setGoals([...goals, newGoal]);
      setGoalInput('');
    } catch {
      alert("Erreur lors de l'ajout de l'objectif");
    }
  };

  const toggleDone = (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);
  };

  // Save journal
  const handleSaveJournal = async () => {
    try {
      await emotionalJournalApi.create({ entry });
      alert('Journal émotionnel enregistré !');
    } catch (err) {
      alert("Erreur lors de l'enregistrement du journal");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Wellbeing */}
      <div className="p-4 border rounded-lg shadow bg-white">
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
        <button onClick={handleSaveWellbeing} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </div>

      {/* Therapy Goals */}
      <div className="p-4 border rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Objectifs Thérapeutiques</h2>
        <input
          type="text"
          placeholder="Ex: Dire Bonjour"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleAddGoal} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>

        <ul className="mt-4">
          {goals.map((goal, i) => (
            <li key={i} className="flex justify-between py-2 border-b">
              <span className={goal.done ? 'line-through text-gray-400' : ''}>{goal.text}</span>
              <button onClick={() => toggleDone(i)} className="text-sm text-indigo-600">
                {goal.done ? 'Non Accompli' : 'Accompli'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Emotional Journal */}
      <div className="p-4 border rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Journal Émotionnel</h2>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notez ici les émotions, humeurs..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button onClick={handleSaveJournal} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
