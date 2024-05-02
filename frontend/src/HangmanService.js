const getCategories = async () => {
  const response = await [
    { topic: "Sports", categories: ["NFL Teams", "NBA Teams"] },
    { topic: "Fruit", categories: ["Apple", "Strawberry"] },
  ];
  return response;
};

const HangmanService = { getCategories };
export default HangmanService;
