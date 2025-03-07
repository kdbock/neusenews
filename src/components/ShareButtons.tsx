import React from "react";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

interface Props {
  shareUrl: string;
}

const ShareButtons: React.FC<Props> = ({ shareUrl }) => {
  const share = async (url: string) => {
    if (!shareUrl) {
      Alert.alert("Invalid URL", "This link is not shareable.");
      return;
    }
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          share(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
        }
      >
        <MaterialIcons name="facebook" size={24} color="#1877F2" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          share(`https://www.threads.net/share?url=${encodeURIComponent(shareUrl)}`)
        }
      >
        <MaterialIcons name="alternate-email" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          share(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`)
        }
      >
        <MaterialIcons name="reddit" size={24} color="#FF5700" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

export default ShareButtons;
