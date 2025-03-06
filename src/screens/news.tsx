import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import { useSearchParams } from "react-router-dom";
import { Ionicons } from "@expo/vector-icons";
import fetchRSSFeed, { Article } from "../utils/fetchRSSFeed";

export default function NewsScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle possible string | string[] from route params
  const [params] = useSearchParams();
  const feedUrlParam = params.get('rssUrl');
  const feedUrl = Array.isArray(feedUrlParam)
    ? feedUrlParam[0]
    : feedUrlParam || "https://www.neusenews.com/index?format=rss";

  useEffect(() => {
    fetchRSSFeed(feedUrl)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("RSS Fetch Error:", error);
        setLoading(false);
      });
  }, [feedUrl]);

  // Opens the link in an in-app browser
  const openInAppBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  // Opens a share link in an in-app browser (Facebook, Twitter, Reddit)
  const openShareLink = (platform: string, url: string) => {
    const text = encodeURIComponent("Check out this article!");
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = url;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`;
        break;
      default:
        shareUrl = url;
        break;
    }
    WebBrowser.openBrowserAsync(shareUrl);
  };

  // Copies the link to the clipboard
  const copyLink = async (url: string) => {
    await Clipboard.setStringAsync(url);
    Alert.alert("Link copied!", url);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color="#d2982a"
        style={{ marginTop: 20 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <TouchableOpacity onPress={() => openInAppBrowser(item.link)}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>

            {/* Button row with Read More and share icons */}
            <View style={styles.buttonRow}>
              {/* "Read More" on the left */}
              <TouchableOpacity onPress={() => openInAppBrowser(item.link)}>
                <Text style={styles.readMore}>Read More</Text>
              </TouchableOpacity>

              {/* Round share icons on the right */}
              <View style={styles.shareIconsRow}>
                <TouchableOpacity
                  style={[styles.iconButton, styles.facebook]}
                  onPress={() => openShareLink("facebook", item.link)}
                >
                  <Ionicons name="logo-facebook" size={12} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, styles.twitter]}
                  onPress={() => openShareLink("twitter", item.link)}
                >
                  <Ionicons name="logo-twitter" size={12} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, styles.reddit]}
                  onPress={() => openShareLink("reddit", item.link)}
                >
                  <Ionicons name="logo-reddit" size={12} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, styles.copy]}
                  onPress={() => copyLink(item.link)}
                >
                  <Ionicons name="copy-outline" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
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
    // optional shadow for Android
    elevation: 3,
    // optional shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  readMore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d2982a",
  },
  shareIconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 24,         // smaller circle
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  facebook: {
    backgroundColor: "#4267B2",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
  },
  reddit: {
    backgroundColor: "#FF5700",
  },
  copy: {
    backgroundColor: "#2d2c31",
  },
});