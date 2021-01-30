export default class Message {
    public constructor(
        public ID: number,
        public subject: string,
        public content: string,
        public receiverUsername: string,
        public receiverID: number
    ) {}
}