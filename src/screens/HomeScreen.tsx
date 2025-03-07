import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types"; // Ensure this file defines your navigation types

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide header
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: "white" }} />;
}
