import React, { useState } from 'react';
import { FiArrowLeft, FiEye, FiGlobe, FiMessageSquare, FiDatabase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    communityProfile: true,
    displayRealName: false,
    showActivityStatus: false,
    shareHealthcareData: true,
    anonymizedResearch: false,
    thirdPartyServices: false,
    marketingCommunications: true,
    educationalContent: true,
    researchInvitations: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-gray-200'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
          <FiArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Privacy Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Profile Visibility */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiEye className="text-gray-600" />
            <h2 className="text-lg font-semibold">Profile Visibility</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Community Forum Profile</p>
                <p className="text-sm text-gray-500">Allow other community members to see your profile information</p>
              </div>
              <ToggleSwitch enabled={settings.communityProfile} onChange={() => handleToggle('communityProfile')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Display Real Name</p>
                <p className="text-sm text-gray-500">Show your real name instead of username in community interactions</p>
              </div>
              <ToggleSwitch enabled={settings.displayRealName} onChange={() => handleToggle('displayRealName')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Show Activity Status</p>
                <p className="text-sm text-gray-500">Let others see when you're active on the platform</p>
              </div>
              <ToggleSwitch enabled={settings.showActivityStatus} onChange={() => handleToggle('showActivityStatus')} />
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiGlobe className="text-gray-600" />
            <h2 className="text-lg font-semibold">Data Sharing</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Share Data with Healthcare Providers</p>
                <p className="text-sm text-gray-500">Allow your healthcare providers to access your test results and medical history</p>
              </div>
              <ToggleSwitch enabled={settings.shareHealthcareData} onChange={() => handleToggle('shareHealthcareData')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Anonymized Research Data</p>
                <p className="text-sm text-gray-500">Help improve women's health by sharing anonymized data for research purposes</p>
              </div>
              <ToggleSwitch enabled={settings.anonymizedResearch} onChange={() => handleToggle('anonymizedResearch')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Third-Party Services</p>
                <p className="text-sm text-gray-500">Allow integration with third-party health and wellness apps</p>
              </div>
              <ToggleSwitch enabled={settings.thirdPartyServices} onChange={() => handleToggle('thirdPartyServices')} />
            </div>
          </div>
        </div>

        {/* Communication & Marketing */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiMessageSquare className="text-gray-600" />
            <h2 className="text-lg font-semibold">Communication & Marketing</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Marketing Communications</p>
                <p className="text-sm text-gray-500">Receive personalized product recommendations and promotions</p>
              </div>
              <ToggleSwitch enabled={settings.marketingCommunications} onChange={() => handleToggle('marketingCommunications')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Educational Content</p>
                <p className="text-sm text-gray-500">Receive educational articles and resources related to women's health</p>
              </div>
              <ToggleSwitch enabled={settings.educationalContent} onChange={() => handleToggle('educationalContent')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Research Study Invitations</p>
                <p className="text-sm text-gray-500">Be notified about opportunities to participate in women's health research</p>
              </div>
              <ToggleSwitch enabled={settings.researchInvitations} onChange={() => handleToggle('researchInvitations')} />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiDatabase className="text-gray-600" />
            <h2 className="text-lg font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-900">Marketing Communications</p>
              <p className="text-sm text-gray-500 mb-3">Get a copy of all your personal data and health records stored on our platform</p>
              <button className="text-pink-600 text-sm font-medium hover:text-pink-700">
                Request Data Export
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Data Retention</p>
              <p className="text-sm text-gray-500 mb-3">We retain your data according to our privacy policy. You can request deletion at any time.</p>
              <div className="flex gap-4">
                <button className="text-pink-600 text-sm font-medium hover:text-pink-700">
                  Request Data Export
                </button>
                <button className="text-red-600 text-sm font-medium hover:text-red-700">
                  Request Data Deletion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings; 