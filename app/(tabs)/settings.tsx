import { exportHabitsToCSV } from "@/services/export.service";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ padding: 16 }}>
      <Pressable
        onPress={async () => {
          const path = await exportHabitsToCSV();
          alert("Đã xuất: " + path);
        }}
      >
        <Text style={{ color: "blue" }}>Xuất dữ liệu CSV</Text>
      </Pressable>

      <Text style={{ marginTop: 16 }}>Habit Tracker v2.0</Text>
    </View>
  );
}
