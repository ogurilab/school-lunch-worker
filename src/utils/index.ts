import { load } from "cheerio";

import { BASE_URL, HTML_URL } from "@/constant";
import { ScrapingError } from "@/errors";

export function getTodayDate(format: "ja" | "YYYYMMDD") {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (format === "YYYYMMDD") {
    return `${year}${month}${day}`;
  }

  return `${year}年${month}月${day}日`;
}

function getAlt() {
  const today = getTodayDate("ja");

  return `${today}献立`;
}

async function getImageSrc() {
  const res = await fetch(HTML_URL).then((r) => r.text());
  if (!res) throw new ScrapingError();

  const $ = load(res);

  const alt = getAlt();
  const query = `img[alt="${alt}"]`;

  const imageUrl = $(query).attr("src");

  return imageUrl;
}

export async function getImage() {
  const imageSrc = await getImageSrc();

  if (!imageSrc) throw new ScrapingError();

  const imageUrl = `${BASE_URL}${imageSrc}`;

  const res = await fetch(imageUrl);

  if (!res.ok) throw new ScrapingError();

  return res;
}
