'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollVideoHeroProps {
  src: string;
  /** Scroll distance (px) to traverse entire video. Default: 4 × viewport height */
  scrollHeight?: number;
}

export function ScrollVideoHero({ src, scrollHeight }: ScrollVideoHeroProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const runwayRef  = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cueRef     = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const exitedRef  = useRef(false);

  const [exited, setExited] = useState(false);

  useEffect(() => {
    const video   = videoRef.current;
    const runway  = runwayRef.current;
    const panel   = panelRef.current;
    const overlay = overlayRef.current;
    const cue     = cueRef.current;
    if (!video || !runway || !panel) return;

    // Reset state for when src changes
    exitedRef.current = false;

    // ── 1. Always scroll to top on mount so progress starts at 0 ────────
    //       This fixes the "disappears on reload" bug where the browser
    //       restores the previous scroll position and progress instantly hits 98%
    window.scrollTo({ top: 0, behavior: 'instant' });

    // ── 2. Signal navbar to hide behind video ────────────────────────────
    document.documentElement.setAttribute('data-video-active', 'true');

    // ── 3. Set scroll runway height ──────────────────────────────────────
    const runwayH = scrollHeight ?? window.innerHeight * 4;
    runway.style.height = `${runwayH}px`;

    // ── 4. Scroll handler ─────────────────────────────────────────────────
    const onScroll = () => {
      if (exitedRef.current) return;

      const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      const scrolled  = Math.max(0, window.scrollY - runwayTop);
      const progress  = Math.min(1, scrolled / runwayH);

      // Drive video time
      if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
        const target = progress * video.duration;
        if (typeof (video as any).fastSeek === 'function') {
          (video as any).fastSeek(target);
        } else {
          video.currentTime = target;
        }
      }

      // Overlay text opacity: fade in → hold → fade out
      if (overlay) {
        let alpha = 0;
        if      (progress < 0.08)  alpha = progress / 0.08;
        else if (progress < 0.72)  alpha = 1;
        else if (progress < 0.92)  alpha = 1 - (progress - 0.72) / 0.20;
        overlay.style.opacity = String(alpha);
      }

      // Scroll cue fades away as soon as scrolling starts
      if (cue) {
        cue.style.opacity = progress < 0.04 ? String(1 - progress / 0.04) : '0';
      }

      // Trigger exit animation
      if (progress >= 0.98 && !exitedRef.current) {
        exitedRef.current = true;
        document.documentElement.removeAttribute('data-video-active');
        panel.style.transition =
          'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.9s ease';
        panel.style.transform = 'translateY(-100%)';
        panel.style.opacity   = '0';
        setTimeout(() => setExited(true), 1150);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };

    // ── 5. Wait for metadata (so duration is known) then start ───────────
    const startListening = () => {
      video.currentTime = 0;
      window.addEventListener('scroll', handleScroll, { passive: true });
      onScroll(); // paint initial frame
    };

    if (video.readyState >= 1) {
      startListening();
    } else {
      video.addEventListener('loadedmetadata', startListening, { once: true });
      video.load();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', startListening);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.removeAttribute('data-video-active');
    };
  }, [scrollHeight, src]); // re-runs when src changes to load new video

  if (exited) return null;

  return (
    <div ref={runwayRef} className="relative w-full" style={{ minHeight: '100vh' }}>

      {/* ── Fixed fullscreen panel ── */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,           // covers navbar (z-50)
          willChange: 'transform, opacity',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        {/* Video — muted, no controls, scrubbed by JS */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />

        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.58) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Overlay text ── */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: 0, pointerEvents: 'none',
            textAlign: 'center', padding: '0 1.5rem',
          }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.13)', borderRadius: '999px',
            padding: '0.45rem 1.25rem', fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#B8D96B', marginBottom: '1.75rem',
          }}>
            <span style={{ fontSize: '0.5rem' }}>⬤</span>
            Growing Live · Bengaluru
          </span>

          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            lineHeight: 1.02, color: '#ffffff',
            marginBottom: '1.25rem', letterSpacing: '-0.01em',
          }}>
            From seed{' '}
            <em style={{ color: '#B8D96B', fontStyle: 'normal' }}>to harvest</em>
            <br />in seconds.
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.60)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            maxWidth: '34rem', lineHeight: 1.75,
          }}>
            Watch our hand-raised microgreens emerge — from dark dormancy to
            vibrant, nutrient-dense life.
          </p>
        </div>

        {/* ── Scroll cue ── */}
        <div
          ref={cueRef}
          style={{
            position: 'absolute', bottom: '2.25rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            animation: 'svh-cue 2.2s ease-in-out infinite',
            transition: 'opacity 0.5s ease',
          }}
        >
          <span>Scroll</span>
          <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
            <rect x="0.75" y="0.75" width="14.5" height="24.5" rx="7.25"
              stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <rect x="6.5" y="4" width="3" height="6" rx="1.5"
              fill="rgba(255,255,255,0.55)" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes svh-cue {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
          50%       { opacity: 1;   transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </div>
  );
}
