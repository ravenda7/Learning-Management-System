import SignInForm from "@/components/form/sign-in-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function SigninPage() {

    return (
        <div className="flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-2xl font-bold">NetupLMS.</h1>
            <Card>
            <CardHeader>
                <CardTitle className="text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">Sign-in with you credentials to access the system.</CardDescription>
            </CardHeader>
            <CardContent className="w-full sm:min-w-xl">
                <SignInForm />
            </CardContent>
            </Card>
            <div className="text-center text-sm text-muted-foreground">
                <p>By clicking sigin, you agree to our</p>
                <p><span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span></p>
            </div>
        </div>
    )
}