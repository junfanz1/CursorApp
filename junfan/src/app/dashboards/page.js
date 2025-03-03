'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    type: 'development',
    monthlyLimit: 1000
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    setApiKeys([
      { id: 1, name: 'sdfg', type: 'dev', usage: '32', key: 'tvly-dev-**********************' },
      { id: 2, name: 'hello', type: 'dev', usage: '32', key: 'tvly-dev-**********************' },
      { id: 3, name: 'hey!', type: 'dev', usage: '32', key: 'tvly-dev-**********************' },
    ]);
  }, []);

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white transform transition-all duration-500 ease-in-out z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  };

  const handleCreateKey = async () => {
    try {
      const newKey = {
        id: apiKeys.length + 1,
        name: newKeyData.name,
        type: newKeyData.type === 'development' ? 'dev' : 'prod',
        usage: '0',
        key: `tvly-${newKeyData.type === 'development' ? 'dev' : 'prod'}-**********************`
      };
      setApiKeys([...apiKeys, newKey]);
      setIsCreating(false);
      setNewKeyData({ name: '', type: 'development', monthlyLimit: 1000 });
      showNotification('API key created successfully!');
    } catch (error) {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showNotification('API key deleted successfully!');
    } catch (error) {
      showNotification('Failed to delete API key', 'error');
    }
  };

  const handleCopyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key.replace('**********************', 'abcdef1234567890abcdef'));
      showNotification('API key copied to clipboard!');
    } catch (error) {
      showNotification('Failed to copy API key', 'error');
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Toggle button when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-20 p-2 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className="flex-1 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <span>Pages</span>
              <span>/</span>
              <span>Overview</span>
            </div>
            
            {/* Plan Section */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-gray-600 mb-2">CURRENT PLAN</div>
                  <h1 className="text-2xl font-bold mb-4">Researcher</h1>
                  <div className="text-gray-600 mb-2">API Usage</div>
                  <div className="text-lg">32/1,000 Credits</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                    <span className="text-gray-600">Pay as you go</span>
                  </div>
                </div>
                <button className="bg-white px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50">
                  Manage Plan
                </button>
              </div>
            </div>

            {/* API Keys Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">API Keys</h2>
                  <p className="text-gray-600">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
                </div>
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                  + Create New Key
                </button>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search keys..."
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />

              {/* Table */}
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-gray-500">NAME</th>
                    <th className="text-left py-3 text-gray-500">TYPE</th>
                    <th className="text-left py-3 text-gray-500">USAGE</th>
                    <th className="text-left py-3 text-gray-500">KEY</th>
                    <th className="text-left py-3 text-gray-500">OPTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b">
                      <td className="py-4">{apiKey.name}</td>
                      <td className="py-4">
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                          {apiKey.type}
                        </span>
                      </td>
                      <td className="py-4">{apiKey.usage}</td>
                      <td className="py-4 font-mono text-sm">
                        {visibleKeys[apiKey.id] ? apiKey.key.replace('**********************', 'abcdef1234567890abcdef') : apiKey.key}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-4 text-gray-500">
                          <button 
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="hover:text-gray-700"
                            title="Toggle visibility"
                          >
                            {visibleKeys[apiKey.id] ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                            )}
                          </button>
                          <button 
                            onClick={() => handleCopyKey(apiKey.key)}
                            className="hover:text-gray-700"
                            title="Copy to clipboard"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                            </svg>
                          </button>
                          <button 
                            className="hover:text-gray-700"
                            onClick={() => {
                              showNotification('Edit functionality coming soon!');
                            }}
                            title="Edit key"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this API key?')) {
                                handleDeleteKey(apiKey.id);
                              }
                            }}
                            className="hover:text-red-600"
                            title="Delete key"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Key Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-semibold mb-4">Create a new API key</h2>
              <p className="text-gray-600 mb-6">Enter a name and limit for the new API key.</p>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Key Name</label>
                <p className="text-gray-500 text-sm mb-2">— A unique name to identify this key</p>
                <input
                  type="text"
                  value={newKeyData.name}
                  onChange={(e) => setNewKeyData({...newKeyData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Key Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Key Type</label>
                <p className="text-gray-500 text-sm mb-2">— Choose the environment for this key</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={newKeyData.type === 'production'}
                      onChange={() => setNewKeyData({...newKeyData, type: 'production'})}
                      className="text-blue-500"
                    />
                    <span>Production</span>
                    <span className="text-gray-500 text-sm ml-2">Rate limited to 1,000 requests/minute</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={newKeyData.type === 'development'}
                      onChange={() => setNewKeyData({...newKeyData, type: 'development'})}
                      className="text-blue-500"
                    />
                    <span>Development</span>
                    <span className="text-gray-500 text-sm ml-2">Rate limited to 100 requests/minute</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                  />
                  <span>Limit monthly usage*</span>
                </label>
                <input
                  type="number"
                  value={newKeyData.monthlyLimit}
                  onChange={(e) => setNewKeyData({...newKeyData, monthlyLimit: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                />
                <p className="text-gray-500 text-sm mt-2">
                  * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}