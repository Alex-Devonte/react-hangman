import axios from "axios";

const getCategories = async () => {
  const response = await axios.get("http://localhost:3000/");
  return response.data;
};

const HangmanService = { getCategories };
export default HangmanService;
