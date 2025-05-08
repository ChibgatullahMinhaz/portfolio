import React from "react";
import Banner from "../../Components/Banner";
import ServiceSection from "../../Components/ServiceSection";
import ContactSection from "../../Components/ContactSection";
import RecentProject from "../../Components/RecentProject";

export const Home = () => {
  return (
    <div className="px-4">
      <Banner />
      <ServiceSection />
      <RecentProject />
      <ContactSection />
    </div>
  );
};
