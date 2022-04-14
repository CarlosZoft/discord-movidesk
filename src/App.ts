import discordApi from "./services/discord";
import express from "express";
import type { Express, Response, Request } from "express";
import type { IMovi, IDiscord } from "./interfaces";

class App {
  readonly app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  routes() {
    this.app.use("/", (_request: Request, response: Response) => {
      response.send("API is running");
    });
    this.app.use("/sendData", async (request: Request, response: Response) => {
      const data: IMovi = request.body;

      const formatData: IDiscord = {
        content: "",
        embeds: [
          {
            author: { name: "Movidesk" },
            description: `
              Id:${data.Id}
              Subject: ${data.Subject}
              Status: ${data.Status}
              Justification: ${data.Justification}
              Actions: ${JSON.stringify(data.Actions)}
              WebhookEvents: ${JSON.stringify(data.WebhookEvents)}
              Urgency: ${data.Urgency}
              ServiceFirstLevel: ${data.ServiceFirstLevel}
              CustomFieldValues: ${JSON.stringify(data.CustomFieldValues)}
              SlaSolutionTime: ${data.SlaSolutionTime}
            `,
          },
        ],
      };

      await discordApi(formatData);

      response.send("ok");
    });
  }
}

export default new App().app;
