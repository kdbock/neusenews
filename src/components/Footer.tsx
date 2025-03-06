import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Kristy Kelly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 25, // Reduced height
    backgroundColor: "#d2982a", // Gold
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#2d2c31", // Dark gray
    fontSize: 12,
  },
});