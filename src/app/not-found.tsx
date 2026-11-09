"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div className="floating-orb w-96 h-96 bg-primary/20 -top-32 -right-32" />
      <div className="floating-orb w-72 h-72 bg-accent/20 bottom-10 -left-24" />

      <div className="absolute inset-x-0 bottom-10 md:bottom-14 max-w-7xl mx-auto px-6 pointer-events-none select-none" aria-hidden="true">
        <p className="font-bold leading-none text-foreground/[0.04] tracking-tight" style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}>
          404
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-40 md:pb-56">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-mono text-muted-foreground">00</span>
          <span className="h-px w-12 bg-border" />
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Page not found
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl">
          Lost track.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
            This page isn&apos;t here.
          </span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
          Nothing lives at{" "}
          <span className="font-mono text-foreground/80">{pathname}</span> — but
          the rest of the site is still standing.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            Drop me a message
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
