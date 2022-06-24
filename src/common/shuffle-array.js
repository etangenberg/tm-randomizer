const shuffleArray = (inputArray) => {
  const array = [...inputArray];
  array.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [array[index], array[j]] = [array[j], array[index]];
  });

  return array;
};

export default shuffleArray;
