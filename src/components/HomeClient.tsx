"use client";

import HeroSection from "@/components/HeroSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import Testimonials from "@/components/Testimonials";
import { Fragment } from "react";

const HomeClient = () => {
  return (
    <Fragment>
      <HeroSection />
      <FeaturedMenu />
      <Testimonials />
    </Fragment>
  );
};

export default HomeClient;
