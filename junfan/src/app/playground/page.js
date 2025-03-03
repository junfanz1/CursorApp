'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Notification from '@/components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const validateApiKey = async () => {
    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey.trim())
      .single();

    if (data) {
      // Update usage count silently
      await supabase
        .from('api_keys')
        .update({ usage: (data.usage || 0) + 1 })
        .eq('id', data.id);

      showNotification('Valid API key, /protected can be accessed', 'success');
      setTimeout(() => {
        router.push('/protected');
      }, 1500);
    } else {
      showNotification('Invalid API Key', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      showNotification('Please enter an API key', 'error');
      return;
    }
    await validateApiKey();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">API Playground</h1>
          <p className="mt-2 text-gray-600">Test your API key here</p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="mt-1">
                <input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your API key"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 