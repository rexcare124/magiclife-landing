import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
