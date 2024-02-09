export type Env = {
  BUCKET: R2Bucket;
  WEBHOOK_URL: string;
  R2_URL: string;
};

type Embed = {
  title: string;
  type: "rich" | "image";
  description?: string;
  color?: number;
  image?: {
    url: string;
  };
};

export type DiscordMessage = {
  content: string;
  embeds?: Embed[];
};

export type OnDiscordNotificationProps = {
  env: Env;
  error?: unknown;
  url?: string;
};
