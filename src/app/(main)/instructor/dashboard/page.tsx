'use client';

import { Loader } from '@/components/shared/loader';
import { SiteHeader } from '@/components/sidebar/site-header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InstructorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !session.user) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session || !session.user) {
    return null;
  }

  return (
    <>
      <SiteHeader title="dashboard" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          dashboard instructor
        </div>
      </div>
    </>

  );
}
