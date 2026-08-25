import cooragentLanding from '../asset/case-studies/detail/cooragent-landing.png';
import cooragentAgentMarket from '../asset/case-studies/detail/cooragent-agent-market.png';
import cooragentMessages from '../asset/case-studies/detail/cooragent-messages.png';
import cooragentTaskCollaborationBefore from '../asset/case-studies/detail/cooragent-task-collaboration-before.png';
import vectrroCover from '../asset/case-studies/detail/vectrro-cover.png';
import vectrroWorkflow from '../asset/case-studies/detail/vectrro-workflow.png';
import vectrroBrand from '../asset/case-studies/detail/vectrro-brand.png';
import nottaCover from '../asset/case-studies/detail/notta-cover.png';
import hitaCover from '../asset/case-studies/detail/hita-cover.png';
import hitaFramework from '../asset/case-studies/detail/hita-framework.png';
import hitaGradingWorkspaceBefore from '../asset/case-studies/detail/hita-grading-workspace-before-crop.png';
import hitaNavigationBefore from '../asset/case-studies/detail/hita-navigation-before.png';
import hitaNavigationAfter from '../asset/case-studies/detail/hita-navigation-after.png';
import hitaGradingBefore from '../asset/case-studies/detail/hita-grading-before.png';
import hitaGradingAfter from '../asset/case-studies/detail/hita-grading-after.png';
import hitaWebsiteBefore from '../asset/case-studies/detail/hita-website-before.png';
import hitaWebsiteAfter from '../asset/case-studies/detail/hita-website-after.png';

export type CaseStudyComparison = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  layout: 'portrait' | 'landscape';
  crop?: 'right-panel' | 'criteria-area';
};

export type CaseStudySection = {
  heading?: string;
  paragraphs: string[];
  image?: string;
  transparentImage?: boolean;
  comparison?: CaseStudyComparison;
};

