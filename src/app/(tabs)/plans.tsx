import { globalStyles } from "@/css/styles";
import { ScrollView, Text } from "react-native";

export default function PlansScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Plans</Text>
    </ScrollView>
  );
}
