import { useState } from "react";

function CategorySelection() {
    const [selectedCategory, setSelectedCategory] = useState('');
    return  (
        <>
            <label htmlFor="selectedCategory">Select a category:</label>
            <select name="selectedCategory" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
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
            <button>Choose Category</button>
            <button>Random category</button>
        </>
    )
}

export default CategorySelection;