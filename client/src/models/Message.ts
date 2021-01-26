export default class Message {
    public constructor(
        public subject: string,
        public message: string,
        public senderID: number,
        public receiverID: number
    ) {}
}