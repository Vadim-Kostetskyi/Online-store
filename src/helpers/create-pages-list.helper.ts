const createPagesList = (pagesAmount: number) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pagesAmount; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
};

export { createPagesList };
