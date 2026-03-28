import React from "react";
import {
  MainImage,
  PhoneMini,
  DeerLogo,
} from "@/components/icons/case_study_icons";

export interface SVGComponentProps {
  className?: string;
  width?: number;
  height?: number;
  size?: number;
}

export interface ProjectInfo {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  heroImage: string;
  cardImage?: string;
  mainImageComponent?: React.FC<SVGComponentProps>;
  title: string;
  tagTitle: string;
  metaDescription?: string;
  description: string[];
  outcomeTitle: string;
  outcomeDescription: string;
  stats: string[];
  galleryImages: {
    src: string;
    alt: string;
    type: "image" | "logo";
    Component?: React.FC<SVGComponentProps>;
  }[];
  challengesTitle: string;
  challenges: string[];
  category: string;
  projectInfoTitle: string;
  projectInfo: ProjectInfo[];
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "john-deere-agritech-integration",
    category: "System Integration",
    heroImage: "/case/deer/hero.webp",
    title: "Agri-Tech Integration with John Deere",
    tagTitle: "John Deere Agritech Integration",
    metaDescription:
      "Explore how Silk Road Professionals delivered custom agritech software integration for John Deere, optimizing global farming operations.",
    description: [
      "Farm managers previously had to rely on three different platforms just to understand what was happening in their fields. Critical data was scattered across systems, slowing down decision-making and increasing operational complexity.",
      "Modern farm ERPs are only as powerful as the systems they connect to. Our team in Uzbekistan faced the challenge of integrating John Deere’s Operations Center — a large-scale platform used across the USA — with satellite mapping data into a single unified interface.",
      "We delivered a seamless integration that brought two complex systems into one dashboard, eliminating friction and giving farm managers a clear, real-time view of their fields without compromising performance or usability.",
    ],

    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The integration transformed how farm managers interact with their data. Mapping and satellite information became instantly accessible in one place, enabling faster planning, reduced platform switching, and real-time decision-making across all fields.",
    stats: ["1 unified dashboard", "Near-zero latency data loading"],
    galleryImages: [
      {
        src: "/case/deer/vegetables.jpeg",
        alt: "Agricultural Produce and Farming Context",
        type: "image",
      },
      {
        src: "/case/deer/deer_logo.svg",
        Component: DeerLogo,
        alt: "John Deere Operations Center Integration",
        type: "logo",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Integrating John Deere’s Operations Center with external satellite mapping systems while preserving system reliability",
      "Processing massive volumes of geospatial and mapping data with high performance and minimal latency",
      "Ensuring real-time data availability so every field loads instantly and operational decisions remain accurate",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Clients:", value: "Agri-Tech Platform Partner" },
      { label: "Start Date:", value: "—" },
      { label: "End Date :", value: "—" },
      {
        label: "Categories",
        value: "Agri-Tech, System Integration, Data Processing",
      },
      {
        label: "Website:",
        value: "deere.com/en/technology-products/precision-ag-technology/",
      },
    ],
  },
  {
    id: "abc-inventory-management",
    category: "Mobile Development",
    heroImage: "/case/abc-systems/main_image.webp",
    title: "Inventory Management Mobile App with Flutter",
    tagTitle: "ABC Inventory Management",
    metaDescription:
      "See how SRP developed a custom mobile inventory management system, optimizing supply chain logistics and drastically reducing stock errors.",
    description: [
      "ABC Systems, a logistics company, sought a mobile solution to streamline inventory management processes, handle incoming warehouse shipments, and facilitate order fulfillment. Their existing manual processes were prone to errors and inefficiencies that impacted warehouse operations and customer satisfaction.",
      "ABC Software produces a fully integrated business accounting package for small and medium sized businesses. However, their warehouse operations lacked a mobile-first solution that could integrate seamlessly with their existing systems while providing real-time inventory visibility.",
      "Our programmers developed the comprehensive Inventory Management app using Flutter and leveraging GraphQL to connect with the client's existing systems. The cross-platform approach ensured consistent functionality across iOS and Android devices while maintaining a single codebase.",
    ],

    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The Inventory Management app has significantly improved ABC Systems' warehouse operations. Manual errors were reduced dramatically, while efficiency in order fulfillment increased substantially. The app provided enhanced inventory visibility and decreased fulfillment times, leading to notable improvements in inventory accuracy and operational metrics. All of these improvements culminated in increased customer satisfaction.",
    stats: [
      "Reduced manual errors",
      "Decreased fulfillment times",
      "Notable inventory accuracy improvement",
    ],
    galleryImages: [
      {
        src: "/case/abc-systems/mobile_app.webp",
        alt: "ABC Inventory Management Mobile Interface",
        type: "image",
      },
      {
        src: "/case/abc-systems/abc_team.jpeg",
        alt: "Flutter Framework",
        type: "image",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Integrating with ABC Software's existing business accounting package and backend systems while maintaining data consistency and real-time synchronization",
      "Implementing cross-platform functionality with Flutter that worked seamlessly on both iOS and Android devices without compromising performance or user experience",
      "Incorporating Zebra barcode scanner hardware integration for effortless item search, order fulfillment, and shipment processing within a mobile environment",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Clients:", value: "ABC Systems" },
      { label: "Start Date:", value: "January, 2023" },
      { label: "End Date :", value: "December, 2024" },
      {
        label: "Categories",
        value: "Mobile Development, Logistics, Inventory Management",
      },
      { label: "Website:", value: "abcsoftware.us/" },
    ],
  },
  {
    id: "pestscan-management-platform",
    category: "Software Development",
    heroImage: "/case/pestscan/hero.jpg",
    title: "Management Platform for Pest Control Companies",
    tagTitle: "PestScan Management Platform",
    metaDescription:
      "Read how our dedicated software team architected and scaled a global pest control management platform to support 127,000+ active users.",
    description: [
      "PestScan is a complete pest control software solution with over 15 years of industry experience. Designed for business owners, pest managers, quality controllers, and food industry professionals, it combines a mobile app, business software, and a customer portal.",
      "The platform streamlines operations, ensures regulatory compliance, and helps provide clear evidence for audits. It supports over 125,000 users across 40+ countries in 27 languages.",
      "Silk Road Professionals (SRP) collaborated with PestScan to boost their development efforts, enabling them to faster gain market share. The partnership focused on creating a seamless mobile and web experience for a global user base.",
    ],
    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The collaboration with Silk Road Professionals significantly accelerated PestScan's development and market expansion. The platform now serves over 127,000 users in 30+ countries, providing a comprehensive suite of tools including client portals for reports and floorplans, and an office portal for managing employees, suppliers, and inventory.",
    stats: ["127,000+ users", "30+ countries", "27 languages supported"],
    galleryImages: [
      {
        src: "/case/pestscan/image.webp",
        alt: "PestScan Mobile App Interface",
        type: "image",
      },
      {
        src: "/case/pestscan/pestscan.png",
        alt: "PestScan Logo",
        type: "logo",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Developing a multi-platform solution (mobile and web) that maintains high performance for a large global user base",
      "Ensuring regulatory compliance and audit-ready reporting across different international standards",
      "Streamlining complex pest control operations into a user-friendly interface for various stakeholders",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Clients:", value: "PestScan" },
      { label: "Start Date:", value: "Not Specified" },
      { label: "End Date :", value: "Ongoing" },
      { label: "Categories", value: "Pest Control, Business Management" },
      { label: "Website:", value: "https://pestscan.nl/" },
    ],
  },
  {
    id: "cloud-bi-dashboard",
    category: "Business Intelligence",
    heroImage: "/case/integro/image_1.png",
    title: "Cloud-Based Business Intelligence Dashboard",
    tagTitle: "Cloud BI Dashboard",
    metaDescription:
      "Learn how our data engineers built a secure, cloud-based BI dashboard to centralize analytics and drive enterprise operational visibility.",
    description: [
      "The Dashboard is a SaaS cloud application used by Integro and other companies to connect to their relational databases and to create widgets and charts.",
      "By consolidating multiple charts into one locale, it allows the display of information at a glance through a dashboard view. The app enables the creation of multiple dashboards, grouping them by folder and managing access for the organization’s users.",
    ],
    outcomeTitle: "Key Outcomes",
    outcomeDescription:
      "The partnership has resulted in a robust, scalable BI tool that empowers users to visualize complex data sets with ease.",
    stats: [
      "Partnership since 2022",
      "Widget & template libraries",
      "Custom monitoring tools",
    ],
    galleryImages: [
      {
        src: "/case/integro/hero.webp",
        alt: "Dashboard Preview",
        type: "image",
      },
      {
        src: "/case/integro/structure.png",
        alt: "Integro Logo",
        type: "image",
      },
    ],
    challengesTitle: "Key Features & Capabilities",
    challenges: [
      "Seamless connection to multiple relational databases",
      "Dynamic creation of custom widgets and charts",
      "Advanced folder-based dashboard organization",
      "Granular access management for organization users",
      "Decreased setup times via template libraries",
    ],
    projectInfoTitle: "Project Details",
    projectInfo: [
      { label: "Client", value: "Integro212 (USA)" },
      { label: "Industry", value: "Business Intelligence" },
      { label: "Front-End", value: "Angular, Chart.js, Nx, Tailwind CSS" },
      { label: "Back-End", value: "NodeJS (NestJS), MongoDB, SQL Server" },
      { label: "Infrastructure", value: "Azure App Service, Cosmos DB" },
      { label: "Website", value: "integro212.com/" },
    ],
  },
  {
    id: "run3d-physiotherapy-platform",
    category: "Software Development",
    cardImage: "/case/run3d/run3d.jpg",
    heroImage: "/case/run3d/run3d-ga.png",
    title: "Physiotherapy Platform for Athletes",
    tagTitle: "Run3D Physiotherapy Platform",
    metaDescription:
      "Explore the custom healthcare software we developed for Run3D, digitizing operations and replacing manual systems across 38 UK clinics.",
    description: [
      "Run3D is a UK-based company specializing in gait and running analysis. Using 3D motion capture technology developed at the University of Oxford, Run3D helps identify movement issues and provides data-driven recommendations for treatment.",
      "The platform includes a camera-based 3D gait analysis system, a desktop application for clinicians to guide physical exams, and a cloud portal where patients can access reports and recommendations.",
      "Silk Road Professionals (SRP) was tasked with rewriting the system. They successfully built in 6 months what was estimated to take a UK-based senior engineer 3 years, significantly reducing development time and costs.",
    ],
    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The partnership with Silk Road Professionals resulted in a complete system rewrite within 4-6 months, compared to an original estimate of 3 years. The new infrastructure includes a WinUI desktop app, an Angular-based cloud system, and a robust backend on AWS, enabling faster updates and a more scalable service for athletes and clinicians.",
    stats: [
      "6 months development time",
      "3-5x cost reduction",
      "7+ legacy system updates",
    ],
    galleryImages: [
      {
        src: "/case/run3d/hero.jpg",
        alt: "3D Gait Analysis System",
        type: "image",
      },
      {
        src: "/case/run3d/logo.png",
        alt: "Run3D Logo",
        type: "logo",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Rewriting a complex legacy system within a tight timeframe to meet market demands",
      "Integrating 3D motion capture data with a user-friendly clinician interface and cloud-based patient portal",
      "Scaling the infrastructure to handle high-fidelity motion data using AWS ECR and RDS",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Clients:", value: "Run3D" },
      { label: "Start Date:", value: "Not Specified" },
      { label: "End Date :", value: "Ongoing" },
      { label: "Categories", value: "Healthcare, Sports Technology" },
      { label: "Website:", value: "run3d.co.uk/" },
    ],
  },
  {
    id: "paragon-erp-system",
    category: "Software Development",
    heroImage: "/case/paragon_erp/erp_paradigm.png",
    title: "ERP System for Metal Supply Companies",
    tagTitle: "Paragon ERP System",
    metaDescription:
      "Read how our software engineering team architected the Paragon ERP system to streamline enterprise workflows and automate data management.",
    description: [
      "Paragon Computing Solutions, the developer of the Paradigm ERP product family, engaged Silk Road Professionals (SRP) to support the development of several small and mid-sized projects. The core objective was to enhance the Paradigm ERP system to seamlessly manage critical business functions like inventory, manufacturing, delivery, and accounting for metal supply companies.",
      "SRP's Central Asia software development teams were tasked with creating five distinct projects, including a Directory App, the Paradigm Mobile App, an Engine Shop module, a QuickBook Portal, and an Installer. This required a deep understanding of the existing ERP architecture and the specific needs of the metal supply industry.",
      "The technical implementation focused on cross-platform development, utilizing technologies such as Xamarin, MAUI, ASP.NET, and React to ensure broad compatibility. A key deliverable was the integration of a core mobile application with QuickBooks for streamlined financial operations.",
    ],
    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The long-term partnership, which began in 2019, has enabled Paragon to consistently deliver high-quality software that adheres to their specifications and the latest industry standards. The successful delivery of five projects has strengthened the Paradigm ERP platform, providing Paragon's clients with the streamlined operations necessary for efficient business management.",
    stats: [
      "Partnership since 2019",
      "5 Projects Delivered",
      "QuickBooks Integration",
    ],
    galleryImages: [
      {
        src: "/case/paragon_erp/erp_control.jpg",
        alt: "Paradigm Mobile App Screenshot 1",
        type: "image",
      },
      {
        src: "/case/paragon_erp/app_custom.png",
        alt: "Paradigm Mobile App Screenshot 2",
        type: "image",
      },
      {
        src: "/case/paragon_erp/app_tesrt.png",
        alt: "Paradigm Mobile App Screenshot 3",
        type: "image",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Managing the simultaneous development and refinement of five distinct projects within the existing Paradigm ERP ecosystem.",
      "Building robust, cross-platform mobile applications using technologies like Xamarin and MAUI that integrate seamlessly with the core ERP system.",
      "Implementing a secure and reliable QuickBooks integration within the mobile application to facilitate streamlined accounting and financial management.",
      "Ensuring the delivered software meets the high-quality standards and specific operational requirements of the metal supply industry.",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Client:", value: "Paragon Computing Solutions LLC" },
      { label: "Partner Since:", value: "2019" },
      { label: "Team Size:", value: "4 Developers" },
      { label: "Technology Stack:", value: "Xamarin, MAUI, ASP.NET, React" },
      { label: "Website", value: "goparagon.com/paradigm-erp/" },
    ],
  },
  {
    id: "stripe-integration",
    category: "Software Development",
    heroImage: "/case/paragon/main_image.svg",
    mainImageComponent: MainImage,
    title: "Stripe Integration",
    tagTitle: "Stripe Integration",
    metaDescription:
      "See how our engineering team executed a complex Stripe payment integration to fully automate enterprise billing and financial reconciliation.",
    description: [
      "Paragon Computing Solutions was operating with Apple and Google's payment infrastructure, paying 15% transaction fees on every sale. This high fee structure was cutting significantly into their revenue, but the larger issue was the lack of control over their own business operations.",
      "The payment process through app stores created multiple bottlenecks. Every pricing update required app store approval, delaying their ability to respond to market conditions. Customer data remained fragmented and difficult to access. Payment options were limited to what the app stores offered, not what their customers preferred.",
      "We implemented a Stripe-based payment solution that maintained the exact same user experience while eliminating these constraints. The transition was seamless with zero disruption to their existing customers or operations.",
    ],
    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The transition to Stripe transformed Paragon Computing Solutions' payment infrastructure. Transaction fees dropped from 15% to 2.8%, creating immediate savings. They gained complete operational control with instant pricing updates, full customer data access, and flexible payment options.",
    stats: ["87% cost reduction", "2.8% transaction fees"],
    galleryImages: [
      {
        src: "/case/paragon/phone_mini.svg",
        Component: PhoneMini,
        alt: "Mobile Payment Interface",
        type: "image",
      },
      {
        src: "/case/paragon/logo.png",
        alt: "Stripe Logo",
        type: "logo",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Maintaining identical user experience during the payment infrastructure transition to ensure zero customer disruption",
      "Migrating existing customer payment data and subscription information without requiring customers to re-enter payment details",
      "Implementing the new system without downtime or gaps in payment processing capability that could impact revenue",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Clients:", value: "Paragon Computing Solutions" },
      { label: "Start Date:", value: "14 July, 2024" },
      { label: "End Date :", value: "07 September, 2024" },
      { label: "Categories", value: "Finance, Marketing" },
      { label: "Website:", value: "goparagon.com/" },
    ],
  },
  {
    id: "koble-systems-erp",
    category: "Software Development",
    heroImage: "/case/koble/main_1.png",
    title: "ERP Platform for Sales, Inventory, and Finance",
    tagTitle: "Koble Systems ERP",
    metaDescription:
      "Discover how Silk Road Professionals engineered scalable ERP system upgrades to support over 700 manufacturing clients without downtime.",
    description: [
      "Koble Systems, a long-term client since 2014, required the design and development of a new, comprehensive Enterprise Resource Planning (ERP) system, Koble ERP. The primary objective was to centralize and streamline core business processes: sales, inventory tracking, and financial management.",
      "The project involved a multi-faceted approach, with dedicated teams focusing on backend and framework development, business logic implementation, reporting tools, and the creation of a customer-facing desktop application. A separate squad was tasked with managing the complex cloud infrastructure.",
      "The system was engineered to be cloud-first, supporting multiple interfaces (Desktop and Mobile apps) and including key integrations such as a BigCommerce API sync via webhooks and a dedicated Excel Plugin for enhanced data management.",
    ],
    outcomeTitle: "Project Outcome",
    outcomeDescription:
      "The collaboration resulted in the successful launch of Koble ERP, a robust, cloud-first platform that now serves over 5,000 users across more than 700 businesses. The effective communication and quality software delivery enabled Koble Systems to achieve their multi-year project goals, providing a centralized solution for managing finances, inventory, sales, and labor.",
    stats: ["5,000+ users", "700+ businesses", "BigCommerce Integration"],
    galleryImages: [
      {
        src: "/case/koble/erp.png",
        alt: "Koble Systems ERP",
        type: "image",
      },
      {
        src: "/case/koble/koble_interface_1.png",
        alt: "Koble ERP Interface Screenshot 1",
        type: "image",
      },
      {
        src: "/case/koble/koble_interface_2.png",
        alt: "Koble ERP Interface Screenshot 2",
        type: "image",
      },
    ],
    challengesTitle: "The Challenge Of Project",
    challenges: [
      "Designing a centralized, intuitive platform to manage the complexity of sales, inventory, and finance for a large number of businesses.",
      "Developing a cloud-first system on Azure with a robust monitoring stack (Kubernetes, Prometheus, Grafana).",
      "Implementing a multi-interface solution using .NET, ASP.NET, WinUI, and MAUI to support Desktop and Mobile applications.",
      "Ensuring seamless, webhook-based integration with the BigCommerce API for real-time data synchronization.",
    ],
    projectInfoTitle: "Project Information",
    projectInfo: [
      { label: "Client:", value: "Koble Systems" },
      { label: "Partner Since:", value: "2014" },
      { label: "Technology Stack:", value: ".NET, Azure, Kubernetes, MAUI" },
      { label: "Integration:", value: "BigCommerce API, Excel Plugin" },
      { label: "Website:", value: "koblesystems.com/" },
    ],
  },
];
