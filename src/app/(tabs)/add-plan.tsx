import { colors, globalStyles } from "@/css/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddItemScreen() {
  const [planName, setPlanName] = useState("");
  const [items, setItems] = useState([{ name: "", price: "" }]);

  const handleAddMore = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const handleChangeItem = (
    index: number,
    field: "name" | "price",
    value: string,
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSavePlan = () => {
    console.log({
      plan: planName,
      items: items.map((i) => ({
        name: i.name,
        price: Number(i.price),
      })),
    });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Items to Plan</Text>

      {/* PLAN NAME */}
      <TextInput
        style={styles.input}
        placeholder="Plan name (Food, Trip, Bills...)"
        placeholderTextColor={colors.textSecondary}
        value={planName}
        onChangeText={setPlanName}
      />

      {/* ITEM INPUTS */}
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Item name"
            placeholderTextColor={colors.textSecondary}
            value={item.name}
            onChangeText={(text) => handleChangeItem(index, "name", text)}
          />
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Price (€)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={item.price}
            onChangeText={(text) => handleChangeItem(index, "price", text)}
          />
        </View>
      ))}

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

      {/* SAVE PLAN BUTTON */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
        <Text style={styles.saveText}>Save Plan</Text>
      </TouchableOpacity>
    </View>
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
  itemRow: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
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
});
