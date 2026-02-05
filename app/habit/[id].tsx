import { getStreak } from "@/services/habit.service";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HabitDetail() {
  const { id } = useLocalSearchParams();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getStreak(Number(id)).then(setStreak);
  }, [id]);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18 }}>🔥 Chuỗi hiện tại</Text>
      <Text style={{ fontSize: 32 }}>{streak} ngày</Text>
    </View>
  );
}
