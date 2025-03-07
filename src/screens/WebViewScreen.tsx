import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

interface WebViewScreenProps {
  url: string;
  disableJavaScript?: boolean;
}

const WebViewScreen: React.FC = () => {
  const route = useRoute();
  const { url, disableJavaScript = false } = route.params as WebViewScreenProps;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="large" color="#D2982A" style={styles.loader} />
      )}
      <WebView
        source={{ uri: url }}
        javaScriptEnabled={!disableJavaScript}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={(error) => console.error("WebView Error:", error)}
        injectedJavaScript={`
          var images = document.getElementsByTagName('img');
          for (var i = 0; i < images.length; i++) {
            images[i].style.maxWidth = '100%';
            images[i].style.height = 'auto';
          }
        `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default WebViewScreen;
