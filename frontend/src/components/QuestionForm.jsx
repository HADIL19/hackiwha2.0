import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Behavior',
    'Education',
    'Medical',
    'Therapy',
    'Daily Activities',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ question, category });
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Type your question here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Question
        </button>
      </form>
    </div>
  );
}