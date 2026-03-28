export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Glenn Esh",
    role: "Principal Architect",
    company: "Koble Systems",
    image: "/images/testimonials/glenn.jpg",
    quote:
      "SRP has effectively communicated with us to deliver quality software, enabling us to achieve our multiyear project goals",
  },
  {
    id: 2,
    name: "Jan Smits",
    role: "Founder",
    company: "Pestscan",
    image: "/images/testimonials/jan-smits.jpg",
    quote:
      "SRP’s efforts boosted our development and enabled us to faster gain a market share in our field of pest control software.",
  },
  {
    id: 3,
    name: "Jessica Bruce",
    role: "CEO",
    company: "Run3D",
    image: "/images/testimonials/jessica-bruce.jpg",
    quote:
      "SRP built a system in 6 months that we had been told would take a UK based senior engineer 3 years.",
  },
  {
    id: 4,
    name: "Adrian Nolt",
    role: "CTO",
    company: "Rosewood Marketing",
    image: "/images/testimonials/adrian-nolt.jpg",
    quote:
      "I had a lot of ideas about how we could use AI, but the hype made it hard to know where to start. SRP helped cut through the noise and identify the right next.",
  },
];
