"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import { clsx } from "clsx";
import {ChevronUp} from "lucide-react";

export function NavMain({
                            navMainItems
}) {
    const { isMobile } = useSidebar()
    return (
      <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                  {navMainItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                          {item.subMenu?.length ? (
                              <Collapsible>
                                  <CollapsibleTrigger asChild    className={clsx(
                                      "group"
                                  )}>
                                      <SidebarMenuButton className="flex navMainItems-center justify-between" style={{
                                      }}>
                                          <div className="flex navMainItems-center gap-2">
                                              {item.icon && <item.icon className="w-4 h-4" />}
                                              <span>{item.title}</span>
                                          </div>
                                          <ChevronUp   className={clsx(
                                              "ml-auto h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                              "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                          )}/>
                                      </SidebarMenuButton>
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                      {item.subMenu.map((subItem,idx) => (
                                          <div className="ml-8 mt-3 flex navMainItems-center gap-2" key={subItem.title+idx}>
                                              {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                              <a href={subItem.url} >{subItem.title}</a>
                                          </div>
                                      ))}
                                  </CollapsibleContent>
                              </Collapsible>
                          ) : (
                              <SidebarMenuButton tooltip={item.title}>
                                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                                  <span>{item.title}</span>
                              </SidebarMenuButton>
                          )}
                      </SidebarMenuItem>
                  ))}
              </SidebarMenu>
          </SidebarGroupContent>
      </SidebarGroup>
  );
}
