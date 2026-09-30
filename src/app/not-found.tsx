import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
