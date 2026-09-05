import { colors } from "@/css/styles";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { TouchableOpacity } from "react-native";

export default function ShareImageButton({
  viewShotRef,
}: {
  viewShotRef: React.RefObject<any>;
}) {
  const handleShareImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShareImage}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
