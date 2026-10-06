import { useMemo, useState } from "react";
import type { ArticleBundle } from "../generated/articles";
import { GRADE_LABELS } from "../lib/grades";
import MiniQuiz from "./MiniQuiz";

type Props = {
  bundle: ArticleBundle;
  articleTitle: string;
};

export default function ResourceBundle({ bundle, articleTitle }: Props) {
  const [showAllWords, setShowAllWords] = useState(false);
  const [wordFilter, setWordFilter] = useState("");

  const visibleWords = useMemo(() => {
    const list = showAllWords ? bundle.words : bundle.words.slice(0, 24);
    if (!wordFilter.trim()) return list;
    const q = wordFilter.trim().toLowerCase();
    return bundle.words.filter((w) => w.word.toLowerCase().includes(q));
  }, [bundle.words, showAllWords, wordFilter]);

  const gradeLabel = GRADE_LABELS[bundle.grade] ?? `${bundle.grade}΄`;

  function printWorksheet() {
    window.print();
  }

  return (
    <div className="resource-bundle">
      <div className="resource-bundle__hero">
        <span className="resource-bundle__badge">{gradeLabel} Δημοτικού</span>
        <span className="resource-bundle__badge resource-bundle__badge--free">
          Δωρεάν υλικό
        </span>
        <p className="resource-bundle__intro">
          {bundle.wordCount} λέξεις · ασκήσεις · quiz · φύλλο εξάσκησης · mini-game
        </p>
      </div>

      <section className="resource-section resource-section--game" aria-labelledby="mini-game-title">
        <h2 id="mini-game-title" className="resource-section__title">
          Δοκίμασε το mini-game
        </h2>
        <p className="resource-section__lead">
          3 γρήγορες ερωτήσεις — ιδανικό για να δει το παιδί αν του αρέσει η εξάσκηση.
        </p>
        <MiniQuiz
          title="Mini-game ορθογραφίας"
          questions={bundle.miniGame.questions}
        />
      </section>

      <section className="resource-section" aria-labelledby="words-title">
        <h2 id="words-title" className="resource-section__title">
          {bundle.topicLabel}
        </h2>
        <p className="resource-section__lead">
          Λίστα με {bundle.wordCount} λέξεις για {gradeLabel} Δημοτικού.
        </p>
        <div className="resource-words__toolbar">
          <input
            type="search"
            className="resource-words__search"
            placeholder="Αναζήτηση λέξης…"
            value={wordFilter}
            onChange={(e) => setWordFilter(e.target.value)}
            aria-label="Αναζήτηση λέξης"
          />
          {!wordFilter && bundle.words.length > 24 && (
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setShowAllWords((v) => !v)}
            >
              {showAllWords ? "Λιγότερες" : `Όλες (${bundle.wordCount})`}
            </button>
          )}
        </div>
        <ol className="resource-words__list">
          {visibleWords.map((w, i) => (
            <li key={w.id} className="resource-words__item">
              <span className="resource-words__num">{i + 1}.</span>
              <strong className="resource-words__word">{w.word}</strong>
              {w.hint && <span className="resource-words__hint">{w.hint}</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="resource-section" aria-labelledby="exercises-title">
        <h2 id="exercises-title" className="resource-section__title">
          Ασκήσεις
        </h2>
        <ol className="resource-exercises">
          {bundle.exercises.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ol>
      </section>

      <section className="resource-section" aria-labelledby="quiz-title">
        <h2 id="quiz-title" className="resource-section__title">
          Quiz ορθογραφίας
        </h2>
        <p className="resource-section__lead">
          Δοκίμασε τις γνώσεις σου — {bundle.quiz.length} ερωτήσεις.
        </p>
        <MiniQuiz title="Quiz" questions={bundle.quiz} />
      </section>

      <section
        className="resource-section resource-section--worksheet"
        aria-labelledby="worksheet-title"
      >
        <h2 id="worksheet-title" className="resource-section__title">
          Φύλλο εξάσκησης (εκτύπωση)
        </h2>
        <p className="resource-section__lead">
          Εκτύπωσε το φύλλο για μελέτη χωρίς οθόνη — ιδανικό για το τραπέζι.
        </p>
        <button type="button" className="btn btn-primary" onClick={printWorksheet}>
          Εκτύπωση φύλλου
        </button>

        <div className="worksheet-print" aria-hidden="true">
          <div className="worksheet-print__header">
            <h1>{bundle.worksheet.title}</h1>
            {bundle.worksheet.subtitle && <p>{bundle.worksheet.subtitle}</p>}
            <p className="worksheet-print__meta">{articleTitle}</p>
          </div>
          <div className="worksheet-print__grid">
            {bundle.words.map((w, i) => (
              <div key={w.id} className="worksheet-print__row">
                <span>{i + 1}.</span>
                <span className="worksheet-print__blank" />
                {w.hint && <span className="worksheet-print__hint">{w.hint}</span>}
              </div>
            ))}
          </div>
          <p className="worksheet-print__footer">Ορθόλεξο — ortholexo.gr</p>
        </div>
      </section>

      <section className="resource-section resource-section--premium" aria-labelledby="premium-title">
        <h2 id="premium-title" className="resource-section__title">
          Συνέχισε στο Ορθόλεξο
        </h2>
        <p className="resource-section__lead">
          {bundle.premium.trialDays} ημέρες δωρεάν — 12 τρόπους εξάσκησης, έξυπνη επανάληψη και
          αναφορά για γονείς.
        </p>
        <a href={bundle.premium.url} className="btn btn-primary btn-lg">
          {bundle.premium.cta}
        </a>
      </section>
    </div>
  );
}
