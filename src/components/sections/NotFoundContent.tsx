import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";

export function NotFoundContent() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(214,171,69,0.2),transparent_70%)]"
      />
      <Container className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <p
          aria-hidden
          className="text-gold-gradient font-display text-[9rem] leading-none font-black tracking-tight select-none sm:text-[12rem]"
        >
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">This page has vanished</h1>
        <p className="mt-4 max-w-md text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <PillButton href="/">Back to home</PillButton>
          <PillButton href="/contact" variant="light">
            Contact us
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
