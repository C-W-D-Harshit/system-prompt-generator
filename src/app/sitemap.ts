import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://systemprompt.pro/",
      lastModified: new Date(),
    },
  ];
}
