import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const highlightSlides = [
  {
    id: 'VD_int',
    video: '/assets/video/VD_int.mp4',
    text: ['Interior first', 'Crafted like a cockpit'],
  },
  {
    id: 'VD_ext',
    video: '/assets/video/VD_ext.mp4',
    text: ['Exterior drama', 'Sculpted airflow'],
  },
  {
    id: 'VD_eng',
    video: '/assets/video/VD_eng.mp4',
    text: ['Mechanical soul', 'V12 at center stage'],
  },
  {
    id: 'VD_full',
    video: '/assets/video/VD_full.mp4',
    text: ['The full vision', 'Pagani Utopia'],
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const indicatorFillRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [videoState, setVideoState] = useState({
    hasStarted: false,
    isPlaying: false,
    videoId: 0,
    isLastVideo: false,
  });
  const [loadedCount, setLoadedCount] = useState(0);
  const { hasStarted, isPlaying, videoId, isLastVideo } = videoState;

  useGSAP(
    () => {
      if (!carouselRef.current) return;
      gsap.to(carouselRef.current, {
        xPercent: -100 * videoId,
        duration: 1.1,
        ease: 'power2.inOut',
      });
    },
    { scope: sectionRef, dependencies: [videoId], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          setVideoState((prev) => ({
            ...prev,
            hasStarted: true,
            isPlaying: true,
          }));
        },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (!hasStarted || loadedCount < highlightSlides.length) return;
    const activeVideo = videoRef.current[videoId];
    if (!activeVideo) return;

    if (isPlaying) {
      void activeVideo.play();
    } else {
      activeVideo.pause();
    }
  }, [hasStarted, isPlaying, loadedCount, videoId]);

  useEffect(() => {
    let tickerFn: (() => void) | null = null;
    const activeVideo = videoRef.current[videoId];
    const activeFill = indicatorFillRef.current[videoId];
    if (!activeVideo || !activeFill || loadedCount < highlightSlides.length) return;

    if (!isPlaying) return;

    tickerFn = () => {
      if (!activeVideo.duration) return;
      const progress = Math.max(
        0,
        Math.min(100, (activeVideo.currentTime / activeVideo.duration) * 100)
      );
      gsap.set(activeFill, { width: `${progress}%` });
    };

    gsap.ticker.add(tickerFn);

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
    };
  }, [videoId, isPlaying, loadedCount]);

  const goToVideo = (index: number) => {
    videoRef.current.forEach((video, i) => {
      if (!video) return;
      if (i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    indicatorFillRef.current.forEach((fill, i) => {
      if (!fill) return;
      gsap.set(fill, { width: i < index ? '100%' : '0%' });
    });

    setVideoState((prev) => ({
      ...prev,
      videoId: index,
      isLastVideo: index === highlightSlides.length - 1,
      isPlaying: true,
      hasStarted: true,
    }));
  };

  const handleVideoEnded = (index: number) => {
    if (index < highlightSlides.length - 1) {
      goToVideo(index + 1);
      return;
    }
    setVideoState((prev) => ({ ...prev, isLastVideo: true, isPlaying: false }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-void pt-[3vh] pb-[6vh]"
    >
      <div className="relative z-10 mx-auto w-full max-w-none px-[2vw]">
        <div className="overflow-hidden">
          <div ref={carouselRef} className="flex w-full will-change-transform">
            {highlightSlides.map((slide, index) => (
              <article key={slide.id} className="w-full shrink-0 pr-4 md:pr-8">
                <div className="relative h-[62vh] min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-black">
                  <video
                    ref={(el) => {
                      videoRef.current[index] = el;
                    }}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                    onLoadedMetadata={() => {
                      setLoadedCount((prev) => prev + 1);
                    }}
                    onPlay={() =>
                      setVideoState((prev) => ({
                        ...prev,
                        isPlaying: true,
                        isLastVideo: false,
                      }))
                    }
                    onEnded={() => handleVideoEnded(index)}
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />

                  <div className="absolute bottom-7 left-6 z-10 md:left-10">
                    {slide.text.map((line) => (
                      <p
                        key={`${slide.id}-${line}`}
                        className="font-display text-[clamp(22px,2.8vw,40px)] leading-[1.05] text-cream"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-4 backdrop-blur">
            {highlightSlides.map((slide, index) => (
              <button
                key={`indicator-${slide.id}`}
                type="button"
                onClick={() => goToVideo(index)}
                className="relative h-2.5 w-10 overflow-hidden rounded-full bg-white/25 transition-all duration-300"
                aria-label={`Play slide ${index + 1}`}
              >
                <span
                  ref={(el) => {
                    indicatorFillRef.current[index] = el;
                  }}
                  className="absolute inset-y-0 left-0 block w-0 rounded-full bg-white"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (isLastVideo) {
                goToVideo(0);
                return;
              }
              setVideoState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur transition hover:border-gold hover:text-gold"
            aria-label={isLastVideo ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
          >
            {isLastVideo ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            ) : isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
