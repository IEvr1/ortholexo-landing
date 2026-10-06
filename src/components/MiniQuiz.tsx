import { useState } from "react";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
};

type Props = {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
};

export default function MiniQuiz({ title, subtitle, questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];

  function pick(optionIndex: number) {
    if (selected !== null || done) return;
    setSelected(optionIndex);
    const correct = optionIndex === q.answerIndex;
    const newScore = score + (correct ? 1 : 0);
    setScore(newScore);

    window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        setDone(true);
        onComplete?.(newScore, questions.length);
      } else {
        setIndex(index + 1);
        setSelected(null);
      }
    }, 700);
  }

  if (!q) return null;

  return (
    <div className="mini-quiz">
      <div className="mini-quiz__head">
        <h3 className="mini-quiz__title">{title}</h3>
        {subtitle && <p className="mini-quiz__subtitle">{subtitle}</p>}
      </div>

      {done ? (
        <div className="mini-quiz__result" role="status">
          <strong>
            {score}/{questions.length} σωστές!
          </strong>
          <p>Θέλεις περισσότερες λέξεις και 12 τρόπους εξάσκησης;</p>
        </div>
      ) : (
        <>
          <p className="mini-quiz__progress">
            Ερώτηση {index + 1} από {questions.length}
          </p>
          <p className="mini-quiz__prompt">{q.prompt}</p>
          <ul className="mini-quiz__options">
            {q.options.map((opt, i) => {
              let state = "";
              if (selected !== null) {
                if (i === q.answerIndex) state = "correct";
                else if (i === selected) state = "wrong";
              }
              return (
                <li key={`${q.id}-${i}`}>
                  <button
                    type="button"
                    className={`mini-quiz__option ${state}`}
                    onClick={() => pick(i)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
