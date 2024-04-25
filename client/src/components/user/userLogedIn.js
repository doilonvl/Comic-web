const userLogedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
        return user;
    }
    return ""
}
 
export default userLogedIn;