import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import fetch from "cross-fetch";

export class GsocLeaderboard implements ISlashCommand {
    public command: string = "gsoc";
    public i18nDescription: string =
        "a slash command which takes the user's github username as subcommand and adds them to the GSoC leaderboard";
    public providesPreview: boolean = false;
    public i18nParamsExample: string = "";

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const [subcommand] = context.getArguments();
        const room = context.getRoom();
        let message: string;
        const sender = context.getSender();

        if (room.displayName !== "gsoc2022") {
            return;
        }

        if (!subcommand) {
            message = `Hi ${sender.username}, please provide your GitHub username by using "/gsoc <your_username>"`;
        }

        // password of admin
        const token = "sidharth";

        try {
            await fetch("http://0.0.0.0:8080/api/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, username: subcommand }),
            });
            message = `Hi ${sender.username}, you have been successfully added to the GSoC Leaderboard!`;
        } catch (err) {
            message = `Error occurred while adding ${err}`;
        }

        const messageStructure = modify.getCreator().startMessage();

        messageStructure.setRoom(room).setText(message);

        await modify.getCreator().finish(messageStructure);
    }
}
