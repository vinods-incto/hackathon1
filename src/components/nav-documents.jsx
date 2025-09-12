"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavDocuments({
                                 navDocItems
}) {


  return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarMenu>
              {navDocItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                          <a href={item.url}>
                              {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                              <span>{item.name}</span>
                          </a>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
          </SidebarMenu>
      </SidebarGroup>
  );
}
