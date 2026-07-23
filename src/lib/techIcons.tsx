import type { JSX } from "react";
import { FaLayerGroup } from "react-icons/fa";
import {
  SiAmazonwebservices,
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGraphql,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

export interface TechIconMeta {
  icon: JSX.Element;
  color: string;
}

const iconMap: Record<string, TechIconMeta> = {
  // Frontend
  React: {
    icon: <SiReact />,
    color: "#61DAFB",
  },
  Redux: {
    icon: <SiRedux />,
    color: "#764ABC",
  },
  "Shadcn UI": {
    icon: <SiShadcnui />,
    color: "#E2E8F0",
  },
  "Next.js": {
    icon: <SiNextdotjs />,
    color: "#E2E8F0",
  },
  TypeScript: {
    icon: <SiTypescript />,
    color: "#3178C6",
  },
  "shadcn/ui": {
    icon: <SiShadcnui />,
    color: "#E2E8F0",
  },
  // Backend
  "Node.js": {
    icon: <SiNodedotjs />,
    color: "#68A063",
  },
  Express: {
    icon: <SiExpress />,
    color: "#A0AEC0",
  },
  GraphQL: {
    icon: <SiGraphql />,
    color: "#E10098",
  },
  "REST API": {
    icon: <TbApi />,
    color: "#68D391",
  },
  "REST APIs": {
    icon: <TbApi />,
    color: "#68D391",
  },
  "Socket.io": {
    icon: <SiSocketdotio />,
    color: "#E2E8F0",
  },
  // Databases
  MongoDB: {
    icon: <SiMongodb />,
    color: "#47A248",
  },
  PostgreSQL: {
    icon: <SiPostgresql />,
    color: "#4169E1",
  },
  Redis: {
    icon: <SiRedis />,
    color: "#DC382D",
  },
  // DevOps / Cloud
  Docker: {
    icon: <SiDocker />,
    color: "#2496ED",
  },
  AWS: {
    icon: <SiAmazonwebservices />,
    color: "#FF9900",
  },
  "AWS S3": {
    icon: <SiAmazonwebservices />,
    color: "#FF9900",
  },
  // Auth / Other
  JWT: {
    icon: <SiJsonwebtokens />,
    color: "#F9C74F",
  },
  Cloudinary: {
    icon: <SiCloudinary />,
    color: "#3448C5",
  },
  BullMQ: {
    icon: <FaLayerGroup />,
    color: "#EF4444",
  },
  "Framer Motion": {
    icon: <SiFramer />,
    color: "#BB6BD9",
  },
};

export function getTechIcon(name: string): TechIconMeta | null {
  // Exact match first
  if (iconMap[name]) return iconMap[name];

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedName = normalize(name);

  // Fuzzy match for composite values like "React (Redux...)"
  const key = Object.keys(iconMap).find((k) =>
    normalizedName.includes(normalize(k)),
  );
  return key ? iconMap[key] : null;
}

interface TechChipProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

export function TechChip({ name, size = "sm", className = "" }: TechChipProps) {
  const meta = getTechIcon(name);
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-3 transition-all duration-150 hover:border-[hsl(var(--primary))]/30 hover:bg-[hsl(var(--primary))]/5 ${isSmall ? "py-1 text-xs" : "py-1.5 text-sm"} text-[hsl(var(--foreground))] ${className}`}
    >
      {meta && (
        <span
          className={`shrink-0 ${isSmall ? "text-[13px]" : "text-[15px]"}`}
          style={{ color: meta.color }}
        >
          {meta.icon}
        </span>
      )}
      {name}
    </span>
  );
}