export type CaseStudyDetail = {
  hero: string;
  overview: string;
  sections: CaseStudySection[];
  heroBorderless?: boolean;
};

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  vectrro: {
    hero: vectrroCover,
    heroBorderless: true,
    overview: `Vectrro is a logistics AI startup based in Los Angeles. When the founders approached me after securing angel investment, their product had only very crude basic features and was essentially a blank slate. They wanted to build an AI-driven quoting feature to help brokers complete the inquiry and quoting process more efficiently in their daily work.\n\nThe founding team has extensive experience in the logistics industry and was looking for a versatile designer who understood the sector, possessed product design expertise, and could also handle website development and brand identity, which was a significant challenge for them.\n\nOver the next two to three months, I successfully helped them complete a systematic design implementation, ranging from product design strategy and interaction design to visual interface, brand identity, official website, and presentation decks.`,
    sections: [
      {
        heading: 'Prioritize supplementation over replacement and respect current broker habits',
        paragraphs: [
          `Brokers rely on email for their daily work. They must extract unstructured information from customer inquiry emails, analyze price trends across multiple platforms, and then manually organize a reasonable quote. This process is time-consuming and repetitive.`,
          `Our goal is to have AI automatically identify and extract key information from emails, enter it into the Transportation Management System (TMS), provide reasonable quote suggestions based on multi-dimensional data, and automatically generate reply emails, thereby significantly reducing the workload for brokers.`,
          `During the early prototyping stage, we experimented with various interface forms, including conversational interfaces and traditional email editors. After iterative testing, we established a key design strategy: Instead of replacing the brokers’ original methods, we would become an intelligent supplement to their workflow.`,
          `This decision stemmed from a careful consideration of the actual situation. If we chose to replace everything entirely, brokers would have to abandon the communication tools they are already familiar with, leading to high migration costs. Meanwhile, developing a fully featured replacement system would require substantial resources. In contrast, the “build an additional assistant” approach is more pragmatic. It integrates into users’ existing habits at a lower cost, allowing AI to truly be effective.`,
          `Based on this judgment, we adopted a lightweight browser extension format. This choice greatly simplified the subsequent design and development processes.`,
          `The extension interface uses a split-screen layout, allowing brokers to place the original email side-by-side with the AI’s analysis and recommendations. Brokers view the original email on the left and the key information and recommended quotes extracted by the AI in real-time on the right. They can also see the calculation logic and automatically generated reply drafts, which avoids unnecessary repetitive displays while making it easy for brokers to review and adjust.`,
        ],
      },
      {
        heading: 'Balancing Full Automation and Broker Control',
        image: vectrroWorkflow,
        paragraphs: [
          `Quoting is not just about money; it is about clients. It requires careful handling, which means it cannot be entirely automated by AI. Especially considering that real-world quotes can be extremely complex (for instance, multiple shipments with different destinations and transit points), there is still room for AI recognition to mature.`,
          `Therefore, we established the principle of “AI handles 90%, Broker confirms the final 10%.” This means AI processes repetitive tasks while the broker retains critical judgment. This approach significantly boosts efficiency while ensuring the security and control that comes with human oversight.`,
          `Pricing rules vary significantly across different platforms. Our design maintains overall UI consistency while providing clear explanations for each platform’s specific rules. Brokers can decide for themselves which data sources to reference and can exclude platforms with low reference value at any time, keeping the decision-making power firmly in their hands.`,
          `The system also refrains from auto-refreshing when prices update. Instead, it prompts the user to choose whether to sync, avoiding the anxiety caused by frequent fluctuations and returning control to the brokers.`,
          `The overall interface style strives for professional simplicity. Since a large amount of information needs to be presented, I meticulously adjusted the layout, spacing, and element hierarchy. Most functions retain default settings so users can get started quickly or fine-tune them according to personal habits, such as the tone and format of email replies.`,
        ],
      },
      {
        heading: 'Progressive Disclosure Quoting Logic',
        paragraphs: [
          `Regarding the display of quotation information, we adopted a progressive disclosure approach. First, we show the final quote email, allowing users the option to apply it with one click. If users want more information, they can dive deeper layer-by-layer to view detailed calculation logic or even jump directly to the original quote page on the corresponding platform.`,
        ],
      },
      {
        heading: 'Logistics + Intelligence: Brand and Visual Language',
        image: vectrroBrand,
        paragraphs: [
          `In terms of brand visuals, the design centers on the concept of “Logistics × Intelligence,” using black and fluorescent green to convey both modernity and reliability.`,
          `The website design aims to help users quickly understand the product’s value. Rather than cluttering the interface with numerous screenshots, I used concise conceptual videos, smooth animations, and illustrations to showcase core features.`,
          `This intuitive presentation allows visitors to rapidly grasp Vectrro’s core capabilities and establishes a unified visual foundation for subsequent marketing efforts.`,
        ],
      },
      {
        paragraphs: [
          `The design of Vectrro eventually came to fruition, successfully integrating AI capabilities naturally into familiar workflows while respecting brokers’ existing habits. This realized the transformation from a concept to a viable product.`,
        ],
      },
    ],
  },
  notta: {
    hero: nottaCover,
    overview: `Since June 2025 (as of March 2026), I have been serving as an external consultant for Notta. Notta is a global product focused on the voice AI agent market, with its user base exceeding 15 million as of December 2025.\n\nDuring this period, I have collaborated deeply with Notta’s internal design and product teams to address a series of product challenges, including: optimizing the new user onboarding experience, refining the payment flow, enhancing the capability showcase on the homepage, integrating core AI features, and simplifying the transcription workflow. Additionally, I have been involved in defining new product directions within their strategic planning.\n\nDue to a non-disclosure agreement, specific project details cannot be shared publicly.`,
    sections: [],
  },
  hita: {
    hero: hitaCover,
    overview: `HiTA is an AI teaching assistant platform co-founded by professors from several American universities, backed by Cornell University and the Colorado School of Mines. The platform is currently in use at institutions such as Cornell, the University of Colorado, and Michigan State University. By the end of 2025, it had served over 10,000 students and responded to approximately one million inquiries regarding both academics and daily life.\n\nThe team was highly mature in terms of both technology and pedagogical understanding; however, with the rapid addition of features during our collaboration, the product structure began to feel bloated. The information hierarchy became complex, often causing confusion for students and faculty during use, which also weakened its potential for further expansion.`,
    sections: [
      {
        heading: 'Let the Structure Guide Students on How to Use It',
        comparison: {
          before: hitaNavigationBefore,
          after: hitaNavigationAfter,
          beforeAlt: 'HiTA navigation before redesign',
          afterAlt: 'HiTA navigation after redesign',
          layout: 'portrait',
        },
        paragraphs: [
          `The product structure of HiTA is highly complex. The platform contains a vast number of assistants tailored to different courses and fields, with each assistant housing functional modules such as chat history, knowledge documents, and resource management. This nested hierarchy makes it easy for users to lose their way and leads to a cluttered menu. Such complexity not only increases the learning curve but also creates structural resistance when the team attempts to add new features.`,
          `HiTA’s user base includes students, teachers, administrative staff, and system administrators. Some of these roles overlap; for instance, graduate students act as both students and teaching assistants, while some teachers also serve as administrators. This multi-role structure places higher demands on information architecture design.`,
          `I attempted to find a balance where users always know their location during deep browsing without making the information structure feel heavy. My approach drew inspiration from Canva’s design philosophy: while users see a diverse range of projects from the outside, once they enter a specific project, the interface focuses entirely on the current content, creating a clear and dedicated workspace. By introducing this concept to HiTA, each assistant now forms a relatively independent space. Once a user enters an assistant, the interface revolves around it, maintaining a sense of direction through clear branding and breadcrumbs. Consequently, the menu is simplified, reducing hierarchical clutter.`,
          `This structure is particularly vital for students. They will only have the incentive to continue using the platform if they can quickly understand its capabilities. Increased engagement from students, in turn, motivates teachers to update and maintain their resources. Based on this reasoning, I enhanced the “Assistant Market” display on the homepage, making the names, types, and functions of assistants more intuitive. By equipping it with search and filter mechanisms, students can quickly locate assistants relevant to them and fully grasp the capabilities and purposes of HiTA.`,
        ],
      },
      {
        heading: 'Make Grading Criteria Easier to Scan and Manage',
        comparison: {
          before: hitaGradingBefore,
          after: hitaGradingAfter,
          beforeAlt: 'HiTA grading criteria before redesign',
          afterAlt: 'HiTA grading criteria after redesign',
          layout: 'landscape',
          crop: 'criteria-area',
        },
        paragraphs: [],
      },
      {
        heading: 'Rebuilding Consensus Through a Framework',
        comparison: {
          before: hitaGradingWorkspaceBefore,
          after: hitaFramework,
          beforeAlt: 'HiTA grading workspace before redesign',
          afterAlt: 'HiTA grading workspace after redesign',
          layout: 'landscape',
          crop: 'right-panel',
        },
        paragraphs: [
          `During early project communications, I discovered that the HiTA team had not reached a consistent understanding of the functions and values they provided. While everyone could describe their own areas of responsibility, it was difficult to clearly define the boundaries of the entire product. This ambiguity not only impacted internal collaboration efficiency but also left external promotion lacking a core narrative.`,
          `Through in-depth discussions with the founder and core members, we collectively summarized a clear capability classification framework. All of HiTA’s functions can be categorized into four directions: teaching and learning support for students and teachers, administrative service support for student affairs, office support for faculty and staff, and promotion and recruitment support for external stakeholders.`,
          `These four directions together constitute HiTA’s complete capability system, interconnected yet clearly defined. This framework helped the team establish a unified language. Whether in internal meetings or external presentations, everyone can now use the same logic to describe HiTA’s value, making communication more efficient and clear while providing a solid foundation for the brand narrative.`,
        ],
      },
      {
        heading: 'Accelerating Understanding Through Authentic Campus Spaces',
        comparison: {
          before: hitaWebsiteBefore,
          after: hitaWebsiteAfter,
          beforeAlt: 'HiTA website before redesign',
          afterAlt: 'HiTA website after redesign',
          layout: 'landscape',
        },
        paragraphs: [
          `As HiTA’s founding team comes from academia, the product is naturally intertwined with various campus scenarios, such as classroom teaching, faculty offices, and library self-study.`,
          `I realized that for university users, the most direct way to understand the product is to “see a familiar environment.” Therefore, throughout the design process, I proposed using scenarios as the narrative core, allowing product capabilities to be understood through real-life contexts. The new official website no longer presents information as an abstract list of features. Instead, it showcases product utility through numerous campus life scenes, such as interactions between teachers, students, and assistants in a classroom, administrative staff processing tasks in bulk, or prospective applicants initiating Q&A on an admissions page. In this way, visitors can immediately grasp which environments these functions serve and instinctively perceive the platform’s value.`,
        ],
      },
      {
        heading: 'From the Perspective of University Administrators',
        paragraphs: [
          `While the direct users of HiTA are students and faculty, the decision to adopt the platform usually lies with university administrators. Management’s core concern is not just learning convenience, but rather how to lower costs, reduce manpower requirements, and improve efficiency.`,
          `Therefore, I helped the team reposition the official website’s narrative to focus on the administrator’s mindset. The focus of the platform’s presentation shifted from “what it can do” to “how it helps the school improve operations.” Through specific case studies, the pages demonstrate how AI optimizes the allocation of teaching resources, enhances communication efficiency, and reduces repetitive administrative work. This shift in language brings HiTA closer to the priorities of school decision-makers and makes the platform more persuasive in commercial communications.`,
        ],
      },
      {
        paragraphs: [
          `After seven months of collaboration, both the HiTA product and its official website have seen a significant improvement in comprehensibility. The new information architecture makes user paths clearer, unifies multi-role logic, and makes the management of the assistant system more efficient. Updates at the visual and narrative levels have made the product more attractive and persuasive during external presentations.`,
          `What I find most important and long-lasting is that the entire team has developed a unified language and shared understanding. From internal communication to external event introductions, they can now articulate HiTA’s value using clear terms such as “teaching, administration, office work, and recruitment.”`,
        ],
      },
    ],
  },
  cooragent: {
    hero: cooragentLanding,
    overview: `Cooragent, an innovative AI agent platform originating from the LEAP Lab at Tsinghua University (which focuses on machine learning, multimodal learning, and embodied intelligence), centers its core functionality on allowing users to freely create, edit, and schedule single or multiple agents to achieve diverse task objectives.\n\nCoincidentally, when the founder reached out to me, I happened to be in Beijing as well, so we had an initial conversation in a tech incubator building near Tsinghua’s campus.\n\nAlthough they already had a basic functional interface, users were generally confused upon opening the app: How was it different from other AI tools on the market? What tasks could it perform? How do you create and edit agents? Despite the team’s strong technical background, they struggled to bridge the gap between their complex, powerful capabilities and a user interface that was easy to understand and use.\n\nNonetheless, they had already validated their capabilities among a small group of users, accumulated followers on GitHub, and maintained their own group of test users, proving that their functionality is indeed effective.`,
    sections: [
      {
        heading: 'Decoupling Marketing and Functionality',
        paragraphs: [
          `The main challenge lay in the Cooragent’s information architecture.`,
          `When users first entered the product, they saw multiple agents with avatars and an empty chat input box. New users had to interpret the unfamiliar layout cues on their own, leading to a high entry barrier.`,
          `In addition, functional pages were mixed together with marketing content from the website. On a single interface, users saw both links to the company blog and entry points to core features like the “Agent Marketplace.” This structure deviated from standard SaaS conventions, obstructing users’ understanding of the product’s capabilities and resulting in poor scalability, as future iterations could easily have triggered overarching logic conflicts.`,
          `To address this, I fully separated marketing pages from functional ones. This separation provides enough room for future updates: marketing pages can continuously expand in content, while functional pages establish a solid foundation for restructuring the information architecture and extending future features. For users, entering the app now reveals a more standardized and intuitive spatial structure. Through layout, architecture, and main navigation labels, users can more easily get the application’s purpose and how to use it.`,
        ],
      },
      {
        heading: 'Reflecting on Humanizing AI Agents',
        comparison: {
          before: cooragentTaskCollaborationBefore,
          after: cooragentMessages,
          beforeAlt: 'Cooragent task collaboration interface before redesign',
          afterAlt: 'Cooragent task experience after redesign',
          layout: 'landscape',
        },
        paragraphs: [
          `Beyond structural issues, emotional design remains a subject of debate. For instance, is it necessary to design a unique avatar for every agent? When agents collaborate, should we emphasize the sense of “ritual” that comes with a multi-person team completing a task?`,
          `After discussion and exploration, we decided to abandon character avatars and downplay the concept of “multi-agent collaboration“. We realized splitting AI capabilities and assigning them individual identities is often a subjective presupposition based on human experience. Users’ intention is simply to “get things done.” Even in the real world, it isn’t always necessary to clearly divide responsibilities or form a multi-role team to handle a task. It’s actually a traditional way of thinking in human society. While some applications adopt this emotional design by using animation to create a sense of multiple assistants working together on writing, the effect looks fun and visually attractive but requires significant costs while providing limited improvement to the actual user experience.`,
          `If we take a different approach and step back to use simple symbols or just names for presentation, it is actually entirely feasible. Most of the time, users do not care whether you used multiple computers, multiple programs, or just a single one. For them, the most important thing is always the result and quality of the completed task.`,
        ],
      },
      {
        heading: 'Balancing Experience for Casual and Advanced Users',
        image: cooragentAgentMarket,
        paragraphs: [
          `Another issue is that our audience includes both developers and general users. The design must cater to the needs of different groups, which is the core challenge of this project.`,
          `In the previous version, general users were greeted by several Agents upon entering, yet they still struggled to understand the exact definition of an “Agent.” They often felt confused: “There are several characters here, how do I operate them? Am I supposed to assign them tasks?” This does not align with the general public’s intuitive way of using AI. If a user wants to create an analytical report, the most natural interaction is to enter a chat interface, input their objective, and receive the result directly. They expect a seamless “instruction-to-result” experience rather than having to study what an Agent is first. For these users, overemphasizing Agents actually increases the cognitive load.`,
          `However, professional users crave high levels of customization to fit their own habits and specific needs. They strongly need to create or modify Agents within the application market. If the homepage only displays a few fixed Agents initially, they might not perceive the vast possibilities of the product’s capabilities. Because the interface functions were not clearly directed, even if the relevant features were implemented, users found it difficult to discover how to generate or edit Agents themselves without clear guidance. Consequently, for advanced users, the old version also failed to intuitively demonstrate its operability.`,
          `Ultimately, general users were distracted by irrelevant information and confused about “what an Agent does,” while advanced users could not discover deep, high-level features due to an oversimplified interface.`,
          `Therefore, in the overall design, we made more rational trade-offs to give the new design stronger extensibility. For novice users, advanced functions are presented as non-primary visual elements (such as low-profile entry points or secondary menus) so as not to interfere with their understanding of the core workflow. For advanced users, while the homepage remains simple, they can quickly locate advanced functions and management interfaces through clear entry points and main menu labels (such as “My Agents,” “Plugin Market,” or “Create Agent”).`,
          `Of course, we did not completely isolate the paths of novice and advanced users; instead, we maintained a high level of flexibility, supporting individuals as they switch between basic and advanced behaviors. When a novice user executes a task, we also display which Agent is providing support in a subtle way. If the user wishes to try advanced features at that moment, such as managing, editing, or selecting an Agent, they can switch at any time. To support this new information architecture and ensure all logic is rational and smooth, I also designed a full suite of supporting features, including Agent duplication and previewing, as well as manual parameter configuration for Agents.`,
        ],
      },
      {
        heading: 'The Delicate Balance of Information Disclosure Density',
        paragraphs: [
          `Another key challenge lies in balancing the level of detail during task execution. We want the process to be detailed enough so users aren’t left staring at a result after a long wait, yet not so granular that it leads to information overload. If a user needs to trace the details of a specific step, they should still be able to do so. Task planning also needs to grant users a degree of control and fine-tuning space without requiring them to audit every single link; there are many subtle points of equilibrium to consider here.`,
          `Regarding the overall visual and brand identity, much of their previous UI was AI-generated, and despite efforts to avoid an “AI look,” they were unsuccessful. The overall aesthetic felt unrefined and immature, dominated by a heavy blue, purple, and black color scheme. Additionally, their marketing website focused heavily on multi-agent collaboration and was riddled with technical jargon, making it difficult for average users to understand what the product actually meant for achieving their goals. As a result, the powerful capabilities of Cooragent were not fully showcased.`,
          `In terms of the visual experience, I created a new, exclusive brand identity for them, completely moving away from the unrefined “AI look” of the original blue, purple, and black palette. Instead, I adopted a more sophisticated, seamless, and reusable visual system. The overall style is clean, modern, professional, and reliable, aligning perfectly with the characteristics of a SaaS product.`,
          `Simultaneously, I provided a comprehensive design solution for the marketing page, redefining how Cooragent’s core differentiators are expressed. This was supported by more accessible copywriting, ensuring that all types of visitors can quickly grasp the product’s value.`,
        ],
      },
      {
        paragraphs: [
          `Reflecting on the most valuable part of this design process, it was helping the team clarify and unify many long-standing, difficult decisions. We made many well-considered choices that gave the team a clear understanding of the user’s perspective and how the product looks and feels to them.`,
          `Even more gratifying is that Cooragent subsequently succeeded in attracting several enterprise-level clients, proving the effectiveness and appeal of the design strategy.`,
        ],
      },
    ],
  },
};
