import axios from "axios";

const getCategories = async () => {
  const response = await axios.get("/hangman");
  return response.data;
};

const getWordFromCategory = async (category) => {
  const response = await axios.get("/hangman/words", {
    params: { category: category },
  });
  return response.data;
};

const HangmanService = { getCategories, getWordFromCategory };
export default HangmanService;
