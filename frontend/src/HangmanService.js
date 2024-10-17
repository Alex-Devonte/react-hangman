import axios from "axios";
const baseURL = "https://react-hangman-3uqj.onrender.com";

const getCategories = async () => {
  const response = await axios.get(`${baseURL}/hangman`);
  return response.data;
};

const getWordFromCategory = async (category) => {
  const response = await axios.get(`${baseURL}hangman/words`, {
    params: { category: category },
  });
  return response.data;
};

const HangmanService = { getCategories, getWordFromCategory };
export default HangmanService;
