import type { Metadata } from "next";
import { shareMetadata } from "@/lib/share";
import { SubjectsView } from "@/components/art-views";
import { SUBJECTS } from "@/lib/subjects";

export const metadata: Metadata = shareMetadata("/categories/", "สาขาศิลปะ", "คำจำกัดความ ประเภท เทคนิค และเครื่องมือของแต่ละสาขาศิลปะ");

export default function CategoriesPage() {
  return <SubjectsView subjects={SUBJECTS} />;
}
