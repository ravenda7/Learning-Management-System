import { ChartBarStacked } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
    id: number;
    title: string;
    description: string;
    thubmail: string;
    category: string;
}

export default function CoursesCard ({
    id,
    title,
    description,
    thubmail,
    category
}: Props) {

    return (
        <div className="flex flex-col gap-y-2 border-1 border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="h-48 w-full overflow-hidden rounded-t-md">
                <Image src={thubmail} alt="photo" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
            <div className="p-2 space-y-2">
                <div className="text-sm">
                <h1 className="text-lg font-semibold truncate">{title}</h1>
                <p className="truncate text-gray-600">{description}</p>
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                    <span className="bg-gray-200 p-1 rounded-sm">
                        <ChartBarStacked className="w-4 h-4" />
                    </span>
                    <p className="font-semibold">{category}</p>
                </div>
                <Button className="w-full cursor-pointer">Learn More</Button>
            </div>
        </div>
    )
}