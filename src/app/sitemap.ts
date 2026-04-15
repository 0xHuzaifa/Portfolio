import type { MetadataRoute } from "next";
import { systems } from "@/data/systems";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://0xhuzaifa.com";

  // Static pages
  const staticRoutes = ["", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Dynamic system pages
  const systemRoutes = systems.map((system) => ({
    url: `${baseUrl}/systems/${system.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...systemRoutes];
}
