import { globalStyles } from "@/css/styles";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function PlansScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Plans</Text>
      <Link href="/add-plan" style={{ fontSize: 18, color: "#007bff" }}>
        Add Plan
      </Link>
    </ScrollView>
  );
}
