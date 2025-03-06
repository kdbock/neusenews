import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import fetchRSSFeed, { Article } from "../utils/fetchRSSFeed";

export default function SportsScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSSFeed("https://www.neusenewssports.com/news-1?format=rss")
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("RSS Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  const openInAppBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  if (loading) return <ActivityIndicator size="large" color="#d2982a" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <TouchableOpacity onPress={() => openInAppBrowser(item.link)}>
              {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openInAppBrowser(item.link)}>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  articleContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d2c31",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#2d2c31",
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d2982a",
    marginTop: 5,
  },
});
