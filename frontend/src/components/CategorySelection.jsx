import { useEffect, useState } from "react";
import HangmanService from "../HangmanService";
import { useNavigate } from "react-router-dom";

function CategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoriesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await HangmanService.getCategories();
        console.log(categoryData);
        setCategoriesList(categoryData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, []);

  const startGame = (e) => {
    let chosenCategory;
    if (e.target.name === "random") {
      //Get random index
      const randomCategoryIndex = Math.floor(
        Math.random() * categoryList.length,
      );

      //Get random object from category list
      const randomCategoryObject = categoryList[randomCategoryIndex];

      //Get random category from the object's categories array
      chosenCategory =
        randomCategoryObject.categories[
          Math.floor(Math.random() * randomCategoryObject.categories.length)
        ];
      setSelectedCategory(chosenCategory);
    } else {
      chosenCategory = selectedCategory;
    }

    const selectedTopic = categoryList.find((category) =>
      category.categories.includes(chosenCategory),
    ).topic;

    navigate(`/game?topic=${selectedTopic}&category=${chosenCategory}`);
  };

  return (
    <>
      <div className="mt-16 p-5 text-center">
        <h1 className="mb-16 text-6xl md:text-7xl lg:text-8xl">
          Welcome to Hangman
        </h1>
      </div>

      <div className="grid grid-cols-1 p-2 md:mx-auto md:w-1/3">
        <div className="flex flex-col md:col-auto">
          <label htmlFor="selectedCategory" className="p-2 text-lg font-bold">
            Select a category
          </label>
          {categoryList.length === 0 ? (
            <p className="text-2xl">Currently no categories available</p>
          ) : (
            <>
              <select
                name="selectedCategory"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-10 cursor-pointer  rounded-md bg-sky-800 p-2 text-sky-50 shadow-sm"
              >
                <option value="">-- Select --</option>

                {categoryList.map((category, i) => (
                  <optgroup key={i} label={category.topic}>
                    {category.categories.map((categoryName, j) => (
                      <option key={j} value={categoryName}>
                        {categoryName}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </>
          )}
        </div>
        <button
          className="my-10 rounded-sm bg-sky-200 p-3 font-bold shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
          name="start"
          disabled={!selectedCategory}
          onClick={(e) => startGame(e)}
        >
          Start game
        </button>
        <button
          className="rounded-sm bg-sky-200 p-3 font-bold shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
          name="random"
          disabled={!categoryList.length}
          onClick={(e) => startGame(e)}
        >
          Choose a random category
        </button>
      </div>
    </>
  );
}

export default CategorySelection;
