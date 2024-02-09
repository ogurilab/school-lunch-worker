import { OBJECT_METADATA } from "@/constant";
import {
  DiscordNotificationError,
  HandleError,
  ImageNotFound,
  R2Error,
} from "@/errors";
import { onDiscordNotification } from "@/handlers/discord";
import { Env } from "@/types";
import { getImage, getTodayDate } from "@/utils";

async function uploadImage(bucket: R2Bucket, data: Blob) {
  const key = `${getTodayDate("YYYYMMDD")}.jpg`;

  const { key: successKey } = await bucket
    .put(key, data as Blob, OBJECT_METADATA)
    .catch(() => {
      throw new R2Error();
    });

  return successKey;
}

export const imageScraping = async (env: Env) => {
  try {
    const res = await getImage();

    const data = await res.blob();

    if (!data) throw new ImageNotFound();

    const key = await uploadImage(env.BUCKET, data as Blob);

    await onDiscordNotification({
      env,
      url: `${env.R2_URL}/${key}`,
    });
  } catch (error) {
    if (error instanceof DiscordNotificationError) return;

    if (error instanceof HandleError) {
      await onDiscordNotification({
        env,
        error,
      });

      return;
    }

    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }
};
