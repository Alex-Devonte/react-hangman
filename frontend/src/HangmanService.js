import axios from "axios";

const getCategories = async () => {
  const response = await axios.get("/hangman");
  return response.data;
};

const HangmanService = { getCategories };
export default HangmanService;
