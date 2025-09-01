import React from 'react'
import Headers from "@/components/headers";
import ServicesSection from "@/components/serviceSection";
import Features from "@/components/features";
import Footer from '@/components/footer';
function Home() {
  return (
  <div>
    <Headers />

    <ServicesSection />
    <Features />
    <Footer />
  </div>
  );
}

export default Home