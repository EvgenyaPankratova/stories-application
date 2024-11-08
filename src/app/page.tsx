
import Stories from "@/components/Stories/Stories";
import {myStoriesData} from "@/components/Stories/StoriesData";

export default function Home() {
  return (
    <div className="grid min-h-screen overflow-x-hidden gap-16 py-6 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <Stories {...myStoriesData}/>
      </main>
    </div>
  );
}
