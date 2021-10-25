const arrayDeepCopy = (arr) => {
  let newArray = JSON.parse(JSON.stringify(arr));
  return newArray;
};

export default arrayDeepCopy;