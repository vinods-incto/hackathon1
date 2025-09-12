import {motion} from "framer-motion";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import * as React from "react";
const chartConfig = {
    visitors: {
        label: "Visitors",
    },

    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },

    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    }
}
export default function Graph({ width = 24, height = 24 }) {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("90d")
    return (
        <motion.section whileHover={{ scale: 1.02 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Units Sold & Profit Trend</h2>
            {filteredData.length === 0 ? (
                <div className="text-gray-300">No data for selected range.</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Units" stroke="#f59e0b" strokeWidth={3} />
                        <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </motion.section>

    )
}