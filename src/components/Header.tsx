import { colors, globalStyles } from "@/css/styles";
import { StyleSheet, Text, View } from "react-native";
import ShareImageButton from "./ShareButton";

export default function Header({
  viewShotRef,
}: {
  viewShotRef: React.RefObject<any>;
}) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={globalStyles.header}>
      <Text style={styles.date}>{currentDate}</Text>
      <ShareImageButton viewShotRef={viewShotRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 30,
  },
});
