"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface PriceRow {
  year: string;
  Noida: number;
  Gurugram: number;
  "Yamuna Expressway": number;
  Dholera: number;
}

export default function LandPricesChart({ data }: { data: PriceRow[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,162,75,0.1)" />
        <XAxis
          dataKey="year"
          stroke="#A39E93"
          tick={{ fill: "#A39E93", fontSize: 12 }}
          axisLine={{ stroke: "rgba(201,162,75,0.2)" }}
        />
        <YAxis
          domain={[0, "auto"]}
          stroke="#A39E93"
          tick={{ fill: "#A39E93", fontSize: 11 }}
          axisLine={{ stroke: "rgba(201,162,75,0.2)" }}
          tickFormatter={(value: number) => {
            if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
            return value.toString();
          }}
          label={{
            value: "₹ per sq m",
            angle: -90,
            position: "insideLeft",
            style: { fill: "#A39E93", fontSize: 11 },
            offset: -5,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#181818",
            border: "1px solid rgba(201,162,75,0.3)",
            borderRadius: "12px",
            color: "#F4EFE6",
            fontSize: 13,
          }}
          labelStyle={{ color: "#E6C879", fontWeight: 600, marginBottom: 4 }}
          formatter={(value: unknown, name: unknown) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            String(name),
          ]}
        />
        <Legend
          wrapperStyle={{ color: "#A39E93", fontSize: 12, paddingTop: 10 }}
        />
        <Line
          type="linear"
          dataKey="Noida"
          stroke="#7a9ec2"
          strokeWidth={2}
          dot={{ r: 4, fill: "#7a9ec2" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="linear"
          dataKey="Gurugram"
          stroke="#c27a7a"
          strokeWidth={2}
          dot={{ r: 4, fill: "#c27a7a" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="linear"
          dataKey="Yamuna Expressway"
          stroke="#7ac28a"
          strokeWidth={2}
          dot={{ r: 4, fill: "#7ac28a" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="linear"
          dataKey="Dholera"
          stroke="#F5D77A"
          strokeWidth={3}
          dot={{ r: 5, fill: "#F5D77A", stroke: "#C9A24B", strokeWidth: 2 }}
          activeDot={{ r: 8, fill: "#F5D77A", stroke: "#C9A24B", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
