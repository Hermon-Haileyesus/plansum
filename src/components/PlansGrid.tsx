import { StyleSheet, View } from "react-native";
import PlanCard from "./PlanCard";

export default function PlanGrid() {
  return (
    <View style={styles.grid}>
      <PlanCard label="Total Money" value="0" color="#3fa39d" />
      <PlanCard label="Total Expenses" value="0" color="#c33a3a" />
      <PlanCard label="Saving" value="0" color="#5a9b62" />
      <PlanCard label="Total Items" value="0" color="#caa202" />
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
