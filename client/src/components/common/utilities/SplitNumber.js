const SplitNumber = (value) => {
  let formattedString = value?.toString();
  let regex = /\B(?=(\d{3})+(?!\d))/g;
  formattedString = formattedString?.replace(regex, ".");
  return formattedString;
};

export default SplitNumber;
