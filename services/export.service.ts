import { getDatabase } from "@/database/db";
import * as FileSystem from "expo-file-system";

export const exportHabitsToCSV = async () => {
  const db = await getDatabase();

  const habits = await db.getAllAsync<any>("SELECT * FROM habits");

  const csv =
    "id,title,note,created_at\n" +
    habits
      .map((h) => `${h.id},"${h.title}","${h.note ?? ""}",${h.created_at}`)
      .join("\n");

  // ⚠️ typings bị thiếu → dùng runtime value
  const baseDir =
    (FileSystem as any).cacheDirectory || (FileSystem as any).documentDirectory;

  if (!baseDir) {
    throw new Error("No writable directory available");
  }

  const path = baseDir + "habits.csv";

  await FileSystem.writeAsStringAsync(path, csv);

  return path;
};
