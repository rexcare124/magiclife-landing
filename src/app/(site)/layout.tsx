import { MemberModalProvider } from "@/components/member/MemberModal";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <MemberModalProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </MemberModalProvider>
  );
}
