import { LineChart } from "@mui/x-charts/LineChart";

const WeeklyChart = () => {
  return (
    <LineChart
      xAxis={[
        {
          scaleType: "point",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ]}
      series={[
        {
          data: [200, 350, 250, 450, 300, 500, 400],
          label: "Calories Burned",
        },
      ]}
      height={350}
    />
  );
};

export default WeeklyChart;