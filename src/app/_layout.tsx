import { colors } from "@/css/styles";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="plans" options={{ title: "plans" }} />
      <Stack.Screen name="add-plan" options={{ title: "Add Plan" }} />
    </Stack>
  );
}
