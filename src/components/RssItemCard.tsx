import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

interface RssFeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

interface Props {
  item: RssFeedItem;
}

const RssItemCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();

  const openWebView = () => {
    if (!item.link) {
      Alert.alert("Invalid URL", "This article link is not available.");
      return;
    }
    navigation.navigate("WebViewScreen", { url: item.link });
  };

  const shareArticle = async () => {
    try {
      await Sharing.shareAsync(item.link, {
        dialogTitle: "Check out this article on Neuse News!",
      });
    } catch (error) {
      Alert.alert("Sharing Error", "Unable to share this article.");
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={openWebView}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          onError={() => console.warn("Image failed to load")}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <TouchableOpacity onPress={openWebView}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.actions}>
          {/* Social Share Buttons */}
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={shareArticle}>
              <MaterialIcons name="share" size={24} color="#D2982A" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                shareArticle(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.link)}`
                )
              }
            >
              <MaterialIcons name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                shareArticle(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(item.link)}`
                )
              }
            >
              <MaterialIcons name="alternate-email" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                shareArticle(
                  `https://www.reddit.com/submit?url=${encodeURIComponent(item.link)}`
                )
              }
            >
              <MaterialIcons name="reddit" size={24} color="#FF5700" />
            </TouchableOpacity>
          </View>

          {/* Read More Button */}
          <TouchableOpacity onPress={openWebView}>
            <Text style={styles.readMore}>Read More →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2C31",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  iconRow: {
    flexDirection: "row",
  },
  readMore: {
    color: "#D2982A",
    fontWeight: "bold",
  },
});

export default RssItemCard;
