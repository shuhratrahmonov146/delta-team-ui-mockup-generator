export interface TechStackItem {
  title: string;
  subtitle: string;
  icon: string;
}

export const techStackData: TechStackItem[] = [
  { title: "Azure", subtitle: "Cloud Solutions", icon: "azure.png" },
  {
    title: "Kubernetes",
    subtitle: "Container Orchestration",
    icon: "kubernetes.png",
  },
  { title: "Docker", subtitle: "Containerization", icon: "docker.png" },
  { title: "GCP", subtitle: "Cloud Solutions", icon: "google-cloud.svg" },
  { title: "Blazor", subtitle: "Interactive Web Apps", icon: "blazor.png" },
  { title: "React", subtitle: "Frontend Framework", icon: "react.png" },
  { title: "Node.Js", subtitle: "Runtime Environment", icon: "node.png" },
  { title: ".NET", subtitle: "Cross-Platform Apps", icon: "net.png" },
  { title: "Flutter", subtitle: "Mobile Development", icon: "flutter.png" },
  { title: "C#", subtitle: "Backend Development", icon: "cs.png" },
  {
    title: "Python Django",
    subtitle: "Backend Development",
    icon: "python.jpg",
  },
  { title: "Next.js", subtitle: "React framework", icon: "nextjs.webp" },
];
