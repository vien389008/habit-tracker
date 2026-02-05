import { getDatabase } from "@/database/db";
import { scheduleDailyNotification } from "@/services/notification.service";

export type Habit = {
  id: number;
  title: string;
  note?: string;
  reminder_time?: string;
  notification_id?: string;
  created_at: string;
};

export const createHabit = async (
  title: string,
  note?: string,
  reminderTime?: string,
) => {
  const db = await getDatabase();
  const createdAt = new Date().toISOString();

  let notificationId: string | null = null;

  if (reminderTime) {
    const [hour, minute] = reminderTime.split(":").map(Number);
    notificationId = await scheduleDailyNotification(
      "Nhắc thói quen",
      title,
      hour,
      minute,
    );
  }

  await db.runAsync(
    `
    INSERT INTO habits (title, note, reminder_time, notification_id, created_at)
    VALUES (?, ?, ?, ?, ?)
    `,
    [title, note ?? null, reminderTime ?? null, notificationId, createdAt],
  );
};

export const getHabitsForToday = async () => {
  const db = await getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const result = await db.getAllAsync<Habit & { completed: number | null }>(
    `
    SELECT h.*, l.completed
    FROM habits h
    LEFT JOIN habit_logs l
      ON h.id = l.habit_id AND l.date = ?
    ORDER BY h.id DESC
    `,
    [today],
  );

  return result.map((item) => ({
    ...item,
    completed: item.completed === 1,
  }));
};

export const toggleHabitForToday = async (
  habitId: number,
  completed: boolean,
) => {
  const db = await getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const existing = await db.getFirstAsync<{ id: number }>(
    `
    SELECT id FROM habit_logs
    WHERE habit_id = ? AND date = ?
    `,
    [habitId, today],
  );

  if (existing) {
    await db.runAsync(
      `
      UPDATE habit_logs
      SET completed = ?
      WHERE id = ?
      `,
      [completed ? 1 : 0, existing.id],
    );
  } else {
    await db.runAsync(
      `
      INSERT INTO habit_logs (habit_id, date, completed)
      VALUES (?, ?, ?)
      `,
      [habitId, today, completed ? 1 : 0],
    );
  }
};
export const deleteHabit = async (habitId: number) => {
  const db = await getDatabase();

  await db.runAsync(`DELETE FROM habit_logs WHERE habit_id = ?`, [habitId]);
  await db.runAsync(`DELETE FROM habits WHERE id = ?`, [habitId]);
};

export const getStreak = async (habitId: number) => {
  const db = await getDatabase();

  const rows = await db.getAllAsync<{ date: string }>(
    `
    SELECT date FROM habit_logs
    WHERE habit_id = ? AND completed = 1
    ORDER BY date DESC
    `,
    [habitId],
  );

  let streak = 0;
  let current = new Date();

  for (const row of rows) {
    const d = new Date(row.date);
    if (d.toISOString().split("T")[0] === current.toISOString().split("T")[0]) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};
export const getWeeklyStats = async () => {
  const db = await getDatabase();

  const today = new Date();
  const dates: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  const stats = await Promise.all(
    dates.map(async (date) => {
      const result = await db.getFirstAsync<{
        count: number;
      }>(
        `
        SELECT COUNT(*) as count
        FROM habit_logs
        WHERE date = ? AND completed = 1
        `,
        [date],
      );

      return {
        date,
        completed: result?.count ?? 0,
      };
    }),
  );

  return stats;
};
