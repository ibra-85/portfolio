import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/hero";
import {MobileNav} from "@/components/mobile-nav";
import { GithubContributionGraph } from "@/components/GithubContributionGraph";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getProjects } from "@/data/projects";
import dynamic from "next/dynamic";

const FeaturedWorks = dynamic(
    () => import("@/components/features").then((m) => m.FeaturedWorks),
    { loading: () => <section className="w-full border-y border-[#292929] py-12" aria-hidden="true" /> }
);

export default function Home() {
  const projects = getProjects();
  
  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#141414]">
          <StructuredData type="website" projects={projects} />
          <Sidebar />
          <MobileNav />
        <main id="main-content" className="flex flex-col items-center flex-1 relative ml-0 lg:ml-64 max-lg:mt-24">
            <ScrollToTop />
            <Hero />
            <FeaturedWorks />
            <GithubContributionGraph />
            <Footer />
        </main>
      </div>
  );
}
