import { createContext, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        color: {
            state: true,
        },
        numbers: {
            state: true,
        },
        animals: {
            state: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
        },
        spawns: {
            state: true,
        },
        collectables: {
            state: false,
            301109: false,
            302102: false,
            301104: false,
            301102: false,
            401209: false,
            401208: false,
        },
        boxes: {
            state: true,
        },
    });

    const toggleSetting = (setting, index) => {
        if (index === "state") {
            let oldSettings = settings[setting];
            let newState = !settings[setting].state;
            Object.keys(oldSettings).forEach((key) => {
                oldSettings[key] = newState;
            });
            setSettings({
                ...settings,
                [setting]: oldSettings,
            });
        } else {
            let state =
                !settings[setting][index] ||
                Object.keys(settings[setting]).some((key) => {
                    if (key !== "state" && key !== index) {
                        return settings[setting][key];
                    }
                    return false;
                });
            setSettings({
                ...settings,
                [setting]: {
                    ...settings[setting],
                    [index]: !settings[setting][index],
                    state: state,
                },
            });
        }
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                toggleSetting,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
