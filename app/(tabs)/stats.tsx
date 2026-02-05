import WeeklyChart from "@/components/WeeklyChart";
import { getWeeklyStats } from "@/services/habit.service";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function StatsScreen() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    getWeeklyStats().then(setStats);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>7 ngày gần đây</Text>

      {/* 🔥 CHART */}
      {stats.length > 0 && <WeeklyChart data={stats} />}

      {/* 📋 LIST BÊN DƯỚI */}
      <View style={{ marginTop: 16 }}>
        {stats.map((item) => (
          <View
            key={item.date}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text>{item.date}</Text>
            <Text>✔ {item.completed}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
