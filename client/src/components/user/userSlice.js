import { createSlice } from "@reduxjs/toolkit"
import { header, PUT } from "../common/utilities/type";


const initialState = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    img: "",
    role: 1,
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {  
            fetch("http://localhost:9999/Users/" + action.payload.id, {
                method: PUT,
                body: JSON.stringify(action.payload),
                headers: header,
            });
        },
    }
});

const { reducer, actions } = userSlice;
export const { updateUser } = actions;
export default reducer;
