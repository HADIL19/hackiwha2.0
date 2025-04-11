import React, { useState } from 'react';
import { FileText, Upload, Send } from 'lucide-react';
import { observationsApi } from '../services/api';
export function ObservationForm() {
  const [observation, setObservation] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await observationsApi.create(observation, files);
      alert('Observation submitted successfully');
      setObservation('');
      setFiles([]);
    } catch (err) {
      alert('Failed to submit observation');
      console.error(err);
    }
  };
  

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Add Observation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observation Notes
          </label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Write your observations here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Upload files (images, videos, documents)
              </span>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">{files.length} files selected</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Observation
        </button>
      </form>
    </div>
  );
}