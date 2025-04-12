import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  UploadCloud,
  Smile,
  User,
  Video,
  BarChart,
  Target,
  LayoutDashboard,
  LogOut,
  Settings
} from 'lucide-react';

const navigation = [
    { name: 'Tableau de Bord', icon: LayoutDashboard, path: '/parent/dashboard' },
    { name: 'Rendez-vous', icon: Calendar, path: '/parent/appointments' },
    { name: 'Messages', icon: MessageSquare, path: '/parent/messages' },
    { name: 'Observations', icon: FileText, path: '/parent/observations' },
    { name: 'Notifications', icon: Bell, path: '/parent/notifications' },
    { name: 'Comportements', icon: User, path: '/parent/behavior' },
    { name: 'Vidéos Thérapeutiques', icon: Video, path: '/parent/therapy-videos' },
    { name: 'Bien-être & Thérapie', icon: Smile, path: '/parent/wellbeing' }, // ✅ New item
  ];
  

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-semibold">T</span>
          </div>
          <span className="text-xl font-semibold text-indigo-900">Takafoul</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Marie Laurent</p>
            <p className="text-xs text-gray-500">Parent</p>
          </div>
        </div>
        <div className="flex gap-2">
          
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 w-full">
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}