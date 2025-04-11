import React from 'react';
import { Lightbulb, CheckCircle, Clock } from 'lucide-react';

export function RecommendationsList({ recommendations = [] }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new':
        return 'Nouvelle';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Complétée';
      default:
        return 'Inconnue';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recommandations Professionnelles</h3>
        <Lightbulb className="w-5 h-5 text-indigo-600" />
      </div>
      
      {recommendations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune recommandation disponible pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-md font-medium text-gray-900">
                      {recommendation.title}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {getStatusText(recommendation.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">
                      Par {recommendation.specialist}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(recommendation.date)}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  {getStatusIcon(recommendation.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}