import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { NotificationPanel } from './components/NotificationPanel';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { ObservationForm } from './components/ObservationForm';
import { QuestionForm } from './components/QuestionForm';
import { BehaviorTracker } from './components/BehaviorTracker';
import { TherapyVideos } from './components/TherapyVideos';
import { Dashboard } from './components/Dashboard'; // ✅ Import the Dashboard
import { CombinedWellbeingComponent } from './components/CombinedWellbeingComponent'; // adjust path

const mockNotifications = [
  {
    id: '1',
    title: 'Nouveau rendez-vous',
    message: 'Rendez-vous confirmé avec Dr. Miller pour le 15 Avril',
    date: '10 Avr, 2025',
    read: false,
    type: 'appointment'
  },
  {
    id: '2',
    title: 'Message reçu',
    message: 'Nouveau message de Dr. Chen concernant la thérapie',
    date: '9 Avr, 2025',
    read: true,
    type: 'message'
  },
  {
    id: '3',
    title: 'Rapport disponible',
    message: 'Le rapport mensuel de Mars est maintenant disponible',
    date: '8 Avr, 2025',
    read: false,
    type: 'report'
  }
];

function App() {
  const handleMarkAsRead = (notificationId) => {
    console.log(`Notification ${notificationId} marked as read`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-gray-900">Tableau de Bord Parent</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
            <Route path="/parent/dashboard" element={<Dashboard />} /> {/* ✅ Dashboard Route */}
            <Route path="/parent/appointments" element={<AppointmentScheduler />} />
            <Route path="/parent/observations" element={<ObservationForm />} />
            <Route path="/parent/messages" element={<QuestionForm />} />
            <Route path="/parent/notifications" element={
              <NotificationPanel
                notifications={mockNotifications}
                onMarkAsRead={handleMarkAsRead}
              />
            } />
          
          <Route path="/parent/wellbeing" element={<CombinedWellbeingComponent />} />

            <Route path="/parent/behavior" element={<BehaviorTracker />} />
            <Route path="/parent/therapy-videos" element={<TherapyVideos />} />
            

            <Route path="*" element={<Navigate to="/parent/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
