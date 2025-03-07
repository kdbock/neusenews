import axios from "axios";
import { XMLParser } from "fast-xml-parser";

interface RssFeedItem {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  id: string;
}

export default class RssService {
  static async fetchFeed(url: string): Promise<RssFeedItem[]> {
    try {
      if (!url || !/^https?:\/\//.test(url)) {
        console.error("Invalid RSS URL:", url);
        return [];
      }

      const response = await axios.get(url);
      if (response.status !== 200) {
        console.error("Failed to load RSS:", response.status);
        return [];
      }

      const parser = new XMLParser({ ignoreAttributes: false });
      const parsedData = parser.parse(response.data);

      const items = parsedData?.rss?.channel?.item || [];
      if (!Array.isArray(items)) {
        return [];
      }

      return items.map((item: any) => {
        let imageUrl = item["media:content"]?.["@_url"] || item["media:thumbnail"]?.["@_url"];
        if (!imageUrl || !/^https?:\/\//.test(imageUrl)) {
          imageUrl = "https://www.neusenews.com/default-placeholder.png";
        }

        return {
          title: item.title || "No Title",
          link: item.link || "",
          description: item.description || "",
          imageUrl: imageUrl,
          id: crypto.randomUUID(),
        };
      });
    } catch (error) {
      console.error("❌ RSS Fetch Error:", error);
      return [];
    }
  }
}
