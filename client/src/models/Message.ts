export default class Message {
    public constructor(
        public subject: string,
        public content: string,
        public receiverUsername: string,
        public receiverID: number | null
    ) {}
}