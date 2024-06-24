import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ClipboardList, Database, KeyRound, Terminal, Wallet } from "lucide-react";

const features = [
  {
    Icon: Terminal,
    name: "Open source",
    description: "Open source under the MIT license.",
    href: "https://github.com/Hukasx0/todist",
    cta: "See on GitHub",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Database,
    name: "Database",
    description: "Your todos are stored in a database.",
    href: "https://github.com/Hukasx0/todist",
    cta: "See on GitHub",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: ClipboardList,
    name: "Kanban board",
    description: "Organize your tasks in a kanban board.",
    href: "https://github.com/Hukasx0/todist",
    cta: "See on GitHub",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Wallet,
    name: "Free forever",
    description: "",
    href: "https://github.com/Hukasx0/todist",
    cta: "See on GitHub",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: KeyRound,
    name: "Safe",
    description:
      "Your todos are private and only visible to you.",
    href: "https://github.com/Hukasx0/todist",
    cta: "See on GitHub",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export async function Features() {
  return (
    <BentoGrid className="lg:grid-rows-3 xl:w-2/3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
