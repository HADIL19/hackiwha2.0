import React, { useState } from 'react';

export function TherapyGoals() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState('');

  const handleAddGoal = () => {
    if (!input) return;
    setGoals([...goals, { text: input, done: false }]);
    setInput('');
  };

  const toggleDone = (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Objectifs Thérapeutiques</h2>
      <input
        type="text"
        placeholder="Ex: Dire Bonjour"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
  );
}
