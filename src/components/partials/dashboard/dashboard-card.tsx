import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {LucideIcon} from "lucide-react";

type DashboardCardProps = {
    title: string;
    description: string;
    count: number | string;
    icon?: LucideIcon;
    linkHref?: string;
    linkAriaLabel?: string;
    linkClassName?: string;
};

export default function DashboardCard(props: DashboardCardProps) {
    const {
        title,
        description,
        count,
        icon: Icon,
        linkHref,
        linkAriaLabel,
        linkClassName
    } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold">{count}</div>
                {linkHref && Icon && (
                    <Link
                        href={linkHref}
                        className={cn(
                            'bg-zinc-100 border border-zinc-300 text-primary p-2 rounded-full',
                            'hover:bg-zinc-200 hover:text-primary-dark',
                            'transition-colors duration-200 ease-in-out',
                            linkClassName
                        )}
                        prefetch={false}
                    >
                        <Icon className="w-4 h-4"/>
                        <span className="sr-only">{linkAriaLabel || "View More"}</span>
                    </Link>
                )}
            </CardContent>
        </Card>
    );
};
