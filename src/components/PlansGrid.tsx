import { StyleSheet, View } from "react-native";
import PlanCard from "./PlanCard";
type PlanGridProps = {
  totalMoney: number;
  totalExpenses: number;
  saving: number;
  totalItems: number;
};

export default function PlanGrid({
  totalMoney,
  totalExpenses,
  saving,
  totalItems,
}: PlanGridProps) {
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
