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
          height: 50, // Adjust height for both iOS and Android
          paddingBottom: Platform.OS === "ios" ? 20 : 0, // Add padding for iOS
          marginBottom: 5, // Margin for both iOS and Android
        },
      }}
    >
      <Tabs.Screen
        name="news"
        options={{
          title: "NEWS",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: "SPORTS",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="politics"
        options={{
          title: "POLITICS",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "BUSINESS",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="classifieds"
        options={{
          title: "CLASSIFIEDS",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}