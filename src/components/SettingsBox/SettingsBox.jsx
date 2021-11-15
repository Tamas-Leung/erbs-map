import styled from "styled-components";
import SettingsContext from "../Context/SettingsContext";
import { useContext, useState } from "react";
import codeToName from "../../data/codeToName.json";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import animalName from "../../data/animalName.json";

const SettingBox = styled.div`
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    background-color: hsl(240, 5%, 30%);
    color: hsl(0, 0%, 87%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    border-radius: 0.25rem;
    z-index: 2;
`;

const CheckboxWithText = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const CheckboxText = styled.p`
    margin-left: 0.25rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
`;

const NestedCheckboxes = styled.div`
    margin-left: 1rem;
`;

const Checkbox = styled.input`
    cursor: pointer;
`;

function SettingsBox() {
    const { settings, toggleSetting } = useContext(SettingsContext);

    const [collectablesExpanded, setCollectablesExpanded] = useState(false);
    const [animalsExpanded, setAnimalsExpanded] = useState(false);

    return (
        <SettingBox>
            <CheckboxWithText
                onClick={() => {
                    toggleSetting("collectables", "state");
                }}
            >
                <Checkbox
                    type="checkbox"
                    checked={settings.collectables.state}
                ></Checkbox>
                <CheckboxArrow
                    active={collectablesExpanded}
                    onClick={() => {
                        setCollectablesExpanded(!collectablesExpanded);
                    }}
                />
                <CheckboxText>Collectables</CheckboxText>
            </CheckboxWithText>
            {collectablesExpanded && (
                <NestedCheckboxes>
                    {[
                        "301109",
                        "302102",
                        "301104",
                        "301102",
                        "401209",
                        "401208",
                    ].map((collectable) => (
                        <CheckboxWithText
                            onClick={() => {
                                toggleSetting("collectables", collectable);
                            }}
                        >
                            <Checkbox
                                type="checkbox"
                                checked={settings.collectables[collectable]}
                            ></Checkbox>
                            <CheckboxText>
                                {codeToName[collectable]}
                            </CheckboxText>
                        </CheckboxWithText>
                    ))}
                </NestedCheckboxes>
            )}

            <CheckboxWithText onClick={() => toggleSetting("spawns", "state")}>
                <Checkbox
                    type="checkbox"
                    checked={settings.spawns.state}
                ></Checkbox>
                <CheckboxText>Spawns</CheckboxText>
            </CheckboxWithText>
            <CheckboxWithText onClick={() => toggleSetting("animals", "state")}>
                <Checkbox
                    type="checkbox"
                    checked={settings.animals.state}
                ></Checkbox>
                <CheckboxArrow
                    active={animalsExpanded}
                    onClick={() => {
                        setAnimalsExpanded(!animalsExpanded);
                    }}
                />
                <CheckboxText>Animals</CheckboxText>
            </CheckboxWithText>
            {animalsExpanded && (
                <NestedCheckboxes>
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((animal) => (
                        <CheckboxWithText
                            onClick={() => toggleSetting("animals", animal)}
                        >
                            <Checkbox
                                type="checkbox"
                                checked={settings.animals[animal]}
                            ></Checkbox>
                            <CheckboxText>{animalName[animal]}</CheckboxText>
                        </CheckboxWithText>
                    ))}
                </NestedCheckboxes>
            )}
            <CheckboxWithText onClick={() => toggleSetting("boxes", "state")}>
                <Checkbox
                    type="checkbox"
                    checked={settings.boxes.state}
                ></Checkbox>
                <CheckboxText>Boxes</CheckboxText>
            </CheckboxWithText>
            {/* <CheckboxWithText>
            <Checkbox
                type="checkbox"
                checked={settings.numbers}
                onChange={toggleNumbers}
            ></Checkbox>
            <CheckboxText>Numbers</CheckboxText>
            </CheckboxWithText>
            <CheckboxWithText>
                <Checkbox
                    type="checkbox"
                    checked={settings.color}
                    onChange={toggleColor}
                ></Checkbox>
                <CheckboxText>Colors</CheckboxText>
            </CheckboxWithText> */}
        </SettingBox>
    );
}

const CheckboxRightArrow = styled(AiOutlineRight)`
    position: absolute;
    left: -20px;
    width: 20px;
    height: 1rem;
`;

const CheckboxDownArrow = styled(AiOutlineDown)`
    position: absolute;
    left: -20px;
    width: 20px;
    height: 1rem;
`;

function CheckboxArrow({ active, onClick }) {
    return active ? (
        <CheckboxDownArrow onClick={onClick} />
    ) : (
        <CheckboxRightArrow onClick={onClick} />
    );
}

export default SettingsBox;
