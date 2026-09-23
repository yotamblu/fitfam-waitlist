import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import DisciplinesSection from "@/components/DisciplinesSection";
import SocialProofSection from "@/components/SocialProofSection";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollExperience from "@/components/ScrollExperience";
import SectionConnector from "@/components/SectionConnector";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="md:hidden">
        <Hero />
        <SectionConnector accent="ember" />
        <ProblemSection />
        <SectionConnector accent="volt" />
        <DisciplinesSection />
        <SectionConnector accent="info" />
        <SocialProofSection />
        <SectionConnector accent="ember" />
        <WaitlistForm />
      </div>

      <div className="hidden md:block">
        <ScrollExperience />
      </div>

      <Footer />
    </main>
  );
}
