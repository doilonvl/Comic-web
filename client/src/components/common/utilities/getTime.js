const getTime = (time) => {
  const date = new Date(time);
  const str = `${date.getDate().toString().padStart(2, "0")}:${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}:${date.getFullYear()}`;
  return str;
};

export default getTime;
