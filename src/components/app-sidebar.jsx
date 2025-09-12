"use client"

import * as React from "react"
import { clsx } from "clsx";
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    ScrollText,
    BookUser,
    FileText,
    Users,
    Bell,
    Logs,
    ToyBrick,
    LayoutDashboard,
    ChartBarBig,
    BadgeDollarSign,
    Bot,
    ChartCandlestick,
    CloudSun,
    Earth,
    Fan,
    SquarePlay,
    Workflow,
    SunSnow, BadgeIndianRupee, Plane, PlaneTakeoff
} from "lucide-react";


const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            subMenu: [
                {
                    title: "Market Stream",
                    url: "/dashboard/market-visualization",
                    icon:ChartCandlestick,
                    description: "Real-time Market prices",
                },
                {
                    title: "Seismic Stream",
                    url: "/dashboard/seismic-visualization",
                    icon:Earth,
                    description: "USGS live earthquake data",
                },
                {
                    title: "Weather Stream",
                    url: "/dashboard/weather-visualization",
                    icon:CloudSun,
                    description: "OpenWeatherMap real-time metrics",
                },
                {
                    title: "Flights Stream",
                    url: "/dashboard/flight-visualization",
                    icon:PlaneTakeoff,
                    description: "Flight real-time metrics",
                },
            ],
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: ChartBarBig,
            subMenu: [
                {
                    title: "Market Data",
                    url: "/analytics/market-charts",
                    icon: BadgeIndianRupee,
                    description: "Line / bar charts from live Realtime Market data",
                },
                {
                    title: "Seismic Data",
                    url: "/analytics/seismic-charts",
                    icon: Earth,
                    description: "Realtime OpenAQ measurements",
                },{
                title: "Weather Data",
                url: "/analytics/weather-charts",
                icon: SunSnow,
                },
                {
                    title: "Flight Data",
                    url: "/analytics/flight-charts",
                    icon: Plane,
                    description: "Realtime Flight data",
                }
            ],
        },
        {
            title: "Users",
            url: "/users",
            icon: Users,
            subMenu: [
                {
                    title: "Users",
                    url: "/users/list",
                    icon:BookUser,
                    description: "Signed up User Generator API",
                },
                {
                    title: "Metrics",
                    url: "/users/metrics",
                    icon:ScrollText,
                    description: "Analytics data per user",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Notifications",
            url: "/notifications",
            icon: Bell,
        },
        {
            title: "Logs",
            url: "/logs",
            icon: Logs,
        },
        {
            title: "Integrations",
            url: "/integrations",
            icon: ToyBrick,
        },
    ],
    documents: [
        {
            name: "Project Documentation",
            url: "#",
            icon: FileText,
        },
        {
            name: "Demo Video",
            url: "#",
            icon: SquarePlay,
        },
        {
            name: "Stream Source Status",
            url: "#",
            icon: Workflow,
        },
    ],
}

export function AppSidebar({
  ...props
}) {
  return (
      <Sidebar collapsible="offcanvas" {...props}>
          <SidebarHeader>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton
                          asChild
                          className="radix-state-opensidebar-menu-button:!p-1.5"
                      >
                          <a href="#">
                              <Bot className="!size-5" />
                              <span className="text-base font-semibold">CitoRovers Dashboard</span>
                          </a>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
              <NavMain navMainItems={data.navMain} />
              <NavDocuments navDocItems={data.documents} />
              <NavSecondary items={data.navSecondary} className="mt-auto" />
          </SidebarContent>
          <SidebarFooter>
              <NavUser user={data.user} />
          </SidebarFooter>
      </Sidebar>
  );
}
