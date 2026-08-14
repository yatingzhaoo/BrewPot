import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { track } from '../analytics';
import {
  CASE_STUDIES,
  type CaseStudy,
  projectProperties,
} from './CaseStudies';
import {
  CASE_STUDY_DETAILS,
  type CaseStudyComparison,
} from './CaseStudyDetails';

function ComparisonFrame({ comparison }: { comparison: CaseStudyComparison }) {
  const isPortrait = comparison.layout === 'portrait';
  const isRightPanelCrop = comparison.crop === 'right-panel';
  const isCriteriaAreaCrop = comparison.crop === 'criteria-area';
  const isStacked = !isPortrait && !isRightPanelCrop;
  const gridClass = isRightPanelCrop
    ? 'grid-cols-2 justify-center gap-4 sm:grid-cols-[240px_240px] sm:gap-6'
    : isStacked
      ? 'grid-cols-1 justify-items-center gap-7'
      : 'grid-cols-2 justify-center gap-4 sm:grid-cols-[170px_170px] sm:gap-6';
  const imageShadow = 'shadow-[0_2px_8px_rgba(32,32,32,0.08),0_20px_42px_-16px_rgba(32,32,32,0.24)]';

  return (
    <div className={`grid ${gridClass} w-full items-start rounded-[14px] bg-[#f3f1ed] p-5 sm:p-8`}>
      {([
        ['Before', comparison.before, comparison.beforeAlt],
        ['After', comparison.after, comparison.afterAlt],
      ] as const).map(([label, src, alt]) => (
        <div
          key={label}
          className={`flex min-w-0 flex-col items-center gap-3 ${isRightPanelCrop ? 'w-full max-w-[240px]' : 'w-full'}`}
        >
          <span className="font-heading text-[13px] font-semibold leading-5 text-[#54514d] sm:text-[14px]">
            {label}
          </span>
          <div
            className={`flex w-full min-w-0 items-start justify-center ${isRightPanelCrop || isCriteriaAreaCrop ? imageShadow : ''} ${
              isRightPanelCrop
                ? 'relative aspect-[0.7/1] overflow-hidden rounded-[9px]'
                : isCriteriaAreaCrop
                  ? 'relative aspect-[2/1] overflow-hidden rounded-[9px]'
                  : isPortrait
                    ? 'h-[340px] sm:h-[460px]'
                    : 'relative aspect-[1.7/1] rounded-[9px]'
            }`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className={isRightPanelCrop
                ? 'absolute inset-y-0 right-0 h-full w-auto max-w-none'
                : isCriteriaAreaCrop
                  ? 'absolute inset-0 h-full w-full object-cover object-top'
                  : `${isPortrait
                    ? 'h-full w-auto max-w-full rounded-[9px] object-contain'
                    : 'absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain'} ${imageShadow}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function caseFromUrl() {
  const caseId = new URLSearchParams(window.location.search).get('case');
  return CASE_STUDIES.find((caseStudy) => caseStudy.id === caseId) ?? null;
}

export default function CaseStudiesRedesign() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(caseFromUrl);
  const activeCaseStudyRef = useRef<CaseStudy | null>(activeCaseStudy);
  const openedAt = useRef<number | null>(activeCaseStudy ? Date.now() : null);

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
    window.history.pushState({}, '', `/?view=case-studies&case=${caseStudy.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCaseStudy = (source = 'browser_back') => {
    const caseStudy = activeCaseStudyRef.current;
    if (caseStudy) {
      track('case_study_closed', {
        ...projectProperties(caseStudy),
        source,
        active_open_time_ms: openedAt.current === null ? null : Date.now() - openedAt.current,
        content_source: 'yatingzhao.com',
        page_area: 'case_studies.detail',
        page_area_label: '案例研究详情',
      });
    }

    activeCaseStudyRef.current = null;
    openedAt.current = null;
    setActiveCaseStudy(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToCaseStudies = () => {
    window.history.pushState({}, '', '/?view=case-studies');
    closeCaseStudy('back_to_projects');
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextCaseStudy = caseFromUrl();
      if (!nextCaseStudy && activeCaseStudyRef.current) closeCaseStudy();
      if (nextCaseStudy) {
        activeCaseStudyRef.current = nextCaseStudy;
        openedAt.current = Date.now();
        setActiveCaseStudy(nextCaseStudy);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeCaseStudy) return;
    document.title = `${activeCaseStudy.title} — BrewPot Case Study`;
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
    return () => window.clearTimeout(engagementTimer);
  }, [activeCaseStudy]);

  if (activeCaseStudy) {
    const detail = CASE_STUDY_DETAILS[activeCaseStudy.id];

    return (
      <>
        <article data-analytics-section="case_study_detail" className="min-h-screen bg-[#fdfcfb] pb-24 pt-24 md:pb-32 md:pt-28">
          <div className="mx-auto w-full max-w-[720px] px-6 md:px-0">
              <div className="flex w-full flex-col gap-5 text-[16px] leading-[28px] text-[#302e2b] sm:text-[17px] sm:leading-[30px]">
                {detail.overview.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-14 flex flex-col gap-14 md:mt-16 md:gap-16">
                {detail.sections.map((section, index) => (
                  <section key={`${activeCaseStudy.id}-${index}`} className="flex flex-col">
                    {section.heading && (
                      <h2 className="font-heading text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] text-[#202020] sm:text-[24px]">
                        {section.heading}
                      </h2>
                    )}

                    {section.image && (
                      <div className={`${section.heading ? 'mt-6' : ''} ${section.transparentImage
                        ? 'relative flex w-full items-center justify-center overflow-hidden'
                        : 'case-study-media-bg relative flex w-full items-center justify-center overflow-hidden rounded-[14px] p-5 sm:p-8'}`}>
                        <img
                          src={section.image}
                          alt={section.heading ?? activeCaseStudy.title}
                          loading="lazy"
                          className={section.transparentImage
                            ? 'h-auto w-full object-contain'
                            : 'h-auto w-full rounded-[9px] border border-black/[0.05] object-contain shadow-[0_12px_34px_rgba(32,32,32,0.08)]'}
                        />
                      </div>
                    )}

                    {section.comparison && (
                      <div className={section.heading ? 'mt-6' : ''}>
                        <ComparisonFrame comparison={section.comparison} />
                      </div>
                    )}

                    {section.paragraphs.length > 0 && (
                      <div className={`${section.heading || section.image || section.comparison ? 'mt-6' : ''} flex w-full flex-col gap-5 text-[16px] leading-[28px] text-[#302e2b] sm:text-[17px] sm:leading-[30px]`}>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </section>
                ))}

                <button
                  type="button"
                  onClick={returnToCaseStudies}
                  className="group mx-auto mt-2 inline-flex min-h-11 w-fit items-center gap-2 rounded-[10px] bg-[#202020] px-5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Back to case studies
                </button>
              </div>
          </div>
        </article>
      </>
    );
  }

  return (
    <section id="case-studies" data-analytics-section="case_studies" className="min-h-screen bg-[#fdfcfb] pb-28 pt-24 md:pt-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-11 md:grid-cols-2 md:gap-x-7 md:gap-y-14">
          {CASE_STUDIES.map((caseStudy) => (
            <button
              type="button"
              key={caseStudy.id}
              className="group flex w-full flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              onClick={() => openCaseStudy(caseStudy)}
              aria-label={`Open ${caseStudy.title} case study`}
            >
              <div className="relative flex aspect-[1.34] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f0f1ef] transition-colors duration-200 group-hover:bg-[#ebece9]">
                <div className={`flex items-center justify-center ${
                  caseStudy.id === 'notta' ? 'h-[72%] w-[72%]' : 'h-[88%] w-[88%]'
                }`}>
                  <img
                    src={caseStudy.cover}
                    alt={`${caseStudy.title} product design case study`}
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01] ${
                      caseStudy.id === 'vectrro'
                        ? 'rounded-none'
                        : 'rounded-[8px] border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                    }`}
                  />
                </div>
              </div>

              <div className="flex w-full items-start gap-3 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-black/[0.06] bg-white">
                  <img
                    src={caseStudy.logo}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0 pt-px">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-[18px] font-semibold leading-5 tracking-[-0.02em] text-[#202020]">{caseStudy.title}</h2>
                    <span className="rounded-full border border-black/[0.08] bg-[#f3f1ed] px-2 py-0.5 text-[11px] font-medium leading-4 text-[#737373]">
                      {caseStudy.fundingStage}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-5 text-[#737373]">{caseStudy.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
