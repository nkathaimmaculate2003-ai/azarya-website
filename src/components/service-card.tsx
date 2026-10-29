import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-mist bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl font-bold text-navy">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed">{service.summary}</p>
      <Link href={`/services#${service.id}`} className="mt-5 font-semibold">
        Learn more<span className="sr-only"> about {service.title.toLowerCase()}</span>
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
