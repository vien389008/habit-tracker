import { Pressable, Switch, Text, View } from "react-native";

export default function HabitCard({
  title,
  completed,
  streak,
  onToggle,
  onPress,
  onDelete,
}: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>

      <Text style={{ marginTop: 4 }}>🔥 {streak} ngày liên tiếp</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <Switch value={completed} onValueChange={onToggle} />

        <Pressable onPress={onDelete}>
          <Text style={{ color: "red" }}>Xoá</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
