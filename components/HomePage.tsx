"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import { CmsProvider } from "@/components/CmsProvider";
import type { CmsData } from "@/lib/cms";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

function SectionFallback() {
  return <div className="section-gap" aria-hidden />;
}

const CourseVideo = dynamic(() => import("@/components/sections/CourseVideo"), { loading: SectionFallback });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { loading: SectionFallback });
const VideoTestimonials = dynamic(() => import("@/components/sections/VideoTestimonials"), { loading: SectionFallback });
const Mentor = dynamic(() => import("@/components/sections/Mentor"), { loading: SectionFallback });
const Transformation = dynamic(() => import("@/components/sections/Transformation"), { loading: SectionFallback });
const StudentResults = dynamic(() => import("@/components/sections/StudentResults"), { loading: SectionFallback });
const Curriculum = dynamic(() => import("@/components/sections/Curriculum"), { loading: SectionFallback });
const BatchDetails = dynamic(() => import("@/components/sections/BatchDetails"), { loading: SectionFallback });
const Pricing = dynamic(() => import("@/components/sections/Pricing"), { loading: SectionFallback });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { loading: SectionFallback });
const Contact = dynamic(() => import("@/components/sections/Contact"), { loading: SectionFallback });

export default function HomePage({ cms }: { cms: CmsData }) {
  return (
    <CmsProvider cms={cms}>
      <SmoothScroll>
        <main className="bg-deep-black min-h-screen">
          <Navbar />
          <Hero />
          <CourseVideo />
          <Testimonials />
          <VideoTestimonials />
          <Mentor />
          <Transformation />
          <StudentResults />
          <Curriculum />
          <BatchDetails />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
      </SmoothScroll>
    </CmsProvider>
  );
}
