import { Plan } from "@/storage/planstorage";
import { StyleSheet, View } from "react-native";
import PlanCard from "./PlanCard";

type PlanGridProps = { totalMoney: number; plans: Plan[] };
export default function PlanGrid({ totalMoney, plans }: PlanGridProps) {
  // Calculate aggregated values from the plans
  const totalExpenses = plans
    .flatMap((plan) => plan.items)
    .reduce((sum, item) => sum + item.price, 0);

  const saving = totalMoney - totalExpenses;
  const totalItems = plans.reduce((sum, plan) => sum + plan.items.length, 0);

  return (
    <View style={styles.grid}>
      <PlanCard
        label="Total Money"
        value={totalMoney.toFixed(2)}
        color="#3fa39d"
      />
      <PlanCard
        label="Total Expenses"
        value={totalExpenses.toFixed(2)}
        color="#c33a3a"
      />
      <PlanCard label="Saving" value={saving.toFixed(2)} color="#5a9b62" />
      <PlanCard label="Total Items" value={totalItems} color="#caa202" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
