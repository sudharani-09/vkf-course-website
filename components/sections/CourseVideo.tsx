"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";
import { buildWhatsAppUrlFromCms } from "@/lib/whatsapp";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CourseVideo() {
  const { settings } = useCms();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const whatsappUrl = buildWhatsAppUrlFromCms(
    "Hi, I would like to book a seat for the Wedding Film Course.",
    settings.whatsapp_number
  );

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="student-work" className="section-gap overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp>
          <div className="relative w-full rounded-3xl overflow-hidden bg-charcoal h-[60vh] md:h-[78vh]">
            {!playing ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${settings.course_thumb_url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/30 to-deep-black/20" />

                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Play course detail video"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full glass flex items-center justify-center pulse-ring border border-white/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="translate-x-0.5 md:w-7 md:h-7">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.button>

                <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
              </>
            ) : (
              <video
                ref={videoRef}
                src={settings.course_video_url}
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.15} className="flex justify-center mt-8">
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 font-inter font-semibold text-sm bg-white text-black px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book on WhatsApp
          </motion.a>
        </FadeUp>
      </div>
    </section>
  );
}
