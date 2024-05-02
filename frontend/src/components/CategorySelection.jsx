import { useEffect, useState } from "react";
import HangmanService from "../HangmanService";

function CategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoriesList] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await HangmanService.getCategories();
        setCategoriesList(categoryData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  return (
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
        disabled={!selectedCategory}
      >
        Start game
      </button>
      <button
        className="rounded-sm bg-sky-200 p-3 font-bold shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
        disabled={!categoryList.length}
      >
        Choose a random category
      </button>
    </div>
  );
}

export default CategorySelection;
