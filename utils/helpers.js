import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const DECK_KEY = 'UDACITY:Mobile_flashcards'
export const NOTIFY_KEY = "UDACITY:Notify_key";


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFY_KEY).then(Notifications.cancelAllScheduledNotificationsAsync ())
}

function createNotification () {
    return {
        title: "Take a Quiz!",
        body: "Hey, Don't forget to study today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            vibration: true
        }
    };
    
}

export function setLocalNotification () {

    AsyncStorage.getItem(NOTIFY_KEY).then(JSON.parse).then((data) => {
        
        if (data === null) {

            Permissions.askAsync(Permissions.NOTIFICATIONS)
          
                .then(({ status }) => {
                    console.log('notification status', status)
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
        
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate()+1);
                        tomorrow.setHours(18);
                        tomorrow.setMinutes(0);
        
                        Notifications.scheduleLocalNotificationAsync (
                            createNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                        )
        
                        AsyncStorage.setItem(NOTIFY_KEY, JSON.stringify(true));
                    }

                });

            }
      })
  }