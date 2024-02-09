import {
  DiscordNotificationError,
  ImageNotFound,
  R2Error,
  ScrapingError,
} from "@/errors";
import { DiscordMessage, OnDiscordNotificationProps } from "@/types";
import { getTodayDate } from "@/utils";

function successMessage(url: string): DiscordMessage {
  const date = getTodayDate("YYYY年MM月DD日");

  return {
    content: `New School Lunch Image on ${date}`,
    embeds: [
      {
        title: `${date}の献立`,
        type: "image",
        image: {
          url,
        },
      },
    ],
  };
}

function errorMessage(error: unknown): DiscordMessage {
  const date = getTodayDate("YYYY年MM月DD日");

  const content = `Error on ${date}`;

  let description = "予期せぬエラーが発生しました。";

  if (error instanceof ScrapingError) {
    description = "画像を取得できませんでした。";
  } else if (error instanceof R2Error) {
    description = "R2に画像をアップロードできませんでした。";
  } else if (error instanceof ImageNotFound) {
    description = "画像が見つかりませんでした。";
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    content,
    embeds: [
      {
        title: `${date}の献立を取得できませんでした。`,
        type: "rich",
        description,
        color: 14427686,
      },
    ],
  };
}

function createMessage({
  url,
  error,
}: Omit<OnDiscordNotificationProps, "env">): DiscordMessage {
  if (url) {
    return successMessage(url);
  }

  return errorMessage(error);
}

export const onDiscordNotification = async ({
  env,
  error,
  url,
}: OnDiscordNotificationProps) => {
  const { WEBHOOK_URL } = env;

  if (error instanceof DiscordNotificationError) return;

  const message = createMessage({ url, error });

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!res.ok) throw new DiscordNotificationError();
};
