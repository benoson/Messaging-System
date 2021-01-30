import axios from "axios";

export default class Interceptor {

    public static interceptRequest = (): void => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo !== null) {
            if (JSON.parse(userInfo).token !== undefined) {
                const bearerToken = "Bearer " + JSON.parse(userInfo).token;
                axios.defaults.headers.common['Authorization'] = bearerToken;
            }
        }
    }
}