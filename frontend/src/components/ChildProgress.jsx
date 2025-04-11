import React from 'react';
import { BarChart, Brain, FileWarning as Running } from 'lucide-react';

export function ChildProgress({ child }) {
  const progressItems = [
    { label: 'Compétences Sociales', value: child.progress.social, icon: BarChart },
    { label: 'Langage', value: child.progress.language, icon: Brain },
    { label: 'Motricité', value: child.progress.motor, icon: Running },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Aperçu des Progrès</h3>
      {child.name && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-500">Enfant</h4>
          <p className="text-lg font-medium">{child.name}</p>
          {child.age && <p className="text-sm text-gray-500">{child.age} ans</p>}
        </div>
      )}
      <div className="space-y-4">
        {progressItems.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm text-gray-500">{item.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}