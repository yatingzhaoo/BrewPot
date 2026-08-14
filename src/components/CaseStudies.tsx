import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '../analytics';
import vectrroCover from '../asset/case-studies/vectrro-cover.png';
import nottaCover from '../asset/case-studies/notta-cover.png';
import hitaCover from '../asset/case-studies/hita-cover.png';
import cooragentCover from '../asset/case-studies/cooragent-cover.png';

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  fundingStage: string;
  cover: string;
  overview: string[];
  highlights: Array<{ heading: string; body: string }>;
};

export const SOURCE_URL = 'https://yatingzhao.com';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'notta',
    title: 'Notta',
    subtitle: 'Meeting notetaker',
    fundingStage: 'Series B',
    cover: nottaCover,
    overview: [
      'Since June 2025, Yating has served as an external consultant for Notta, a global voice AI product with more than 15 million users as of December 2025.',
      'The collaboration addresses onboarding, payment conversion, homepage capability communication, core AI feature integration, transcription simplification, and new product directions.',
    ],
    highlights: [
      {
        heading: 'Ongoing product design partnership',
        body: 'The work is embedded with Notta’s internal product and design teams rather than limited to isolated interface delivery, allowing product strategy and execution details to be improved together.',
      },
      {
        heading: 'Confidential product work',
        body: 'Specific flows and results cannot be shared publicly because of a non-disclosure agreement. The public case study therefore focuses on the scope and nature of the collaboration.',
      },
    ],
  },
  {
    id: 'hita',
    title: 'HiTA',
    subtitle: 'Higher education AI',
    fundingStage: 'Seed',
    cover: hitaCover,
    overview: [
      'HiTA is an AI teaching-assistant platform co-founded by university professors and used by institutions including Cornell, the University of Colorado, and Michigan State University.',
      'Rapid feature growth had made its hierarchy difficult for students, faculty, and administrators to understand, limiting both usability and future expansion.',
    ],
    highlights: [
      {
        heading: 'Let structure teach students how to use the product',
        body: 'Each assistant became a focused workspace with clear branding and breadcrumbs. Simplifying the global menu helped users understand where they were while still supporting overlapping roles such as student, teaching assistant, and administrator.',
      },
      {
        heading: 'Rebuild team consensus through a shared framework',
        body: 'The product’s capabilities were organized into teaching, administration, office support, and recruitment. This gave the team a common language for internal planning and external communication.',
      },
      {
        heading: 'Explain value from an administrator’s perspective',
        body: 'The website narrative shifted from listing features to showing how AI reduces repetitive work, improves communication, and helps institutions allocate resources more effectively.',
      },
    ],
  },
  {
    id: 'cooragent',
    title: 'Cooragent',
    subtitle: 'AI agents',
    fundingStage: 'Seed',
    cover: cooragentCover,
    overview: [
      'Cooragent is an AI agent platform originating from Tsinghua University’s LEAP Lab. Its technical capabilities were strong, but new users struggled to understand what the product could do and how to create or manage agents.',
      'The engagement clarified the information architecture, product positioning, interaction model, and brand system so complex capabilities could feel understandable and trustworthy.',
    ],
    highlights: [
      {
        heading: 'Separate marketing from product functionality',
        body: 'Marketing content and core tools previously competed on the same screen. Separating them created a familiar SaaS structure, lowered the entry barrier, and gave both surfaces room to evolve.',
      },
      {
        heading: 'Design for casual and advanced users together',
        body: 'The default path lets general users move directly from an instruction to a result, while clear secondary entry points expose agent creation, configuration, and marketplace tools for advanced users.',
      },
      {
        heading: 'Move beyond the generic “AI look”',
        body: 'A clean and reusable visual system replaced the heavy blue-purple-black aesthetic. More accessible messaging helped visitors understand the product’s value without relying on technical jargon.',
      },
    ],
  },
  {
    id: 'vectrro',
    title: 'Vectrro',
    subtitle: 'Trucking operation',
    fundingStage: 'Pre-seed',
    cover: vectrroCover,
    overview: [
      'Vectrro is a Los Angeles logistics AI startup. After securing angel investment, the team needed to turn a rough product concept into an AI-assisted quoting workflow for freight brokers.',
      'Over two to three months, the work covered product strategy, interaction and interface design, brand identity, the official website, and presentation materials.',
    ],
    highlights: [
      {
        heading: 'Supplement the broker workflow instead of replacing it',
        body: 'Rather than asking brokers to abandon email, the product became a lightweight browser extension. A split-screen experience keeps the original inquiry visible beside AI-extracted shipment details, quote recommendations, calculation logic, and a reply draft.',
      },
      {
        heading: 'AI handles 90%; the broker confirms the final 10%',
        body: 'Quoting affects real client relationships, so the system automates repetitive work while preserving human review. Users choose data sources, control synchronization, and can adjust the final response before sending.',
      },
      {
        heading: 'Progressive disclosure for complex pricing logic',
        body: 'The interface shows the useful outcome first—the final quote email—then lets users reveal calculations and source-platform details only when they need to audit the recommendation.',
      },
    ],
  },
];

