import { load } from "cheerio";
import { BASE_URL, HTML_URL } from "@/constant/handa";

export function getTodayYYYYMMDD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${month}${day}`;
}

export function getTodayDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

function getAlt() {
  const today = getTodayDate();

  return `${today}献立`;
}

async function getImageSrc() {
  const res = await fetch(HTML_URL).then((r) => r.text());
  const $ = load(res);

  const alt = getAlt();
  const query = `img[alt="${alt}"]`;

  const imageUrl = $(query).attr("src");

  return imageUrl;
}

export async function getImage() {
  const imageSrc = await getImageSrc();

  if (!imageSrc) throw new Error("Image URL not found");

  const imageUrl = `${BASE_URL}${imageSrc}`;

  const res = await fetch(imageUrl);

  if (!res.ok) throw new Error("Image not found");

  return res;
}
