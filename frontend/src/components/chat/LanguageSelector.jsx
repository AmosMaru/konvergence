import React, { useState } from 'react';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = [
    { id: 'en', name: 'English' },
    // { id: 'fr', name: 'French' },
    // { id: 'sw', name: 'Swahili' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Language Preferences</h2>
      <div className="space-y-2">
        {languages.map((language) => (
          <button
            key={language.id}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedLanguage === language.name
                ? 'bg-pink-50 text-pink-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => setSelectedLanguage(language.name)}
          >
            {language.name}
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          Current language: <span className="font-medium">{selectedLanguage}</span>
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector; 