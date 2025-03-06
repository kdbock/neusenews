import { XMLParser } from "fast-xml-parser";

export type Article = {
  title: string;
  link: string;
  description: string;
  image?: string;
};

export default async function fetchRSSFeed(feedUrl: string): Promise<Article[]> {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);

    const xmlData = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xmlData);

    const items = parsed?.rss?.channel?.item || [];

    return items.map((item: any) => ({
      title: item.title || "No Title",
      link: item.link || "#",
      description: item.description || "No description available",
      image: item["media:content"]?.["@_url"] || item["enclosure"]?.["@_url"] || "",
    }));
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return [];
  }
}
