import React from "react";
import Banner from "../../Components/Banner";
import ServiceSection from "../../Components/ServiceSection";
import ContactSection from "../../Components/ContactSection";
import RecentProject from "../../Components/RecentProject";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <>
     <Helmet>
        <title>Home - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link
          rel="shortcut icon"
          href="ch_favLogo.png"
          type="image/x-icon"
        />
      </Helmet>
    <div className="px-4">
      <Banner />
      <RecentProject />
      <ServiceSection />
      <ContactSection />
    </div>
    </>
  );
};
