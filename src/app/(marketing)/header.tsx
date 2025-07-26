import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Header (){

    return (
        <header className="flex items-center border-b-1 border-gray-200 shadow-sm sticky top-0 z-50 bg-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex itecems-center space-x-6">
                    <h1 className="text-xl font-bold">NetupLMS</h1>
                    <ul  className="space-x-4 items-center font-semibold hidden sm:flex">
                        <li className="hover:underline">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:underline">
                            <Link href="/courses">Courses</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Link href="sign-in">   
                    <Button>Sign in</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}