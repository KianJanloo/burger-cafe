import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReservationClient from "@/components/ReservationClient";

const ReservationPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <ReservationClient />
      <Footer />
    </div>
  );
};

export default ReservationPage;