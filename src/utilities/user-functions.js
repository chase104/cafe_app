import axios from 'axios';
// utilites folder is for universal, reusable functions
export const signUp = async (formData) => {

        let serverResponse = await axios({
            method: "POST",
            url: "/api/users/signup", // route to do signup
            data: formData
        });

    return serverResponse;
}

