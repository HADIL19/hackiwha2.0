import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Calendar, Tag } from 'lucide-react';
import { behaviorsApi } from '../services/api';

export function BehaviorTracker() {
  const [behaviors, setBehaviors] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('Crise');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryOptions = ['Crise', 'Agitation', 'Progrès', 'Social', 'Sommeil', 'Autre'];

  // Fetch existing behaviors
  useEffect(() => {
    async function fetchBehaviors() {
      try {
        setIsLoading(true);
        const data = await behaviorsApi.getAll();
        setBehaviors(data);
        setError(null);
      } catch (err) {
        setError('Failed to load behaviors');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBehaviors();
  }, []);

  const handleAddBehavior = async () => {
    if (!input.trim()) return;
    
    try {
      setIsLoading(true);
      
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format for MySQL
      
      // Create new behavior in the backend
      const newBehavior = await behaviorsApi.create({
        text: input.trim(),
        date: today,
        category: category
      });
      
      // Update state with new behavior
      setBehaviors([newBehavior, ...behaviors]);
      setInput('');
      setError(null);
      
    } catch (err) {
      setError('Failed to add behavior');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBehavior = async (id) => {
    // In a real app, you would add an API endpoint to delete behaviors
    // For now, we'll just remove it from the local state
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

  // Function to format date consistently
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Suivi des Comportements</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
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
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          onClick={handleAddBehavior} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:bg-indigo-300"
          disabled={isLoading || !input.trim()}
        >
          <PlusCircle className="w-4 h-4" />
          {isLoading ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </div>

      <div className="border rounded-md overflow-hidden">
        {isLoading && behaviors.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Chargement des comportements...
          </div>
        ) : behaviors.length === 0 ? (
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
                      <span>{formatDate(behavior.date)}</span>
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