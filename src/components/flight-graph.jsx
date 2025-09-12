"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
import useWebSocket from "@/hooks/useWebSocket";
export const description = "An interactive area chart"
const chartData = [
  { date: "2024-04-01", desktop: 0, mobile: 0 },
  { date: "2024-04-02", desktop: 20, mobile: 20 },
  { date: "2024-04-03", desktop: 30, mobile: 120 },
  { date: "2024-04-04", desktop: 32, mobile: 260 },
  { date: "2024-04-05", desktop: 33, mobile: 290 },
  { date: "2024-04-06", desktop: 51, mobile: 340 },
  { date: "2024-04-07", desktop: 65, mobile: 180 },
  { date: "2024-04-08", desktop: 79, mobile: 320 },
  { date: "2024-04-09", desktop: 49, mobile: 110 },
  { date: "2024-04-10", desktop: 31, mobile: 190 },
  { date: "2024-04-11", desktop: 57, mobile: 350 },
  { date: "2024-04-12", desktop: 52, mobile: 210 },
  { date: "2024-04-13", desktop: 52, mobile: 380 },
  { date: "2024-04-14", desktop: 57, mobile: 220 },
  { date: "2024-04-15", desktop: 55, mobile: 170 },
  { date: "2024-04-16", desktop: 58, mobile: 190 },
  { date: "2024-04-17", desktop: 56, mobile: 360 },
  { date: "2024-04-18", desktop: 54, mobile: 410 },
  { date: "2024-04-19", desktop: 43, mobile: 180 },
  { date: "2024-04-20", desktop: 69, mobile: 150 },
  { date: "2024-04-21", desktop: 57, mobile: 200 },
  { date: "2024-04-22", desktop: 54, mobile: 170 },
  { date: "2024-04-23", desktop: 58, mobile: 230 },
  { date: "2024-04-24", desktop: 57, mobile: 290 },
  { date: "2024-04-25", desktop: 55, mobile: 250 },
  { date: "2024-04-26", desktop: 55, mobile: 130 },
  { date: "2024-04-27", desktop: 53, mobile: 420 },
  { date: "2024-04-28", desktop: 52, mobile: 180 },
  { date: "2024-04-29", desktop: 55, mobile: 240 },
  { date: "2024-04-30", desktop: 54, mobile: 380 },
  { date: "2024-05-01", desktop: 55, mobile: 220 },
  { date: "2024-05-02", desktop: 56, mobile: 310 },
  { date: "2024-05-03", desktop: 57, mobile: 190 },
  { date: "2024-05-04", desktop: 55, mobile: 420 },
  { date: "2024-05-05", desktop: 51, mobile: 390 },
  { date: "2024-05-06", desktop: 51, mobile: 520 },
  { date: "2024-05-07", desktop: 48, mobile: 300 },
  { date: "2024-05-08", desktop: 49, mobile: 210 },
  { date: "2024-05-09", desktop: 47, mobile: 180 },
  { date: "2024-05-10", desktop: 43, mobile: 330 },
  { date: "2024-05-11", desktop: 45, mobile: 270 },
  { date: "2024-05-12", desktop: 47, mobile: 240 },
  { date: "2024-05-13", desktop: 47, mobile: 160 },
  { date: "2024-05-14", desktop: 48, mobile: 490 },
  { date: "2024-05-15", desktop: 47, mobile: 380 },
  { date: "2024-05-16", desktop: 44, mobile: 400 },
  { date: "2024-05-17", desktop: 49, mobile: 420 },
  { date: "2024-05-18", desktop: 45, mobile: 350 },
  { date: "2024-05-19", desktop: 45, mobile: 180 },
  { date: "2024-05-20", desktop: 47, mobile: 230 },
  { date: "2024-05-21", desktop: 42, mobile: 140 },
  { date: "2024-05-22", desktop: 41, mobile: 120 },
  { date: "2024-05-23", desktop: 44, mobile: 290 },
  { date: "2024-05-24", desktop: 44, mobile: 220 },
  { date: "2024-05-25", desktop: 44, mobile: 250 },
  { date: "2024-05-26", desktop: 43, mobile: 170 },
  { date: "2024-05-27", desktop: 46, mobile: 460 },
  { date: "2024-05-28", desktop: 48, mobile: 190 },
  { date: "2024-05-29", desktop: 49, mobile: 130 },
  { date: "2024-05-30", desktop: 50, mobile: 280 },
  { date: "2024-05-31", desktop: 51, mobile: 230 },
  { date: "2024-06-01", desktop: 58, mobile: 200 },
  { date: "2024-06-02", desktop: 50, mobile: 410 },
  { date: "2024-06-03", desktop: 53, mobile: 160 },
  { date: "2024-06-04", desktop: 59, mobile: 380 },
  { date: "2024-06-05", desktop: 58, mobile: 140 },
  { date: "2024-06-06", desktop: 56, mobile: 250 },
  { date: "2024-06-07", desktop: 53, mobile: 370 },
  { date: "2024-06-08", desktop: 53, mobile: 320 },
  { date: "2024-06-09", desktop: 53, mobile: 480 },
  { date: "2024-06-10", desktop: 55, mobile: 200 },
  { date: "2024-06-11", desktop: 52, mobile: 150 },
  { date: "2024-06-12", desktop: 52, mobile: 420 },
  { date: "2024-06-13", desktop: 51, mobile: 130 },
  { date: "2024-06-14", desktop: 51, mobile: 380 },
  { date: "2024-06-15", desktop: 51, mobile: 350 },
  { date: "2024-06-16", desktop: 51, mobile: 310 },
  { date: "2024-06-17", desktop: 51, mobile: 520 },
  { date: "2024-06-18", desktop: 47, mobile: 170 },
  { date: "2024-06-19", desktop: 45, mobile: 290 },
  { date: "2024-06-20", desktop: 48, mobile: 450 },
  { date: "2024-06-21", desktop: 49, mobile: 210 },
  { date: "2024-06-22", desktop: 31, mobile: 270 },
  { date: "2024-06-23", desktop: 31, mobile: 530 },
  { date: "2024-06-24", desktop: 26, mobile: 180 },
  { date: "2024-06-25", desktop: 24, mobile: 190 },
  { date: "2024-06-26", desktop: 24, mobile: 380 },
  { date: "2024-06-27", desktop: 20, mobile: 490 },
  { date: "2024-06-28", desktop: 19, mobile: 200 },
  { date: "2024-06-29", desktop: 13, mobile: 160 },
  { date: "2024-06-30", desktop: 0, mobile: 400 },
]

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

export function FLightGraph() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
    const wsData = useWebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Flight Time Line</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
              Altitude of the flight
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Previous Flight
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Average Flight Historical
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Current
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot" />
              } />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a" />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
