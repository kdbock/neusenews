import { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hides unwanted header
    router.replace("/news"); // Navigate to the news feed screen
  }, [navigation, router]);

  return <View style={{ flex: 1 }} />;
}