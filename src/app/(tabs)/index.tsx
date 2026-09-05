import Header from "@/components/Header";
import PlanGrid from "@/components/PlansGrid";
import RecentItems from "@/components/RecentPlans";
import TotalMoneyInput from "@/components/TotalMoneyInput";
import { colors, globalStyles } from "@/css/styles";
import { getBudgetData, Plan, setTotalMoney } from "@/storage/planstorage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import ViewShot from "react-native-view-shot";

export default function HomeScreen() {
  const [totalMoney, setTotalMoneystate] = useState(0);
  const [showBudgetInput, setShowBudgetInput] = useState(false);
  const viewShotRef = useRef<any>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  const loadPlans = async () => {
    const data = await getBudgetData();
    setTotalMoneystate(data.totalMoney);
    setPlans(data.plans);
    console.log("Loaded plans:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadPlans();
    }, []),
  );
  const handleSaveTotalMoney = async (value: number) => {
    await setTotalMoney(value); // SAVE TO STORAGE
    setTotalMoneystate(value);
    setShowBudgetInput(false);
  };
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>PlanSum</Text>
      <Header viewShotRef={viewShotRef} />
      {!showBudgetInput && (
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
          }}
          onPress={() => setShowBudgetInput(true)}
        >
          <Ionicons name="add-circle-outline" size={22} color="white" />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Set Budget
          </Text>
        </TouchableOpacity>
      )}

      {/* Budget input (only visible when user clicks Set Budget) */}
      {showBudgetInput && <TotalMoneyInput onSave={handleSaveTotalMoney} />}
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
        <PlanGrid totalMoney={totalMoney} plans={plans} />
        <RecentItems plans={plans} />
      </ViewShot>
    </ScrollView>
  );
}
