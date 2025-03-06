import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Share } from "react-native";
import { useLocalSearchParams, useRouter, usePathname } from "expo-router";
import { XMLParser } from "fast-xml-parser"; 
import { Ionicons } from "@expo/vector-icons";

const RSS_FEEDS = {
  "/news": "https://www.neusenews.com/index?format=rss",
  "/sports": "https://www.neusenewssports.com/news-1?format=rss",
  "/politics": "https://www.ncpoliticalnews.com/news?format=rss",
  "/business": "https://www.magicmilemedia.com/blog?format=rss",
  "/classifieds": "https://www.neusenews.com/index/category/Classifieds?format=rss",
};

export default function RssFetcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      setLoading(true);
      const feedURL = RSS_FEEDS[pathname] || RSS_FEEDS["/news"];

      try {
        const response = await fetch(feedURL);
        const data = await response.text();
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsedData = parser.parse(data);
        const items = parsedData.rss?.channel?.item || [];

        setArticles(items.map((item) => ({
          title: item.title || "No Title",
          link: item.link || "#",
          description: item.description || "No description available",
          image: item["media:content"]?.["@_url"] || "",
        })));
      } catch (error) {
        console.error("RSS Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, [pathname]);

  if (loading) return <ActivityIndicator size="large" color="#d2982a" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <TouchableOpacity>
              {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