export function projectProperties(caseStudy: CaseStudy) {
  return {
    project: caseStudy.title,
    project_title: caseStudy.title,
    project_id: caseStudy.id,
    project_subtitle: caseStudy.subtitle,
  };
}

export default function CaseStudies() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const activeCaseStudyRef = useRef<CaseStudy | null>(null);
  const openedAt = useRef<number | null>(null);

  const openCaseStudy = (caseStudy: CaseStudy) => {
    const properties = projectProperties(caseStudy);
    track('project_card_clicked', {
      ...properties,
      has_case_study: true,
      source: 'Case Studies 独立页面',
      page_area: 'case_studies.index',
      page_area_label: '案例研究独立页面',
    });
    track('case_study_opened', {
      ...properties,
      source: 'case_study_card',
      content_source: 'yatingzhao.com',
      page_area: 'case_studies.index',
      page_area_label: '案例研究独立页面',
    });
    activeCaseStudyRef.current = caseStudy;
    openedAt.current = Date.now();
    setActiveCaseStudy(caseStudy);
  };

  const closeCaseStudy = useCallback((source: 'back_button' | 'close_button' | 'backdrop' | 'escape') => {
    const caseStudy = activeCaseStudyRef.current;
    if (!caseStudy) return;

    track('case_study_closed', {
      ...projectProperties(caseStudy),
      source,
      active_open_time_ms: openedAt.current === null ? null : Date.now() - openedAt.current,
      content_source: 'yatingzhao.com',
      page_area: 'case_studies.detail',
      page_area_label: '案例研究详情',
    });
    activeCaseStudyRef.current = null;
    openedAt.current = null;
    setActiveCaseStudy(null);
  }, []);

  useEffect(() => {
    if (!activeCaseStudy) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCaseStudy('escape');
    };
    window.addEventListener('keydown', handleKeyDown);

    const engagementTimer = window.setTimeout(() => {
      track('case_study_engaged', {
        ...projectProperties(activeCaseStudy),
        active_open_time_ms: 10_000,
        engagement_threshold_ms: 10_000,
        content_source: 'yatingzhao.com',
        page_area: 'case_studies.detail',
        page_area_label: '案例研究详情',
      });
    }, 10_000);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(engagementTimer);
    };
  }, [activeCaseStudy, closeCaseStudy]);

  return (
    <section
      id="case-studies"
      data-analytics-section="case_studies"
      className="relative min-h-screen pt-32 pb-24 bg-transparent"
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-3">Selected work</p>
            <h2 className="font-heading font-medium text-[42px] md:text-[52px] text-[#202020] tracking-tight leading-tight">Case Studies</h2>
          </div>
          <p className="text-[18px] leading-7 text-neutral-500 max-w-[460px] md:text-right">
            Product decisions, not just polished screens. Explore how complex workflows became clearer and easier to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {CASE_STUDIES.map((caseStudy) => (
            <button
              type="button"
              key={caseStudy.id}
              className="group text-left"
              onClick={() => openCaseStudy(caseStudy)}
              aria-label={`Open ${caseStudy.title} case study`}
            >
              <div className="relative aspect-[1.45] overflow-hidden rounded-[12px] bg-[#f1f1f0] border border-[#E5E5E8]">
                <img
                  src={caseStudy.cover}
                  alt={`${caseStudy.title} product design case study`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 border border-black/5 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 mt-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[20px] font-semibold text-[#202020] tracking-tight">{caseStudy.title}</h3>
                    <span className="text-[11px] font-medium text-neutral-500 border border-black/10 rounded-[4px] px-1.5 py-1">{caseStudy.fundingStage}</span>
                  </div>
                  <p className="text-[15px] text-neutral-500 mt-1">{caseStudy.subtitle}</p>
                </div>
                <span className="text-[14px] font-medium text-neutral-500 group-hover:text-black transition-colors mt-1">Read case</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCaseStudy.title} case study`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-sm p-3 md:p-6"
            onClick={() => closeCaseStudy('backdrop')}
          >
            <motion.article
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#faf9f8] rounded-[16px] w-full max-w-[920px] h-full mx-auto overflow-y-auto overscroll-contain"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-20 flex items-center justify-between px-5 md:px-8 h-16 bg-[#faf9f8]/90 backdrop-blur-md border-b border-black/5">
                <button
                  type="button"
                  onClick={() => closeCaseStudy('back_button')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-neutral-600 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to case studies
                </button>
                <button
                  type="button"
                  aria-label="Close case study"
                  onClick={() => closeCaseStudy('close_button')}
                  className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-5 md:px-12 pt-10 md:pt-14 pb-20">
                <div className="max-w-[720px] mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Case study</span>
                    <span className="text-[11px] font-medium text-neutral-500 border border-black/10 rounded-[4px] px-1.5 py-1">{activeCaseStudy.fundingStage}</span>
                  </div>
                  <h2 className="font-heading font-medium text-[48px] md:text-[68px] text-[#202020] tracking-tight leading-none">{activeCaseStudy.title}</h2>
                  <p className="text-[20px] text-neutral-500 mt-3">{activeCaseStudy.subtitle}</p>

                  <div className="mt-10 rounded-[12px] overflow-hidden bg-[#f1f1f0] border border-[#E5E5E8]">
                    <img src={activeCaseStudy.cover} alt={`${activeCaseStudy.title} case study cover`} className="w-full h-auto" />
                  </div>

                  <div className="mt-10 space-y-5 text-[17px] leading-8 text-[#303030]">
                    {activeCaseStudy.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>

                  <div className="mt-14 space-y-12">
                    {activeCaseStudy.highlights.map((highlight, index) => (
                      <section key={highlight.heading} className="border-t border-black/10 pt-8">
                        <div className="text-[12px] font-semibold text-neutral-400 mb-3">0{index + 1}</div>
                        <h3 className="text-[25px] md:text-[30px] font-semibold text-[#202020] tracking-tight leading-tight">{highlight.heading}</h3>
                        <p className="text-[17px] leading-8 text-neutral-600 mt-4">{highlight.body}</p>
                      </section>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <p className="text-[14px] text-neutral-500">Temporarily adapted from Yating Zhao’s personal portfolio.</p>
                    <a
                      href={SOURCE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-black hover:opacity-60 transition-opacity"
                      onClick={() => track('outbound_link_clicked', {
                        ...projectProperties(activeCaseStudy),
                        label: 'View source portfolio',
                        href: SOURCE_URL,
                        source: 'case_study_detail',
                      })}
                    >
                      View source portfolio <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
