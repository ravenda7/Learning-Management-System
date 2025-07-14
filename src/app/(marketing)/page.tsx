import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[76vh]">
      <div className="container mx-auto flex flex-col items-center p-4">
        <div className="flex flex-col justify-center items-center space-y-4 text-center">
          <span className="border-1 border-gray-200 p-2 rounded-sm text-sm text-gray-600 font-semibold shadow">The future of Online Learning</span>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Elevate Your Learning Experince</h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Discover a new way to lean with our modern, interactive learning management
              system. Access high-quality courses anytime, anywhere.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/courses">
            <Button>
              Explore Courses
            </Button>
            </Link>
            <Link href="/sign-up">
            <Button>
              Sign up
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
