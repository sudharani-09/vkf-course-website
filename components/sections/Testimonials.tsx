"use client";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";
import CmsImage from "@/components/CmsImage";

function ReviewCard({ src, alt, idx }: { src: string; alt: string; idx: number }) {
  return (
    <div className="relative flex-shrink-0">
      <CmsImage
        src={src}
        alt={alt}
        width={380}
        height={640}
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
        loading="lazy"
        quality={75}
        className="h-auto w-[260px] sm:w-[300px] md:w-[360px] object-contain"
        style={{ display: "block" }}
      />
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: { src: string; alt: string }[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full relative">
      <div className={`flex gap-8 py-2 w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {doubled.map((item, i) => (
          <ReviewCard key={`${item.src}-${i}`} src={item.src} alt={item.alt} idx={i} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { reviewImages } = useCms();
  const items = reviewImages.map((r) => ({ src: r.image_url, alt: r.alt }));
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  return (
    <section id="reviews" className="section-gap overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <FadeUp className="text-center">
          <SectionLabel>Reviews</SectionLabel>
          <SectionHeading className="mt-5">
            What Students<br />
            <em className="font-light italic text-silver">Say</em>
          </SectionHeading>
        </FadeUp>
      </div>

      <div className="space-y-6">
        <MarqueeRow items={row1.length ? row1 : items} direction="left" />
        <MarqueeRow items={row2.length ? row2 : items} direction="right" />
      </div>
    </section>
  );
}
