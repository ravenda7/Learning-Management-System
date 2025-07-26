'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query";
import EditProfileForm from "./edit-profile";
import ChangePasswordForm from "./edit-password";
import { useFetchProfile } from "@/hooks/use-fetch-profile";
import { Loader } from "../loader";


export default function ManageProfile() {
    const { data: profile, isLoading } = useFetchProfile();

    if (isLoading) {
        return <div className="flex items-center justify-center h-full"><Loader /></div>
    }

    console.log("Profile Data:", profile);
    return(
        <Tabs defaultValue="account" className="w-full sm:w-[60%]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className='w-full'>
                <EditProfileForm
                    id={profile.id}
                    name={profile.name || ''}
                    email={profile.email || ''}
                />
            </TabsContent>
            <TabsContent value="password">
              <ChangePasswordForm id={profile.id} />
            </TabsContent>
        </Tabs>
    )
}