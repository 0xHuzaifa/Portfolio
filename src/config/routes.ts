import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { ExperiencePageContent } from "@/components/pages/ExperiencePageContent";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { HowIBuildSystemsPageContent } from "@/components/pages/HowIBuildSystemsPageContent";

export const routes = {
  "/": HomePageContent,
  "/contact": ContactPageContent,
  "/experience": ExperiencePageContent,
  "/how-i-build-systems": HowIBuildSystemsPageContent,
};
  