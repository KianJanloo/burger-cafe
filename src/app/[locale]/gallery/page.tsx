import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <GalleryClient />
      <Footer />
    </div>
  );
};

export default GalleryPage;