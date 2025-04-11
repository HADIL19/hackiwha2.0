import React from 'react';
import { Lightbulb, CheckCircle, Clock } from 'lucide-react';

const mockRecommendations = [
  {
    id: '1',
    title: 'Daily Communication Exercise',
    description: 'Practice using picture cards for 15 minutes each day to improve communication skills.',
    specialist: 'Dr. Chen',
    status: 'new',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Social Interaction Activity',
    description: 'Arrange supervised playdates with peers twice a week.',
    specialist: 'Dr. Miller',
    status: 'in_progress',
    date: '2024-03-14'
  }
];

export function RecommendationsList() {
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Professional Recommendations</h3>
        <Lightbulb className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="space-y-4">
        {mockRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-md font-medium text-gray-900">
                  {recommendation.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {recommendation.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">
                    By {recommendation.specialist}
                  </span>
                  <span className="text-xs text-gray-400">
                    {recommendation.date}
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
    </div>
  );
}