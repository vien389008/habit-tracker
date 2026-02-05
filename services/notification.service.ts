import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const requestNotificationPermission = async () => {
  if (!Device.isDevice) return false;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const scheduleDailyNotification = async (
  title: string,
  body: string,
  hour: number,
  minute: number,
) => {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    },
  });

  return id;
};

export const cancelNotification = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};
