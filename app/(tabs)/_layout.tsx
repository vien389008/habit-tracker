import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Hôm nay" }} />
      <Tabs.Screen name="stats" options={{ title: "Thống kê" }} />
      <Tabs.Screen name="settings" options={{ title: "Cài đặt" }} />
    </Tabs>
  );
}
