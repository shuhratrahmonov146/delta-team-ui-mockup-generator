import React from "react";
import ConfidenceIcon from "@/components/icons/how_work_icons/ConfidenceIcon";
import FeedbackIcon from "@/components/icons/how_work_icons/FeedbackIcon";
import DeployementIcon from "@/components/icons/how_work_icons/DeployementIcon";
import ScopeIcon from "@/components/icons/how_work_icons/ScopeIcon";
import SupportIcon from "@/components/icons/how_work_icons/SupportIcon";

export type ProcessStep = {
  title: string;
  icon: React.ComponentType<{ className?: string }> | string;
  text: string;
};

export const aboutProcessSteps: ProcessStep[] = [
  {
    title: "Scope for success",
    icon: ScopeIcon,
    text: "Our Solutions Engineers work with you to understand your business goals and needs, crafting user stories and requirements that get to the heart of the problem.",
  },
  {
    title: "Confident liftoff",
    icon: ConfidenceIcon,
    text: "Our pre-flight checklists help us set up a tailored way of working that slots right in to your normal routines. Our engineers are happy to plug into your systems, or bring our own and have you join",
  },
  {
    title: "Regular customer feedback",
    icon: FeedbackIcon,
    text: "Quality end-user feedback is central to the way we build at SRP. Our ethos is to deploy early, do lots of screen sharing, and get lots of different points of review early on in the process to make sure that our software is tuned in to real customer needs.",
  },
  {
    title: "Bullet-proof deployments",
    icon: DeployementIcon,
    text: "Getting bug-free software into the hands of end users can be hard, (especially when there’s hardware and electronics involved!). Our battle-tested processes and QA engineers help ensure that we minimise the number of release iterations needed, and we offer a 7 day bug-free guarantee where we fix for free any issues found in release.",
  },
  {
    title: "Long term support",
    icon: SupportIcon,
    text: "Your software, your rules. We’re here to ensure that it works for the long term. Pick pay-as-you use or custom-priced maintenance schedules with us. Talk to us about the package that you need to ensure that changes and issues get the prompt responses you need, long term.",
  },
];
