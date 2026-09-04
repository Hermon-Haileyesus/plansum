import { globalStyles } from "@/css/styles";
import { Text, View } from "react-native";
import PlanSummary from "./PlanItem";

export default function RecentItems() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Items</Text>

      <PlanSummary name="Food" totalExpense={45.7} totalItems={6} />
      <PlanSummary name="Trip" totalExpense={320} totalItems={4} />
      <PlanSummary name="Bills" totalExpense={380} totalItems={3} />
    </View>
  );
}
