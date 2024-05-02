import { useState } from "react";

function CategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className="grid grid-cols-1 p-2 md:mx-auto md:w-1/3">
      <div className="flex flex-col md:col-auto">
        <label htmlFor="selectedCategory" className="p-2 text-lg font-bold">
          Select a category
        </label>
        <select
          name="selectedCategory"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mb-10 cursor-pointer  rounded-md bg-sky-800 p-2 text-sky-50 shadow-sm"
        >
          <option value="">-- Select --</option>
          <optgroup label="Category 1">
            <option value="Sub Category 1-1">Sub Category 1-1</option>
            <option value="Sub Category 1-2">Sub Category 1-2</option>
            <option value="Sub Category 1-3">Sub Category 1-3</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value="Sub Category 2-1">Sub Category 2-1</option>
            <option value="Sub Category 2-1">Sub Category 2-2</option>
            <option value="Sub Category 2-1">Sub Category 2-3</option>
          </optgroup>
        </select>
      </div>
      <button
        className="my-10 rounded-sm bg-sky-200 p-3 font-bold shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
        disabled={!selectedCategory}
      >
        Start game
      </button>
      <button className="rounded-sm bg-sky-200 p-3 font-bold shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 md:col-auto">
        Choose a random category
      </button>
    </div>
  );
}

export default CategorySelection;
