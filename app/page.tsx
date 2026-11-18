import { HomeView } from "@/components/art-views";
import { getAllPosts } from "@/lib/mdx";
import { SUBJECTS } from "@/lib/subjects";

export default async function Home() {
  return <HomeView posts={await getAllPosts()} subjects={SUBJECTS} />;
}
