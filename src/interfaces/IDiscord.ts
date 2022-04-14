export interface IDiscord {
  content: string;
  embeds: [
    {
      author: { name: string };
      description: string;
    }
  ];
}
