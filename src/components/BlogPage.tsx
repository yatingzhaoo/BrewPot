import { ArrowRight } from 'lucide-react';
import { track } from '../analytics';
import yatingAvatar from '../asset/designer/yating-zhao-avatar.jpg';
import { blogPosts } from './BlogContent';

type BlogPageProps = {
  postSlug?: string | null;
};

function renderParagraphWithEmphasis(paragraph: string, emphasis: string[]) {
  const matches = emphasis
    .map((sentence) => ({ sentence, index: paragraph.indexOf(sentence) }))
    .filter((match) => match.index !== -1)
    .sort((a, b) => a.index - b.index);

  if (matches.length === 0) {
    return paragraph;
  }

  const parts = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.index > cursor) {
      parts.push(paragraph.slice(cursor, match.index));
    }

    parts.push(
      <strong key={`${match.index}-${match.sentence}`} className="font-semibold">
        {match.sentence}
      </strong>,
    );
    cursor = match.index + match.sentence.length;
  }

  if (cursor < paragraph.length) {
    parts.push(paragraph.slice(cursor));
  }

  return parts;
}

export default function BlogPage({ postSlug }: BlogPageProps) {
  const activePost = blogPosts.find((post) => post.slug === postSlug);

  if (activePost) {
    return (
      <>
        <article className="max-w-[780px] mx-auto px-6 sm:px-8 pt-28 pb-8">
          <header className="mb-14 text-center">
            <h1 className="font-heading font-medium text-[52px] sm:text-[64px] md:text-[72px] text-[#202020] tracking-tight leading-[1.12] mb-6">
              {activePost.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px] text-neutral-500 font-sans">
              <span className="inline-flex items-center gap-2">
                <img
                  src={yatingAvatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span>{activePost.author}</span>
              </span>
              <span aria-hidden="true" className="text-neutral-300">|</span>
              <span>{activePost.date}</span>
            </div>
          </header>

          <div className="space-y-5 text-[18px] leading-[31px] text-[#202020]">
            {[
              ...activePost.intro,
              ...activePost.sections.flatMap((section) => section.paragraphs),
            ].map((paragraph) => (
              <p key={paragraph}>{renderParagraphWithEmphasis(paragraph, activePost.emphasis)}</p>
            ))}
          </div>

        </article>

      </>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-28">
      <div className="mx-auto flex max-w-[780px] flex-col px-6 sm:px-8">
        {blogPosts.map((post) => (
          <a
            key={post.slug}
            href={`/?view=blog&post=${post.slug}`}
            onClick={() =>
              track('blog_article_clicked', {
                source: 'blog_index',
                article: post.slug,
                article_title: post.title,
              })
            }
            className="group -mx-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-4 py-5 focus-visible:outline-none md:grid-cols-[minmax(0,1fr)_auto_20px] md:gap-x-5"
          >
            <h2 className="col-span-2 font-heading text-[20px] font-medium leading-[1.3] tracking-tight text-[#202020] md:col-span-1 md:max-w-[460px] md:text-[22px]">
              {post.title}
            </h2>
            <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[16px] font-normal text-neutral-500 md:justify-end md:text-right">
              <span>{post.date}</span>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 justify-self-end text-[#202020] opacity-60 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 md:opacity-0 md:group-focus-visible:opacity-100"
              strokeWidth={2}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
