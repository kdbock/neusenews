import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d2982a",    // Gold active color
        tabBarInactiveTintColor: "#2d2c31",  // Dark gray inactive color
        tabBarStyle: {
          backgroundColor: "#ffffff",
          position: 'absolute', // Ensure the tab bar is positioned at the bottom
          bottom: 0, // Align the tab bar to the bottom
          height: Platform.OS === "ios" ? 50 : 50, // Adjust height for iOS
          paddingBottom: Platform.OS === "ios" ? 20 : 0, // Add padding for iOS
          marginBottom: Platform.OS === "android" ? 5 : 5,
        },
      }}
    >
      <Tabs.Screen
        name="news"
        options={{
          title: "NEWS",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: "SPORTS",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="politics"
        options={{
          title: "POLITICS",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "BUSINESS",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="classifieds"
        options={{
          title: "CLASSIFIEDS",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}