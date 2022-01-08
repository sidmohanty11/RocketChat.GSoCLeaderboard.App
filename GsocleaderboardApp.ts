import {
    IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import {
    IPostRoomUserJoined,
    IRoomUserJoinedContext,
} from "@rocket.chat/apps-engine/definition/rooms";
import { GsocLeaderboard } from "./GsocLeaderboard";

export class GsocLeaderboardApp extends App implements IPostRoomUserJoined {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(
            new GsocLeaderboard(this)
        );
    }

    public async executePostRoomUserJoined(
        context: IRoomUserJoinedContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<void> {
        const { joiningUser, room } = context;
        const message: string = `Welcome @${joiningUser.username}, please introduce yourself and after that you can use "/gsoc <your_username>" to add yourself to the GSoC Leaderboard(https://gsoc.rocket.chat).`;
        const messageStructure = modify.getCreator().startMessage();
        messageStructure.setRoom(room).setText(message);
        await modify.getCreator().finish(messageStructure);
    }
}
