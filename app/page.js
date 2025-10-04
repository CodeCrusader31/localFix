import React from 'react'
import Headers from "@/components/headers";
import ServicesSection from "@/components/serviceSection";
import Features from "@/components/features";
import Footer from '@/components/footer';
import Testimonals from '@/components/testimonials';
function Home() {
  return (
  <div>
    <Headers />

    <ServicesSection />
    <Features />
    <Testimonals />
    <Footer />
  </div>
  );
}

export default Home