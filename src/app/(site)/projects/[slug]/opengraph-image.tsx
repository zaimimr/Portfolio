import { ImageResponse } from "next/og";
import { val } from "../../../../../val.config";
import projectsVal from "@/content/projects.val";
import { getVisibleProjects, toProjectEntries } from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project by Zaim Imran";

function findProject(slug: string) {
  const projects = val.unstable_getUnpatchedUnencodedVal(projectsVal);
  const visible = getVisibleProjects(
    toProjectEntries(projects).map(rawEntry),
    false,
  );
  return visible.find((entry) => entry.slug === slug);
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  const title = project ? val.raw(project.title) : "Zaim Imran";
  const description = project
    ? val.raw(project.description)
    : "Selected work, projects and experiments.";
  const tech = project
    ? project.tech.map((item) => val.raw(item)).slice(0, 5)
    : [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#1b222a",
        color: "#e9ecef",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 32,
          color: "#8a97a6",
        }}
      >
        <span style={{ color: "#f4de5d" }}>Z.</span>
        <span>zaim.no</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 24 ? 68 : 88,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8a97a6",
            lineHeight: 1.3,
          }}
        >
          {description.length > 140
            ? `${description.slice(0, 140)}…`
            : description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {tech.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#c3ccd6",
                border: "2px solid #3a4552",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#e9ecef" }}>
          Zaim Imran
        </div>
      </div>
    </div>,
    size,
  );
}
