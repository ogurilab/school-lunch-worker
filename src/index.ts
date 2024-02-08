import { OBJECT_METADATA } from "@/constant/handa";
import { handaImageScraping } from "@/handlers/cron/handa/images";
import { Env } from "@/types";
import { getTodayYYYYMMDD } from "@/utils/handa";

const scheduled: ExportedHandlerScheduledHandler<Env> = async (event, env) => {
  switch (event.cron) {
    case "0 4 * * *": {
      try {
        const data = await handaImageScraping();

        if (!data) throw new Error("Image not found");

        const bucket = env.BUCKET;

        const key = `${getTodayYYYYMMDD()}.jpg`;
        await bucket.put(key, data as Blob, OBJECT_METADATA);
      } catch (error) {
        // TODO: Discord notification
        console.error(error);
      }

      break;
    }
    default: {
      // eslint-disable-next-line no-console
      console.error("Unknown cron job");

      break;
    }
  }
};

export default {
  scheduled,
};
