import React from "react";
import Banner from "../../Components/Banner";
import ServiceSection from "../../Components/ServiceSection";
import ContactSection from "../../Components/ContactSection";

export const Home = () => {
  return (
    <div className="px-4">
      <Banner />
      <ServiceSection />
      <ContactSection />
    </div>
  );
};
