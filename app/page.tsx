import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/hero";
import {MobileNav} from "@/components/mobile-nav";
import {FeaturedWorks} from "@/components/features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#141414]">
          <Sidebar />
          <MobileNav />
        <main className="flex flex-col items-center flex-1 relative ml-0 lg:ml-64 max-lg:mt-24">
            <Hero />
            <FeaturedWorks />
            <Footer />
        </main>
      </div>
  );
}
