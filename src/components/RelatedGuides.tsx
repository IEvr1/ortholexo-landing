import { getGuidesForContext, type GuideContext } from "../lib/article-guides";

const COPY: Record<
  GuideContext,
  { title: string; subtitle: string; viewAll: string }
> = {
  home: {
    title: "Σχετικοί οδηγοί για γονείς",
    subtitle: "Ερωτήσεις–απαντήσεις και δωρεάν υλικό ορθογραφίας για το Δημοτικό.",
    viewAll: "Όλα τα άρθρα",
  },
  parents: {
    title: "Οδηγίες για γονείς",
    subtitle: "Πρακτικές απαντήσεις πριν ξεκινήσετε στο Ορθόλεξο.",
    viewAll: "Όλα τα άρθρα",
  },
  "grade-2": {
    title: "Ορθογραφία Β΄ Δημοτικού",
    subtitle: "Δωρεάν ασκήσεις, λέξεις και quiz για τη τάξη.",
    viewAll: "Όλα τα άρθρα",
  },
  "grade-3": {
    title: "Ορθογραφία Γ΄ Δημοτικού",
    subtitle: "Δωρεάν ασκήσεις, λέξεις και quiz για τη τάξη.",
    viewAll: "Όλα τα άρθρα",
  },
  "grade-4": {
    title: "Ορθογραφία Δ΄ Δημοτικού",
    subtitle: "Δωρεάν ασκήσεις, λέξεις και quiz για τη τάξη.",
    viewAll: "Όλα τα άρθρα",
  },
  "grade-5": {
    title: "Ορθογραφία Ε΄ Δημοτικού",
    subtitle: "Δωρεάν ασκήσεις, λέξεις και quiz για τη τάξη.",
    viewAll: "Όλα τα άρθρα",
  },
  "grade-6": {
    title: "Ορθογραφία Στ΄ Δημοτικού",
    subtitle: "Δωρεάν ασκήσεις, λέξεις και quiz για τη τάξη.",
    viewAll: "Όλα τα άρθρα",
  },
};

type RelatedGuidesProps = {
  context?: GuideContext;
};

export default function RelatedGuides({ context = "home" }: RelatedGuidesProps) {
  const guides = getGuidesForContext(context);
  if (guides.length === 0) return null;

  const copy = COPY[context];

  return (
    <section
      className="section section--alt related-guides"
      aria-labelledby="related-guides-title"
    >
      <div className="container">
        <h2 id="related-guides-title" className="section__title">
          {copy.title}
        </h2>
        <p className="section__lead">{copy.subtitle}</p>

        <ul className="related-guides__list">
          {guides.map((article) => (
            <li key={article.slug}>
              <a href={`/articles/${article.slug}`} className="related-guides__link">
                <span className="related-guides__link-title">{article.title}</span>
                <span className="related-guides__link-text">{article.description}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="related-guides__all">
          <a href="/articles">{copy.viewAll}</a>
        </p>
      </div>
    </section>
  );
}