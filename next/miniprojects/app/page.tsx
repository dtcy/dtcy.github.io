import Link from "next/link";
export default function page() {
  return (
    <nav>
      <Link href="/tictactoe">
        {" "}
        <button>TicTacToe</button>
      </Link>
      <Link href="/star-rating">
        {" "}
        <button>Star Rating</button>
      </Link>
      <Link href="/tabs">
        {" "}
        <button>Tabs</button>
      </Link>
      <Link href="/background-color-changer">
        {" "}
        <button>Background Colour Changer</button>
      </Link>
      <Link href="/slider">
        {" "}
        <button>slider</button>
      </Link>
      <Link href="/load-more">
        {" "}
        <button>Load more</button>
      </Link>
      <Link href="/gemini">
        {" "}
        <button>Gemini</button>
      </Link>
      <Link href="/image-upload">
        {" "}
        <button>Image Upload</button>
      </Link>
    </nav>
  );
}
