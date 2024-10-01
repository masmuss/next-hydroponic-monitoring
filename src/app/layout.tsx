import type {Metadata} from "next";
import {Roboto_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import {NextFont} from "next/dist/compiled/@next/font";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Separator} from "@radix-ui/react-select";
import Nav from "@/components/nav";
import {AlertCircle, Archive, ArchiveX, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2} from "lucide-react";
import MainWrapper from "@/components/main-wrapper";
import {cookies} from "next/headers";

const robotoMono: NextFont = Roboto_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Hydroponic",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const layout = cookies().get("react-resizable-panels:layout:mail")
    const collapsed = cookies().get("react-resizable-panels:collapsed")

    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

    return (
        <html lang="en">
        <body className={cn(robotoMono.className, 'min-h-screen')} suppressHydrationWarning>
        {/*<MainWrapper*/}
        {/*    defaultLayout={defaultLayout}*/}
        {/*    defaultCollapsed={defaultCollapsed}*/}
        {/*    navCollapsedSize={3}*/}
        {/*>*/}
            {children}
        {/*</MainWrapper>*/}
        </body>
        </html>
    );
}
