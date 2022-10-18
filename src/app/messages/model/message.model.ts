export class Message {
  constructor(
    public message: string,
    public dateCreated: string,
    public isRead: boolean,
    public owner: { username: string; image?: string },
    public product: { itemNumber: string; image?: string },
    public user1?: string,
    public user2?: string,
    public messageGroup?:
      | any
      | string
      | { any: any; user1: { username: string }; user2: { username: string } }
  ) {}
}
