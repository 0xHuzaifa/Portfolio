import { describe, it, expect } from "vitest";
import { PROJECTS, filterProjects } from "../components/Projects";

describe("filterProjects", () => {
  it("returns all projects when category is All", () => {
    const result = filterProjects(PROJECTS, "All");
    expect(result.length).toBe(PROJECTS.length);
  });

  it("returns only frontend projects when category is Frontend", () => {
    const result = filterProjects(PROJECTS, "Frontend");
    expect(result.every((p) => p.category === "Frontend")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns only backend projects when category is Backend", () => {
    const result = filterProjects(PROJECTS, "Backend");
    expect(result.every((p) => p.category === "Backend")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns other category projects after selecting another category", () => {
    const result = filterProjects(PROJECTS, "Full-Stack");
    expect(result.every((p) => p.category === "Full-Stack")).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const newResult = filterProjects(PROJECTS, "Frontend");
    expect(newResult.every((p) => p.category === "Frontend")).toBe(true);
    expect(newResult.length).toBeGreaterThan(0);
  });

  it("returns empty array for unknown category", () => {
    const result = filterProjects(PROJECTS, "Mobile" as any);
    expect(Array.isArray(result)).toBe(true);
    // No projects with category 'Mobile' in the sample dataset
    expect(result.length).toBe(0);
  });
});
