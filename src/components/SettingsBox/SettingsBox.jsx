import styled from "styled-components";
import SettingsContext from "../Context/SettingsContext";
import { useContext, useState } from "react";
import codeToName from "../../data/codeToName.json";
import {
    AiOutlineRight,
    AiOutlineDown,
    AiOutlineMinus,
    AiOutlineExpandAlt,
} from "react-icons/ai";
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
    border-radius: 0.25rem;
    z-index: 2;
    min-width: 150px;
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

const SettingTitle = styled.h1`
    font-size: 1rem;
    text-align: start;
`;

const Minus = styled(AiOutlineMinus)`
    &:hover {
    }
`;

const Expand = styled(AiOutlineExpandAlt)``;

const SettingsTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px;
    border-bottom: 1px solid hsl(0, 0%, 60%);
`;

const CheckBoxContainer = styled.div`
    padding: 0.5rem 1.4rem;
`;

function SettingsBox() {
    const { settings, toggleSetting } = useContext(SettingsContext);

    const [collectablesExpanded, setCollectablesExpanded] = useState(false);
    const [animalsExpanded, setAnimalsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <SettingBox>
            <SettingsTitleContainer>
                <SettingTitle>Settings</SettingTitle>
                {isMinimized ? (
                    <Expand
                        onClick={() => {
                            setIsMinimized(false);
                        }}
                    />
                ) : (
                    <Minus
                        onClick={() => {
                            setIsMinimized(true);
                        }}
                    />
                )}
            </SettingsTitleContainer>

            {!isMinimized && (
                <CheckBoxContainer>
                    <CheckboxWithText
                        onClick={() => toggleSetting("supplies", "state")}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={settings.supplies.state}
                            readOnly={true}
                        ></Checkbox>
                        <CheckboxText>Supplies</CheckboxText>
                    </CheckboxWithText>
                    <CheckboxWithText
                        onClick={() => {
                            toggleSetting("collectables", "state");
                        }}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={settings.collectables.state}
                            readOnly={true}
                        ></Checkbox>
                        <CheckboxArrow
                            active={collectablesExpanded}
                            onClick={(e) => {
                                e.stopPropagation();
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
                                "205102"
                            ].map((collectable) => (
                                <CheckboxWithText
                                    key={collectable}
                                    onClick={() => {
                                        toggleSetting(
                                            "collectables",
                                            collectable
                                        );
                                    }}
                                >
                                    <Checkbox
                                        type="checkbox"
                                        checked={
                                            settings.collectables[collectable]
                                        }
                                        readOnly={true}
                                    ></Checkbox>
                                    <CheckboxText>
                                        {codeToName[collectable]}
                                    </CheckboxText>
                                </CheckboxWithText>
                            ))}
                        </NestedCheckboxes>
                    )}

                    <CheckboxWithText
                        onClick={() => toggleSetting("spawns", "state")}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={settings.spawns.state}
                            readOnly={true}
                        ></Checkbox>
                        <CheckboxText>Spawns</CheckboxText>
                    </CheckboxWithText>
                    <CheckboxWithText
                        onClick={() => toggleSetting("animals", "state")}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={settings.animals.state}
                            readOnly={true}
                        ></Checkbox>
                        <CheckboxArrow
                            active={animalsExpanded}
                            onClick={(e) => {
                                e.stopPropagation();
                                setAnimalsExpanded(!animalsExpanded);
                            }}
                        />
                        <CheckboxText>Animals</CheckboxText>
                    </CheckboxWithText>
                    {animalsExpanded && (
                        <NestedCheckboxes>
                            {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (animal) => (
                                    <CheckboxWithText
                                        key={animal}
                                        onClick={() =>
                                            toggleSetting("animals", animal)
                                        }
                                    >
                                        <Checkbox
                                            type="checkbox"
                                            checked={settings.animals[animal]}
                                            readOnly={true}
                                        ></Checkbox>
                                        <CheckboxText>
                                            {animalName[animal]}
                                        </CheckboxText>
                                    </CheckboxWithText>
                                )
                            )}
                        </NestedCheckboxes>
                    )}
                    <CheckboxWithText
                        onClick={() => toggleSetting("boxes", "state")}
                    >
                        <Checkbox
                            type="checkbox"
                            checked={settings.boxes.state}
                            readOnly={true}
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
                </CheckBoxContainer>
            )}
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
