import {
  deleteHabit,
  getHabitsForToday,
  getStreak,
  toggleHabitForToday,
} from "@/services/habit.service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Switch, Text, View } from "react-native";
export default function HomeScreen() {
  const [habits, setHabits] = useState<any[]>([]);

  const loadHabits = async () => {
    const data = await getHabitsForToday();
    const withStreak = await Promise.all(
      data.map(async (h: any) => ({
        ...h,
        streak: await getStreak(h.id),
      })),
    );
    setHabits(withStreak);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const onToggle = async (id: number, value: boolean) => {
    await toggleHabitForToday(id, value);
    loadHabits();
  };

  const onDelete = async (id: number) => {
    await deleteHabit(id);
    loadHabits();
  };

  return (
    <View style={{ padding: 16 }}>
      <Pressable
        onPress={() => router.push("/habit/create")}
        style={{ marginBottom: 12 }}
      >
        <Text style={{ color: "blue" }}>+ Tạo thói quen</Text>
      </Pressable>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 12,
              padding: 12,
              borderWidth: 1,
            }}
          >
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/habit/[id]",
                  params: { id: item.id.toString() },
                })
              }
            >
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </Pressable>

            <Text>🔥 {item.streak} ngày</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Switch
                value={item.completed}
                onValueChange={(v) => onToggle(item.id, v)}
              />

              <Pressable onPress={() => onDelete(item.id)}>
                <Text style={{ color: "red" }}>Xoá</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
