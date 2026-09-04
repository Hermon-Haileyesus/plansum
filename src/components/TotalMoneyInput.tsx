import { colors, globalStyles } from "@/css/styles";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TotalMoneyInputProps = {
  onSave: (value: number) => void;
};
export default function TotalMoneyInput({ onSave }: TotalMoneyInputProps) {
  const [value, setValue] = useState("");

  const handleSave = () => {
    const num = Number(value);
    if (!isNaN(num)) {
      onSave(num);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={globalStyles.title}>Set Total Money</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter total budget (€)"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
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
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
