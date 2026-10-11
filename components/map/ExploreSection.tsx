import { getExploreData } from "@/lib/explore-data";
import { ExploreClient } from "./ExploreClient";

export async function ExploreSection() {
  const data = await getExploreData();

  return (
    <section id="explore" className="relative z-10 min-h-screen bg-night-950 pb-24">
      <ExploreClient data={data} />
    </section>
  );
}
