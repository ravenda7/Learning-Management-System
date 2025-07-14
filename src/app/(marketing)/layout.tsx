import { Toaster } from "@/components/ui/sonner"
import Header from "./header";
import Footer from "./footer";


export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="min-h-screen w-full flex flex-col bg-white">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
  );
}
