import { createHabit } from "@/services/habit.service";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function CreateHabit() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const onSave = async () => {
    if (!title.trim()) return;

    await createHabit(title, note);
    router.back();
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Tạo thói quen</Text>

      <TextInput
        placeholder="Tên thói quen"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <TextInput
        placeholder="Ghi chú"
        value={note}
        onChangeText={setNote}
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />

      <Button title="Lưu" onPress={onSave} />
    </View>
  );
}
