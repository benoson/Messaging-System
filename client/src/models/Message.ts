export default class Message {
    public constructor(
        public subject: string,
        public message: string,
        public receiverUsername: string,
        public receiverID: number | undefined,
        public senderID: number | undefined
    ) {}
}