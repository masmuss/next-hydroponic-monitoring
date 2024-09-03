"use client"

import * as React from "react"
import {ChartLine, LayoutDashboard} from "lucide-react"

import {cn} from "@/lib/utils"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable"
import {TooltipProvider} from "@/components/ui/tooltip"
import Nav from "@/components/nav";
import {ScrollArea} from "@/components/ui/scroll-area";
import Link from "next/link";
import {CubeIcon} from "@radix-ui/react-icons";

interface MailProps {
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
    children: React.ReactNode
}

export default function MainWrapper({
                                        defaultLayout = [20, 32, 48],
                                        defaultCollapsed = false,
                                        navCollapsedSize,
                                        children,
                                    }: MailProps) {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(defaultCollapsed)

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(true)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            true
                        )}`
                    }}
                    onResize={() => {
                        setIsCollapsed(false)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            false
                        )}`
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[64px] transition-all duration-300 ease-in-out"
                    )}
                >
                    <div
                        className={cn(
                            "flex items-center p-4",
                            isCollapsed ? "justify-center" : "justify-start"
                        )}
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <div className={'p-2 rounded-full bg-zinc-900'}>
                                <CubeIcon className="w-5 h-5 text-zinc-100"/>
                            </div>
                            {
                                !isCollapsed && (
                                    <span className="text-lg font-bold">IoT Dashboard</span>
                                )
                            }
                        </Link>
                    </div>
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Dashboard",
                                url: "/dashboard",
                                icon: LayoutDashboard,
                                variant: "ghost",
                            },
                            {
                                title: "Monitors",
                                url: "/monitors",
                                icon: ChartLine,
                                variant: "ghost",
                            },
                        ]}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <ScrollArea className={'h-screen bg-muted/80'}>
                        {children}
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}