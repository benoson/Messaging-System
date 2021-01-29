import axios from "axios";

export default class Interceptor {
    public constructor() {}

    public static interceptRequest = (): void => {
        const userInfo = sessionStorage.getItem("userInfo");

        if (userInfo !== null) {
            if (JSON.parse(userInfo).token !== undefined) {
                const bearerToken = "Bearer " + JSON.parse(userInfo).token;
                console.log(bearerToken);
                
                axios.defaults.headers.common['Authorization'] = bearerToken;
            }
        }
    }
}