import { createContext, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        color: true,
        numbers: true,
        animals: false,
        spawns: true,
        collectables: true,
    });

    const toggleColor = () => {
        setSettings({
            ...settings,
            color: !settings.color,
        });
    };

    const toggleNumbers = () => {
        setSettings({
            ...settings,
            numbers: !settings.numbers,
        });
    };

    const toggleCollectables = () => {
        setSettings({
            ...settings,
            collectables: !settings.collectables,
        });
    };

    const toggleSpawns = () => {
        setSettings({
            ...settings,
            spawns: !settings.spawns,
        });
    };

    const toggleAnimals = () => {
        setSettings({
            ...settings,
            animals: !settings.animals,
        });
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                toggleNumbers,
                toggleColor,
                toggleAnimals,
                toggleSpawns,
                toggleCollectables,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
