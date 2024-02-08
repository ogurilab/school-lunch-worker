import { getImage } from "@/utils/handa";

export const handaImageScraping = async () => {
  const res = await getImage();

  return res.blob();
};
