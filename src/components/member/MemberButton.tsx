"use client";

import { PillButton } from "@/components/ui/PillButton";
import { memberCta } from "@/content/site";
import { useOpenMemberModal } from "@/components/member/MemberModal";

type Variant = "gold" | "light" | "dark";

export function MemberButton({
  children = memberCta.label,
  variant = "gold",
  className,
}: {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const open = useOpenMemberModal();

  return (
    <PillButton attention variant={variant} className={className} onClick={open}>
      {children}
    </PillButton>
  );
}
