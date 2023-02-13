import axios from 'axios';

export const signUp = async (formData) => {

        let serverResponse = await axios({
            method: "POST",
            url: "/api/users", // route to do signup
            data: formData
        });
    return serverResponse;
}

