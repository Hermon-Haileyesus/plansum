import { colors } from "@/css/styles";
import { Plan } from "@/storage/planstorage";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type CopyButtonProps = {
  totalmoney: number;
  plans: Plan[];
};

export default function CopyButton({ totalmoney, plans }: CopyButtonProps) {
  const handleCopy = async () => {
    // Calculate total cost of all plans
    const totalCost = plans.reduce((acc, plan) => {
      const planCost = plan.items.reduce((sum, item) => sum + item.price, 0);
      return acc + planCost;
    }, 0);

    const remaining = totalmoney - totalCost;

    // Build plan + item list
    const planList = plans
      .map((plan) => {
        const items = plan.items
          .map((item) => `   • ${item.name}: €${item.price}`)
          .join("\n");

        return `Plan: ${plan.name}\n${items}`;
      })
      .join("\n\n");

    const summary = `PlanSum Summary\n\nTotal Money: €${totalmoney}\nTotal Cost: €${totalCost}\nRemaining Budget: €${remaining}\n\n${planList}`;

    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert("Copied!", "Plan summary copied to clipboard.");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
