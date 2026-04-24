import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { ExperiencePageContent } from "@/components/pages/ExperiencePageContent";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { HowIBuildSystemsPageContent } from "@/components/pages/HowIBuildSystemsPageContent";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";

export const routes = {
  "/": HomePageContent,
  "/about": AboutPageContent,
  "/contact": ContactPageContent,
  "/experience": ExperiencePageContent,
  "/how-i-build-systems": HowIBuildSystemsPageContent,
  "/services": ServicesPageContent,
};
