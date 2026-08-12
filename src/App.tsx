import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Logos from './components/Logos';
import CaseStudies from './components/CaseStudiesRedesign';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import { blogPosts } from './components/BlogContent';
import { setCtaVisibility, setSectionVisibility } from './analytics';

export default function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const view = searchParams.get('view');
  const postSlug = searchParams.get('post');
  const isCaseStudiesPage = view === 'case-studies';
  const isBlogPage = view === 'blog';
  const activeBlogPost = blogPosts.find((post) => post.slug === postSlug);

  useEffect(() => {
    document.title =
      isBlogPage && activeBlogPost
        ? `${activeBlogPost.title} — BrewPot`
        : isBlogPage
          ? 'Blog — BrewPot'
          : isCaseStudiesPage
            ? 'Case Studies — BrewPot'
            : 'BrewPot';
  }, [activeBlogPost, isBlogPage, isCaseStudiesPage]);

  useEffect(() => {
    if (isBlogPage || isCaseStudiesPage || !window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isBlogPage, isCaseStudiesPage]);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-analytics-section]')];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const section = element.dataset.analyticsSection;
          if (!section) return;

          setSectionVisibility(
            section,
            entry.isIntersecting,
            entry.intersectionRatio,
            sections.indexOf(element),
          );
        });
      },
      { threshold: [0, 0.2, 0.5, 0.75] },
    );

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const ctaId = element.dataset.analyticsCta;
          if (!ctaId) return;

          setCtaVisibility(
            ctaId,
            entry.isIntersecting,
            entry.intersectionRatio,
            element.dataset.analyticsCtaSource ?? 'unknown',
            element.dataset.analyticsCtaLabel ?? element.textContent?.trim() ?? ctaId,
          );
        });
      },
      { threshold: [0, 0.5, 0.75] },
    );
    const observedCtas = new WeakSet<HTMLElement>();
    const observeCtas = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-analytics-cta]').forEach((cta) => {
        if (observedCtas.has(cta)) return;
        observedCtas.add(cta);
        ctaObserver.observe(cta);
      });
    };
    const mutationObserver = new MutationObserver(() => observeCtas(document));

    sections.forEach((section) => sectionObserver.observe(section));
    observeCtas(document);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      sectionObserver.disconnect();
      ctaObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative bg-[#fdfcfb] font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        {isCaseStudiesPage ? (
          <CaseStudies />
        ) : isBlogPage ? (
          <BlogPage postSlug={postSlug} />
        ) : (
          <>
            <Hero />
            <Logos />
            <Pricing />
            <Gallery />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
