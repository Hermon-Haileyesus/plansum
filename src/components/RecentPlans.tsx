import { globalStyles } from "@/css/styles";
import { Plan } from "@/storage/planstorage";
import { Text, View } from "react-native";
import PlanSummary from "./PlanItem";

type Props = {
  plans: Plan[];
};

export default function RecentItems({ plans }: Props) {
  if (plans.length === 0) {
    return (
      <View style={{ marginTop: 30, marginBottom: 60 }}>
        <Text style={globalStyles.sectionTitle}>Recent Items</Text>
        <Text style={{ color: "#94a3b8", marginTop: 10 }}>
          No plans added yet.
        </Text>
      </View>
    );
  }

  const recent = plans.slice(0, 5); // show latest 5 plans

  return (
    <View style={{ marginTop: 30, marginBottom: 60 }}>
      <Text style={globalStyles.sectionTitle}>Recent Items</Text>

      {recent.map((plan) => {
        const totalExpense = plan.items.reduce(
          (sum, item) => sum + item.price,
          0,
        );

        return (
          <PlanSummary
            key={plan.id}
            name={plan.name}
            totalExpense={totalExpense}
            totalItems={plan.items.length}
          />
        );
      })}
    </View>
  );
}
