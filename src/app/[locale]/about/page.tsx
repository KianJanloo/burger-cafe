import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutClient from "@/components/AboutClient";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <AboutClient />
      <Footer />
    </div>
  );
};

export default AboutPage;