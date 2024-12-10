"use client"

import * as React from "react"
import {Bot, CommandIcon, LayoutDashboard} from "lucide-react"

import {NavMain} from "@/components/layout/nav-main"
import {TeamSwitcher} from "@/components/layout/team-switcher"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar"

const data = {
    teams: [
        {
            name: "IoT Monitoring",
            logo: CommandIcon,
            plan: "Enterprise",
        }
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Devices",
            url: "/devices",
            icon: Bot,
        },
    ]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                {/*<NavUser user={data.user} />*/}
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
