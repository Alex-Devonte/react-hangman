import axios from "axios";

const getCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/hangman`);
  return response.data;
};

const getWordFromCategory = async (category) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/hangman/words`,
    {
      params: { category: category },
    },
  );
  return response.data;
};

const HangmanService = { getCategories, getWordFromCategory };
export default HangmanService;
