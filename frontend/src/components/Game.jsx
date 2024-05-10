import { useSearchParams } from "react-router-dom";

function Game() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const category = searchParams.get("category");

  return (
    <div>
      <h1>Topic: {topic}</h1>
      <h1>Category: {category}</h1>
    </div>
  );
}

export default Game;
