import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleWebView() {
  const router = useRouter();
  const { url } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <WebView source={{ uri: url }} />
    </View>
  );
}

ArticleWebView.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#d2982a",
    paddingTop: Platform.OS === "ios" ? 5 : 10,
    paddingBottom: 2,
    paddingLeft: 15,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
