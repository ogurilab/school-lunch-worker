/* eslint-disable no-console */
import { imageScraping } from "@/handlers/cron/images";
import { Env } from "@/types";
import { getTodayDate } from "@/utils";

const scheduled: ExportedHandlerScheduledHandler<Env> = async (event, env) => {
  switch (event.cron) {
    case "0 4 * * 1-5": {
      try {
        await imageScraping(env);

        const date = getTodayDate("ja");

        console.log(`${date}のcron jobが実行されました`);
      } catch (error) {
        console.error(error);
      }

      break;
    }
    default: {
      console.error("Unknown cron job");

      break;
    }
  }
};

export default {
  scheduled,
};
