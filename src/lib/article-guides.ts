import { articles, type Article } from "../generated/articles";

export type GuideContext =
  | "home"
  | "parents"
  | "grade-2"
  | "grade-3"
  | "grade-4"
  | "grade-5"
  | "grade-6";

const GRADE_FROM_CONTEXT: Partial<Record<GuideContext, number>> = {
  "grade-2": 2,
  "grade-3": 3,
  "grade-4": 4,
  "grade-5": 5,
  "grade-6": 6,
};

function articleUpdated(a: Article): string {
  return a.date;
}

function matchesContext(article: Article, context: GuideContext): boolean {
  if (context === "home") {
    return Boolean(article.bundle) && !article.tags?.includes("parent-guide");
  }

  if (context === "parents") {
    return (
      article.tags?.includes("parent-guide") === true ||
      article.slug.includes("goneis") ||
      article.slug.startsWith("10-tropoi")
    );
  }

  const grade = GRADE_FROM_CONTEXT[context];
  if (grade != null) {
    return article.bundle?.grade === grade;
  }

  return true;
}

/** Up to `limit` guides for a landing section (default 5), newest first. */
export function getGuidesForContext(context: GuideContext, limit = 5): Article[] {
  return [...articles]
    .filter((a) => matchesContext(a, context))
    .sort((a, b) => (articleUpdated(a) < articleUpdated(b) ? 1 : -1))
    .slice(0, limit);
}