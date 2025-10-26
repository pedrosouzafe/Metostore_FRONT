import "./Rate.css";

function Rate({ rate }) {
  const filled = Math.min(Math.max(rate, 0), 5);
  const empty = 5 - filled;

  return (
    <div className="rate-component">
      <span className="filledStars">{"★ ".repeat(filled)}</span>
      <span className="stars">{"★ ".repeat(empty)}</span>
    </div>
  );
}

export default Rate;
