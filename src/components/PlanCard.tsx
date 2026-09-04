import { StyleSheet, Text, View } from "react-native";

type PlanCardProps = {
  label: string;
  value: number | string;
  color: string;
};

export default function PlanCard({ label, value, color }: PlanCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
    color: "#fff",
  },
});
