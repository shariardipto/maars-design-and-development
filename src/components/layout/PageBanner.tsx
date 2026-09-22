import Link from "next/link";
export default function PageBanner({ title,crumb }: {title:string;crumb:string}) {
  return <section className="page-banner"><div className="mddl-container" data-reveal><p className="eyebrow"><Link href="/">Home</Link> / {crumb}</p><h1>{title}</h1><div className="short-rule" /></div></section>;
}
