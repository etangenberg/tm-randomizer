const createArrray = (n) => {
  const [, ...remainder] = [...Array(n + 1).keys()];
  return remainder;
}

export default createArrray;
