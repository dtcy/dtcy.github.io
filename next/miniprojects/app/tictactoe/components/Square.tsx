
export default function Square({ value, handleClick }) {
  return (
    <div>
      <button
        onClick={handleClick}
        style={{ fontSize: "4rem", width: "8rem", height: "8rem" }}
      >
        {value}
      </button>
    </div>
  );
}
