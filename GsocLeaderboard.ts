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
        let message: string = "";
        const [subcommand] = context.getArguments();
        const room = context.getRoom();
        const sender = context.getSender();

        if (room.displayName !== "gsoc2022") {
            return;
        }

        if (!subcommand) {
            message = `Hi ${sender.username}, please provide your GitHub username by using "/gsoc <your_username>"`;
        }

        // password of admin
        const token = await read
            .getEnvironmentReader()
            .getSettings()
            .getValueById("admin-password");

        if (subcommand) {
            try {
                const r = await http.post("http://0.0.0.0:8080/api/add", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: { token, username: subcommand },
                });
                if (r.statusCode === 200) {
                    message = `Hi ${sender.username}, you have been successfully added to the GSoC Leaderboard!`;
                } else {
                    message = `Something went wrong! ${r.statusCode}`;
                }
            } catch (err) {
                message = `Error occurred while adding ${err}`;
            }
        }

        const messageStructure = modify.getCreator().startMessage();

        messageStructure.setRoom(room).setText(message);

        await modify.getCreator().finish(messageStructure);
    }
}
