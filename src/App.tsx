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
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Features />
        <Pricing />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
