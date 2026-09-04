import { StyleSheet, Text, View } from "react-native";

type PlanSummaryProps = {
  name: string;
  totalExpense: number;
  totalItems: number;
};

export default function PlanSummary({
  name,
  totalExpense,
  totalItems,
}: PlanSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <Text style={styles.details}>
        €{totalExpense.toFixed(2)} total • {totalItems} items
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  details: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
  },
});
