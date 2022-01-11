import {
    ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

export const settings: Array<ISetting> = [
    {
        id: "admin-password",
        i18nLabel: "admin-password",
        i18nDescription: "Provide admin password",
        required: true,
        type: SettingType.STRING,
        public: false,
        packageValue: "",
    },
    {
        id: "domain",
        i18nLabel: "domain",
        i18nDescription: "Provide leaderboard domain",
        required: false,
        type: SettingType.STRING,
        public: false,
        packageValue: "https://gsoc.rocket.chat",
    },
];
