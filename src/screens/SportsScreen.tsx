import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function SportsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sports News</Text>
      <Button title="Back to Home" onPress={() => router.push("/")} />
    </View>
  );
}
