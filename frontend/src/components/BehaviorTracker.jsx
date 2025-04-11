import React, { useState } from 'react';
import { PlusCircle, Trash2, Calendar, Tag } from 'lucide-react';

export function BehaviorTracker() {
  const [behaviors, setBehaviors] = useState([
    { id: 1, text: 'Crise légère pendant le dîner', date: '10/04/2025', category: 'Crise' },
    { id: 2, text: 'A utilisé des mots pour demander de l\'eau', date: '09/04/2025', category: 'Progrès' }
  ]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('Crise');

  const categoryOptions = ['Crise', 'Agitation', 'Progrès', 'Social', 'Sommeil', 'Autre'];

  const handleAddBehavior = () => {
    if (!input.trim()) return;
    
    const newBehavior = {
      id: Date.now(),
      text: input,
      date: new Date().toLocaleDateString(),
      category: category
    };
    
    setBehaviors([newBehavior, ...behaviors]);
    setInput('');
  };

  const handleRemoveBehavior = (id) => {
    setBehaviors(behaviors.filter(behavior => behavior.id !== id));
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Crise': return 'bg-red-100 text-red-800';
      case 'Agitation': return 'bg-yellow-100 text-yellow-800';
      case 'Progrès': return 'bg-green-100 text-green-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      case 'Sommeil': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Suivi des Comportements</h2>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="Décrivez le comportement observé..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          onClick={handleAddBehavior} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="border rounded-md overflow-hidden">
        {behaviors.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aucun comportement enregistré
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {behaviors.map((behavior) => (
              <li key={behavior.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(behavior.category)}`}>
                        {behavior.category}
                      </span>
                    </div>
                    <p className="text-gray-800">{behavior.text}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{behavior.date}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveBehavior(behavior.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}