import Link from "next/link";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {formatDateDifference} from "@/lib/utils";
import {GaugeIcon} from "lucide-react";

type DeviceCardProps = {
    id: string;
    name: string;
    target: string;
    lastUpdated: string;
};

export default function DeviceCard(props: DeviceCardProps) {
    const {id, name, target, lastUpdated} = props;
    return (
        <Link href={`/device/${id}`} key={id} className={'w-full'}>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                            <GaugeIcon className="w-5 h-5"/>
                        </div>
                        <div>
                            <div className="font-medium">{`${name} #${id}`}</div>
                            <div className="text-sm text-muted-foreground">{target}</div>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between gap-4">
                    <Badge variant="secondary">Online</Badge>
                    <div className="text-sm text-muted-foreground">
                        {lastUpdated !== "N/A" ? formatDateDifference(lastUpdated) : "N/A"}
                    </div>
                    {/*<Badge variant="destructive">High Temperature</Badge>*/}
                </CardFooter>
            </Card>
        </Link>
    );
};