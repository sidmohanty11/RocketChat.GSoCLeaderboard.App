import {
    ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

export const settings: ISetting = {
    id: "admin-password",
    i18nLabel: "admin-password",
    i18nDescription: "Provide admin password",
    required: true,
    type: SettingType.STRING,
    public: false,
    packageValue: "",
};
