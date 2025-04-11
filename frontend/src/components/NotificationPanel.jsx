import React from 'react';
import { Bell, Calendar, MessageSquare, FileText } from 'lucide-react';

const iconMap = {
  appointment: Calendar,
  message: MessageSquare,
  report: FileText,
};

export function NotificationPanel({ notifications, onMarkAsRead }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];
          return (
            <div
              key={notification.id}
              className={`flex gap-4 p-3 rounded-lg transition-colors ${
                notification.read ? 'bg-gray-50' : 'bg-indigo-50'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{notification.date}</span>
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}