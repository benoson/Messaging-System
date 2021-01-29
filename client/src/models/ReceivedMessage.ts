export default class ReceivedMessage {
    public constructor(
        public senderUsername: string,
        public subject: string,
        public content: string,
        public creationDate: string
    ) {}
}