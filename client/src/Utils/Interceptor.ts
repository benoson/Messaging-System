import axios from "axios";

export default class Interceptor {

    public static interceptRequest = (): void => {
        const userInfoFromStorage = localStorage.getItem("userInfo");

        if (userInfoFromStorage !== null) {
            if (JSON.parse(userInfoFromStorage).token !== undefined) {
                const bearerToken = "Bearer " + JSON.parse(userInfoFromStorage).token;
                axios.defaults.headers.common['Authorization'] = bearerToken;
            }
        }
    }
}