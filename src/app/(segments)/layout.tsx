import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default layout;
