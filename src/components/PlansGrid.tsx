import { StyleSheet, View } from "react-native";
import PlanCard from "./PlanCard";

export default function PlanGrid() {
  return (
    <View style={styles.grid}>
      <PlanCard label="Total Money" value="0" color="#4ecdc4" />
      <PlanCard label="Total Expenses" value="0" color="#ff6b6b" />
      <PlanCard label="Saving" value="0" color="#6bcb77" />
      <PlanCard label="Total Items" value="0" color="#ffd93d" />
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
