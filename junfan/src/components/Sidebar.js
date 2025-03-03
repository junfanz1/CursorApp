'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar({ isOpen, onToggle }) {
  const [isPersonalExpanded, setIsPersonalExpanded] = useState(true);

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed relative">
      {/* Close button - Positioned absolutely */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-3 w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-500 shadow-sm"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {/* Logo and Title */}
      <div className="py-4 pl-6 pr-4 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          <Image 
            src="/junfan-ai-logo.png" 
            alt="Junfan AI" 
            width={32} 
            height={32} 
            className="object-cover"
          />
        </div>
        <span className="ml-3 text-lg font-bold">Junfan AI</span>
      </div>

      {/* Personal Section */}
      <div className="px-3 py-2">
        <button
          onClick={() => setIsPersonalExpanded(!isPersonalExpanded)}
          className="flex items-center justify-between w-full px-3 py-2 text-gray-700 rounded-lg"
        >
          <span className="font-medium">Personal</span>
          <svg
            className={`w-4 h-4 transition-transform ${isPersonalExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      {isPersonalExpanded && (
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            <Link 
              href="/dashboards"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>

            <div className="pt-4">
              <p className="px-3 mb-2 text-sm text-gray-400">
                My Account
              </p>
              <Link 
                href="/account"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Account
              </Link>

              <Link 
                href="/assistant"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Research Assistant
              </Link>

              <Link 
                href="/reports"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Research Reports
              </Link>

              <Link 
                href="/playground"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                API Playground
              </Link>

              <Link 
                href="/documentation"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            N
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-700">Junfan Zhu</p>
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
} 