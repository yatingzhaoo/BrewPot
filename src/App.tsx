import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative bg-[#faf9f8] font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Pricing />
        <Features />
        <FAQ />
        <Booking />
      </main>
      <Footer />

      {/* Bottom page decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(255, 149, 0, 0.12) 0%, rgba(255, 149, 0, 0) 40%)',
          zIndex: 10,
        }}
      />
    </div>
  );
}
