import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("680f5b090004e41bb7e5");

export const account = new Account(client);
export default client;