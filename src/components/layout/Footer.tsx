import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Email", href: site.links.email ? `mailto:${site.links.email}` : "" },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-fg">{site.name}</p>
          <p className="font-mono text-xs text-fg-muted">
            {site.role}
            {site.location ? ` · ${site.location}` : null}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          {links.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link-underline text-sm text-fg-2 hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <p className="font-mono text-xs text-fg-muted">
            © {year} {site.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
