import type { Metadata } from "next";
import { SubjectsView } from "@/components/art-views";
import { SUBJECTS } from "@/lib/subjects";

export const metadata: Metadata = { title: "สาขาศิลปะ", description: "คำจำกัดความ ประเภท เทคนิค และเครื่องมือของแต่ละสาขาศิลปะ", alternates: { canonical: "/categories/" } };

export default function CategoriesPage() {
  return <SubjectsView subjects={SUBJECTS} />;
}
