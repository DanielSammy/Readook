/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  onNotification: function (notification) {
    console.log("Notification: ", notification)
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
})

AppRegistry.registerComponent(appName, () => App);
