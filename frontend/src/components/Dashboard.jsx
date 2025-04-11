import React, { useState, useEffect } from 'react';
import { ChildProgress } from './ChildProgress';
import { RecommendationsList } from './RecommendationsList';
import { progressApi, recommendationsApi } from '../services/api';

export function Dashboard() {
  const [childData, setChildData] = useState({
    name: 'Alex Laurent',
    age: 6,
    progress: {
      social: 65,
      language: 48,
      motor: 72
    }
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch progress data from the backend
        const progressData = await progressApi.getAll();
        
        if (progressData && progressData.length > 0) {
          // Get the latest progress entry
          const latestProgress = progressData[progressData.length - 1];
          
          // Update child's progress data
          setChildData(prevData => ({
            ...prevData,
            progress: {
              social: latestProgress.social,
              language: latestProgress.language,
              motor: latestProgress.motor
            }
          }));
        }
        
        // Fetch recommendations
        const recommendationsData = await recommendationsApi.getAll();
        setRecommendations(recommendationsData);
        
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Erreur</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Bienvenue dans le Tableau de Bord Parent</h2>
        <p className="text-gray-600">
          Suivez les progrès de votre enfant, gérez les rendez-vous et accédez aux recommandations des spécialistes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child Progress Card */}
        <ChildProgress child={childData} />
        
        {/* Recommendations Card */}
        <RecommendationsList recommendations={recommendations} />
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Prochaines Étapes</h3>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <span>Planifiez votre prochain rendez-vous avec Dr. Miller</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <span>Complétez l'évaluation hebdomadaire du comportement</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <span>Consultez les nouvelles vidéos thérapeutiques</span>
          </li>
        </ul>
      </div>
    </div>
  );
}