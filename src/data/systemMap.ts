import { systems } from "./systems";

export const systemMap = Object.fromEntries(systems.map((s) => [s.slug, s]));
