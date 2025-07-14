import BackButton from "@/components/shared/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-3">
        <header>
            <BackButton />
        </header>
        <main className="flex-1 flex items-center justify-center">
            {children}
        </main>
    </div>
  );
}