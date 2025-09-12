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
import {ScrollText,BookUser,FileText,Users,Bell,Logs,ToyBrick,LayoutDashboard,ChartBarBig,BadgeDollarSign, Bot, ChartCandlestick, CloudSun, Earth, Fan, SquarePlay, Workflow} from "lucide-react";


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
                    url: "/dashboard/market-stream",
                    icon:ChartCandlestick,
                    description: "Real-time Market prices",
                },
                {
                    title: "Earthquake Stats",
                    url: "/dashboard/seismic-data",
                    icon:Earth,
                    description: "USGS live earthquake data",
                },
                {
                    title: "Weather Overview",
                    url: "/dashboard/weather",
                    icon:CloudSun,
                    description: "OpenWeatherMap real-time metrics",
                },
            ],
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: ChartBarBig,
            subMenu: [
                {
                    title: "Market Charts",
                    url: "/analytics/market-charts",
                    icon: BadgeDollarSign,
                    description: "Line / bar charts from live Realtime Market data",
                },
                {
                    title: "Air Quality",
                    url: "/analytics/air-quality",
                    icon: Fan,
                    description: "Realtime OpenAQ measurements",
                },
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
