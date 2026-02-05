import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function WeeklyChart({ data }: any) {
  return (
    <LineChart
      data={{
        labels: data.map((i: any) => i.date.slice(5)),
        datasets: [{ data: data.map((i: any) => i.completed) }],
      }}
      width={Dimensions.get("window").width - 32}
      height={220}
      chartConfig={{
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: () => "#2563eb",
      }}
      style={{ borderRadius: 12 }}
    />
  );
}
