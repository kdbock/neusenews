import { AppRegistry } from 'react-native';
import App from './App';  // <-- This will automatically resolve to App.tsx
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
