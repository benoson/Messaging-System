export default class ReceivedMessage {
    public constructor(
        public ID: number,
        public senderUsername: string,
        public subject: string,
        public content: string,
        public creationDate: string
    ) {}
}