import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens (ensure these exist and the filenames match)
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import PrimaryLandingScreen from './src/screens/PrimaryLandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import BusinessScreen from './src/screens/BusinessScreen';
import PoliticsScreen from './src/screens/PoliticsScreen';
import SportsScreen from './src/screens/SportsScreen';
import ClassifiedsScreen from './src/screens/ClassifiedsScreen';
import ArticleWebView from './src/screens/ArticleWebView';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

// If you're using TypeScript for strong typing, define the routes here:
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  PrimaryLanding: undefined;
  Home: undefined;
  Business: undefined;
  Politics: undefined;
  Sports: undefined;
  Classifieds: undefined;
  ArticleWebView: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PrimaryLanding" 
          component={PrimaryLandingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
        <Stack.Screen 
          name="Business" 
          component={BusinessScreen} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
        <Stack.Screen 
          name="Politics" 
          component={PoliticsScreen} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
        <Stack.Screen 
          name="Sports" 
          component={SportsScreen} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
        <Stack.Screen 
          name="Classifieds" 
          component={ClassifiedsScreen} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
        <Stack.Screen 
          name="ArticleWebView" 
          component={ArticleWebView} 
          options={{ 
            header: () => <Header /> 
          }} 
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default App;