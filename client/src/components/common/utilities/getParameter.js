const getParameter = (value) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const sid = searchParams.get(value);
    return sid
}

export default getParameter;