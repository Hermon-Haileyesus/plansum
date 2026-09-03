import Header from "@/components/Header";
import { globalStyles } from "@/css/styles";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>PlanSum</Text>
      <Header />

      <Link href="/plans" style={{ fontSize: 18, color: "#007bff" }}>
        Go to Plans
      </Link>
    </ScrollView>
  );
}
