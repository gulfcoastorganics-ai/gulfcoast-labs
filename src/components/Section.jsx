export default function Section({ eyebrow, title, description, children, className = "" }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className}`.trim()}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2> : null}
          {description ? <p className="mt-4 text-base leading-7 text-slate-300">{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
