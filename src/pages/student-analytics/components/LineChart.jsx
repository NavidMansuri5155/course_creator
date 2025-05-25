import React, { useRef, useEffect } from "react";
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  // For screen reader accessibility
  useEffect(() => {
    if (chartRef.current) {
      const chartElement = chartRef.current;
      
      // Add appropriate ARIA attributes
      chartElement.setAttribute("role", "img");
      chartElement.setAttribute("aria-label", "Enrollment trends over time chart showing student enrollment numbers");
      
      // Create a text description of the chart data
      const description = document.createElement("div");
      description.id = "chart-description";
      description.className = "sr-only";
      description.textContent = `Enrollment trend data: ${data.map(item => 
        `${item.date}: ${item.enrollments} enrollments`).join(", ")}`;
      
      // Add the description to the chart container
      chartElement.appendChild(description);
      
      return () => {
        if (chartElement.contains(description)) {
          chartElement.removeChild(description);
        }
      };
    }
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-md shadow-sm">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-primary">
            <span className="font-medium">{payload[0].value}</span> enrollments
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={chartRef} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: "#4B5563" }} 
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis 
            tick={{ fill: "#4B5563" }} 
            axisLine={{ stroke: "#E5E7EB" }}
            tickFormatter={(value) => value}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Line
            type="monotone"
            dataKey="enrollments"
            stroke="#2563EB"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Enrollments"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;