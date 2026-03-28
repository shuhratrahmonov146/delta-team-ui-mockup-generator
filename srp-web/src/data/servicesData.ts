export interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    title: "STAFF AUGMENTATION",
    description:
      "Scale your team exactly when you need it. We embed experienced developers, engineers, and IT specialists directly into your operations. They work as part of your team, follow your processes, and deliver on your timeline. No lengthy hiring cycles, no long-term overhead, just skilled professionals who get the job done.",
    image: "staff-augmentation.svg",
  },
  {
    title: "PROJECT OUTSOURCING",
    description:
      "Hand us your project and focus on running your business. We take full ownership from planning to deployment, whether it's building a new system, modernizing legacy software, or integrating third-party platforms. You get regular updates, clear communication, and a finished product that actually works.",
    image: "project-building.svg",
  },
  {
    title: "AUDIT & CONSULTATION",
    description:
      "Get expert insight into your tech infrastructure and operations. We assess your current systems, identify bottlenecks, and map out practical improvements. You walk away with a clear roadmap, honest recommendations, and a plan you can actually execute, whether with us or on your own.",
    image: "consultation-services.svg",
  },
];
