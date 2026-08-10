import { permanentRedirect } from "next/navigation";

/**
 * `/experience` was dropped from the redesigned navigation and its content now
 * lives as section 03 of `/about`. A permanent redirect rather than a deletion
 * so existing links and any indexed URL keep working and pass their weight on.
 */
export default function ExperiencePage() {
  permanentRedirect("/about");
}
