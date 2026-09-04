import Header from "@/components/Header";
import PlanGrid from "@/components/PlansGrid";
import { globalStyles } from "@/css/styles";
import { ScrollView, Text } from "react-native";
export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>PlanSum</Text>
      <Header />
      <PlanGrid />
    </ScrollView>
  );
}
