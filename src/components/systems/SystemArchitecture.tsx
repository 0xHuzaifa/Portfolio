interface SystemArchitectureProps {
  techStack: string[];
}

export function SystemArchitecture({ techStack }: SystemArchitectureProps) {
  return (
    <div className="architecture-diagram">
      <h4>Technology Stack</h4>
      <div className="tech-stack">
        {techStack.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
