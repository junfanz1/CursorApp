'use client';

export default function Notification({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg transition-all duration-500 transform ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      <div className="flex items-center">
        {type === 'success' && (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 