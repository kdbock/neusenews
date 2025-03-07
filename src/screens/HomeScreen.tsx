import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header"; // Import your Header component
import RssItemCard from "../components/RssItemCard"; // Import your RSS card component
import fetchRSSFeed from "../services/rssService"; // Import your RSS fetching function

interface RssFeedItem {
  id: string;
  title: string;
  link: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [rssItems, setRssItems] = useState<RssFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    "https://www.neusenews.com/index?format=rss"
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const bottomNavItems = [
    { title: "News", url: "https://www.neusenews.com/index?format=rss", icon: "article" },
    { title: "Sports", url: "https://www.neusenewssports.com/news-1?format=rss", icon: "sports_soccer" },
    { title: "Political", url: "https://www.ncpoliticalnews.com/news?format=rss", icon: "balance" },
    { title: "Business", url: "https://www.magicmilemedia.com/blog?format=rss", icon: "business" },
    { title: "Subscribe", url: "https://www.neusenews.com/subscribe", icon: "subscriptions" },
  ];

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const fetchNews = async (url: string) => {
    setIsLoading(true);
    try {
      const items = await fetchRSSFeed(url);
      setRssItems(items);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBottomNavTapped = (index: number) => {
    setSelectedIndex(index);
    setSelectedCategory(bottomNavItems[index].url);

    if (index === 4) {
      navigation.navigate("WebViewScreen", { url: bottomNavItems[index].url });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onCategorySelected={setSelectedCategory} />

      {/* News Feed */}
      <View style={styles.newsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#D2982A" />
        ) : (
          <FlatList
            data={rssItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RssItemCard item={item} />}
            contentContainerStyle={styles.newsFeed}
          />
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {bottomNavItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              selectedIndex === index && styles.selectedNavItem,
            ]}
            onPress={() => onBottomNavTapped(index)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={selectedIndex === index ? "#D2982A" : "#000"}
            />
            <Text
              style={[
                styles.navText,
                selectedIndex === index && styles.selectedNavText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  newsContainer: {
    flex: 1,
    padding: 10,
  },
  newsFeed: {
    paddingBottom: 60, // Prevents content from getting hidden under bottom nav
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  navItem: {
    alignItems: "center",
    padding: 5,
  },
  selectedNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#D2982A",
  },
  navText: {
    fontSize: 12,
    color: "#000",
  },
  selectedNavText: {
    color: "#D2982A",
    fontWeight: "bold",
  },
});

export default HomeScreen;
