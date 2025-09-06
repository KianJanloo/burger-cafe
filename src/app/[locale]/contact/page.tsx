import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactClient from "@/components/ContactClient";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <ContactClient />
      <Footer />
    </div>
  );
};

export default ContactPage;