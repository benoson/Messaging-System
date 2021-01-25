class SuccesfulLoginServerResponse {
    constructor(token, username) {
        this.token = token;
        this.username = username;
     };
}

module.exports = SuccesfulLoginServerResponse;