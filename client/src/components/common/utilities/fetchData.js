const fetchData = (url, setdata, dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then(data => dispatch(setdata(data)))
};

export {
    fetchData,
}