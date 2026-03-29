import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-brand-blue-light/50 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">{title}</h1>
        {description && (
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
