import SignupForm from "@/components/form/sign-up-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function SignupPage() {

    return (
        <div className="flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-2xl font-bold">NetupLMS.</h1>
            <Card>
            <CardHeader>
                <CardTitle className="text-center">Get Started</CardTitle>
                <CardDescription className="text-center">Sign-up with your Email account</CardDescription>
            </CardHeader>
            <CardContent className="w-full sm:min-w-2xl">
                <SignupForm />
            </CardContent>
            </Card>
            <div className="text-center text-sm text-muted-foreground">
                <p>By clicking signup, you agree to our</p>
                <p><span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span></p>
            </div>
        </div>
    )
}