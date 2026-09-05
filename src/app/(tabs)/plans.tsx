import PlanSummary from "@/components/PlanItem";
import { globalStyles } from "@/css/styles";
import { getBudgetData, Plan } from "@/storage/planstorage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PlansScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);

  const loadPlans = async () => {
    const data = await getBudgetData();
    setPlans(data.plans);
  };

  useFocusEffect(
    useCallback(() => {
      loadPlans();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Plans</Text>

      {plans.length === 0 && (
        <Text style={{ marginTop: 40, color: "#94a3b8" }}>
          No plans added yet.
        </Text>
      )}
      <View style={{ marginTop: 40 }}>
        {plans.map((plan) => {
          const totalExpense = plan.items.reduce(
            (sum, item) => sum + item.price,
            0,
          );

          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() =>
                router.push({
                  pathname: "/plan/[id]",
                  params: { id: plan.id },
                })
              }
            >
              <PlanSummary
                name={plan.name}
                totalExpense={totalExpense}
                totalItems={plan.items.length}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
