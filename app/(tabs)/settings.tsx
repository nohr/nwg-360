import ConnectionManager from "@/components/ConnectionManager";
import { Text, View } from "@/components/Themed";

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-evenly bg-gray-100 dark:bg-[#000000]">
      <ConnectionManager />
      <View className="flex flex-col items-center justify-center gap-2 bg-transparent">
        <Text className="mt-4 text-2xl font-bold text-black dark:text-white">
          Help
        </Text>
        <Text className="text-md mt-2 text-black dark:text-white">
          Double tap image to toggle menu
        </Text>
      </View>
    </View>
  );
}
