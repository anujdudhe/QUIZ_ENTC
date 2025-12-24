import { useCallback, useEffect } from 'react';

export const useNotifications = () => {
  const requestNotificationPermission = useCallback(async () => {
    try {
      if (!('Notification' in window)) {
        console.log('This browser does not support desktop notifications');
        return false;
      }

      if (Notification.permission === 'granted') {
        return true;
      }

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }

      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  const showNotification = useCallback(
    async (title: string, options?: NotificationOptions) => {
      const hasPermission = await requestNotificationPermission();
      
      if (!hasPermission) return;

      try {
        // Show notification
        const notification = new Notification(title, {
          icon: '/favicon.ico', // Make sure to have a favicon.ico in your public folder
          badge: '/favicon.ico',
          ...options,
        });

        // Close notification after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);

        return notification;
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    },
    [requestNotificationPermission]
  );

  // Request permission when component mounts
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  return {
    requestNotificationPermission,
    showNotification,
  };
};
