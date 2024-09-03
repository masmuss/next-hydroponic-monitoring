import Link from "next/link";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {formatDateDifference} from "@/lib/utils";
import {GaugeIcon} from "lucide-react";

type DeviceCardProps = {
    id: string;
    name: string;
    lastUpdated: string;
};

export default function DeviceCard({id, name, lastUpdated}: DeviceCardProps) {
    return (
        <Link href={`/device/${id}`} key={id}>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                            <GaugeIcon className="w-5 h-5"/>
                        </div>
                        <div>
                            <div className="font-medium">{name}</div>
                            <div className="text-sm text-muted-foreground">{id}</div>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between gap-4">
                    <Badge variant="secondary">Online</Badge>
                    <div className="text-sm text-muted-foreground">
                        {lastUpdated !== "N/A" ? formatDateDifference(lastUpdated) : "N/A"}
                    </div>
                    <Badge variant="destructive">High Temperature</Badge>
                </CardFooter>
            </Card>
        </Link>
    );
};