import axios from 'axios';
// utilites folder is for universal, reusable functions
export const signUp = async (formData) => {

        let serverResponse = await axios({
            method: "POST",
            url: "/users/signup", // route to do signup
            data: formData
        });

    return serverResponse;
}
export const logIn = async (formData) => {

        let serverResponse = await axios({
            method: "PUT",
            url: "/users/login",
            data: formData
        });

    return serverResponse;
}


