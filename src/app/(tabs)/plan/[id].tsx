import { colors, globalStyles } from "@/css/styles";
import {
  addItemToPlan,
  deleteItemFromPlan,
  deletePlan,
  getBudgetData,
  Plan,
  updateItemInPlan,
  updatePlanName,
} from "@/storage/planstorage";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlanDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [planName, setPlanName] = useState("");
  const [items, setItems] = useState<
    { id: string | null; name: string; price: string }[]
  >([]);

  const loadPlan = async () => {
    const data = await getBudgetData();
    const found = data.plans.find((p) => p.id === id);

    if (found) {
      setPlan(found);
      setPlanName(found.name);
      setItems(
        found.items.map((i) => ({
          id: i.id,
          name: i.name,
          price: String(i.price),
        })),
      );
    }
  };

  useEffect(() => {
    loadPlan();
  }, [id]);

  const handleChangeItem = (
    index: number,
    field: "name" | "price",
    value: string,
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddMore = () => {
    setItems([{ id: null, name: "", price: "" }, ...items]);
  };

  const handleDeleteItem = async (itemId: string) => {
    Alert.alert("Delete Item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteItemFromPlan(String(id), itemId);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          loadPlan();
        },
      },
    ]);
  };

  const handleUpdatePlan = async () => {
    if (!planName.trim()) {
      Alert.alert("Missing Plan Name", "Please add a plan name first.");
      return;
    }

    // Update plan name
    await updatePlanName(String(id), planName);

    // Update existing items
    for (const item of items) {
      if (item.id !== null) {
        await updateItemInPlan(
          String(id),
          item.id,
          item.name,
          Number(item.price),
        );
      }
    }

    // Add new items
    for (const item of items) {
      if (item.id === null && item.name.trim() && item.price.trim()) {
        await addItemToPlan(String(id), item.name, Number(item.price));
      }
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Success", "Plan updated successfully!");

    // Reload fresh data from storage
    loadPlan();
    router.push("/plans");
  };

  const handleDeletePlan = () => {
    Alert.alert("Delete Plan", "Are you sure you want to delete this plan?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deletePlan(String(id));
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert("Success", "Plan deleted successfully!");
          router.push("/plans");
        },
      },
    ]);
  };

  if (!plan) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>Plan not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Edit Plan</Text>

      {/* PLAN NAME */}
      <TextInput
        style={styles.input}
        placeholder="Plan name"
        placeholderTextColor={colors.textSecondary}
        value={planName}
        onChangeText={setPlanName}
      />

      {/* ITEMS */}
      <View style={styles.itemsContainer}>
        <ScrollView
          style={{ maxHeight: 300 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
        >
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              {/* ITEM NAME */}
              <TextInput
                style={[styles.input, styles.rowInput]}
                placeholder="Item name"
                placeholderTextColor={colors.textSecondary}
                value={item.name}
                onChangeText={(text) => handleChangeItem(index, "name", text)}
              />

              {/* PRICE */}
              <TextInput
                style={[styles.input, styles.priceInput]}
                placeholder="€"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={item.price}
                onChangeText={(text) => handleChangeItem(index, "price", text)}
              />

              {/* DELETE BUTTON */}
              {item.id !== null && (
                <TouchableOpacity
                  onPress={() => handleDeleteItem(item.id!)}
                  style={styles.deleteItemButton}
                >
                  <Ionicons name="trash-outline" size={22} color="white" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ADD MORE ITEM BUTTON */}
      <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMore}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name="add-circle-outline"
            size={22}
            color={colors.textSecondary}
          />
          <Text style={styles.addMoreText}>Add More Item</Text>
        </View>
      </TouchableOpacity>

      {/* UPDATE BUTTON */}
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePlan}>
        <Text style={styles.saveText}>Update Plan</Text>
      </TouchableOpacity>

      {/* DELETE PLAN BUTTON */}
      <TouchableOpacity
        style={styles.deletePlanButton}
        onPress={handleDeletePlan}
      >
        <Text style={styles.deletePlanText}>Delete Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },

  addMoreButton: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addMoreText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  saveText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  deletePlanButton: {
    backgroundColor: "#c33a3a",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  deletePlanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemsContainer: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 10,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  rowInput: {
    flex: 2,
  },

  priceInput: {
    flex: 1,
  },

  deleteItemButton: {
    backgroundColor: "#c33a3a",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
