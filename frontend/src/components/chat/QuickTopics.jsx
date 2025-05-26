import React from 'react';

const QuickTopics = () => {
  const topics = [
    { id: 1, title: 'Period Pain' },
    { id: 2, title: 'Irregular Periods' },
    { id: 3, title: 'Birth Control' },
    { id: 4, title: 'STI Symptoms' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Quick Topics</h2>
      <div className="space-y-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-colors"
          >
            {topic.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickTopics; 