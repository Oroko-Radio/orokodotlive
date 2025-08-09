import { getUpcomingShows } from "@/lib/payload/pages/home";
import { LivePlayer } from "./ClientComponents";
import { Show as ShowType } from "@/payload-types";

async function LivePlayerServer() {
  let nextUpShow: ShowType | null = null;
  
  try {
    const upcomingShows = await getUpcomingShows();
    nextUpShow = upcomingShows[0] || null;
  } catch (error) {
    console.error("Failed to fetch upcoming shows:", error);
    nextUpShow = null;
  }

  return <LivePlayer nextUpShow={nextUpShow} />;
}

export default LivePlayerServer;