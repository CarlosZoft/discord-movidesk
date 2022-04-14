import axios from "axios";
import type { IDiscord } from "../interfaces";

const urlWebhook = process.env.DISC_WEBHOOK_URL as string;

export default async function discordPost(data: IDiscord) {
  try {
    await axios.post(urlWebhook, data);
  } catch (error) {
    console.error(error);
  }
}
