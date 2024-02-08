type Env = {
  MY_BUCKET: R2Bucket;
};

const scheduled: ExportedHandlerScheduledHandler<Env> = async (event) => {
  switch (event.cron) {
    case "0 4 * * *": {
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
