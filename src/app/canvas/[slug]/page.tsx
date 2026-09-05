import Link from "next/link";
import { notFound } from "next/navigation";
import { prompts } from "@/data/prompts";
import PromptDetailMedia from "@/components/PromptDetailMedia";
import CanvasTool from "@/components/CanvasTool";

export function generateStaticParams() {
  return prompts.filter((p) => !p.isPhoto).map((p) => ({ slug: p.slug }));
}

export default async function CanvasDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = prompts.find((p) => p.slug === slug);
  if (!prompt || prompt.isPhoto) notFound();

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <Link href={`/vault/${prompt.slug}`} className="text-xs uppercase tracking-wide text-taupe">
        ← Back to this recreation
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-gold">{prompt.category}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gold">
          Canvas
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl sm:text-4xl">Make your own: {prompt.title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-taupe">
        Upload your own photo, personalise the prompt with your own ChatGPT account, pay once,
        and get your own version of this exact recreation. No subscription — you only pay for
        the video you generate.
      </p>

      <PromptDetailMedia prompt={prompt} />

      <CanvasTool prompt={prompt} />
    </section>
  );
}
