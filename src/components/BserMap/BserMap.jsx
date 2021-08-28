import styled from "styled-components";
import { MapInteractionCSS } from "react-map-interaction";
import boxes from "../../data/boxes.json";
import { useState } from "react";
import Modal from "../Modal";

export const zoneColors = {
    0: "hsl(0,0%, 85%)",
    1: "hsl(0, 100%, 45%)",
    2: "hsl(55, 100%, 45%)",
    3: "hsl(120, 100%, 45%)",
    4: "hsl(200, 100%, 45%)",
    5: "hsl(304, 100%, 45%)",
};

const StyledSvg = styled.svg`
    width: 100%;
    height: calc(100vh - 4px);
`;

const StyledText = styled.text`
    fill: ${({ isColorEnabled, zone }) =>
        isColorEnabled ? zoneColors[zone] : "hsl(0, 0%, 75%)"};
    font-size: 10px;
    font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Tahoma, sans-serif;
    cursor: pointer;
`;

const StyledCircle = styled.circle`
    fill: ${({ isColorEnabled, zone }) =>
        isColorEnabled ? zoneColors[zone] : "hsl(0, 0%, 75%)"};
    cursor: pointer;
    stroke-width: 0.2px;
    stroke: hsl(0, 0%, 25%);
`;

const SettingBox = styled.div`
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    background-color: hsl(240, 5%, 30%);
    color: hsl(0, 0%, 87%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    z-index: 2;
`;

const CheckboxWithText = styled.div`
    display: flex;
    align-items: center;
`;

const CheckboxText = styled.p`
    margin-left: 0.25rem;
`;

const Checkbox = styled.input``;

const MapDiv = styled.div`
    position: relative;
    flex-grow: 1;
`;

const Credits = styled.div`
    position: absolute;
    color: hsl(0, 0%, 67%);
    left: 0.5rem;
    cursor: pointer;
    z-index: 2;
    bottom: 0.5rem;
    :hover {
        color: hsl(0, 0%, 87%);
    }
`;

const CreditsBox = styled.div`
    width: 40rem;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: hsl(240, 5%, 30%);
    color: hsl(0, 0%, 87%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CreditLink = styled.a`
    color: hsl(0, 0%, 87%);
`;

function BserMap({
    setSelectedItem,
    isNumberEnabled,
    isColorEnabled,
    setColorEnabled,
    setNumberEnabled,
}) {
    const [isCreditsOpen, setIsCreditsOpen] = useState(false);

    return (
        <MapDiv>
            <Modal open={isCreditsOpen} onClose={() => setIsCreditsOpen(false)}>
                <CreditsBox>
                    <h3>Original Map Data Source</h3>
                    <CreditLink
                        href="https://media.discordapp.net/attachments/854879257549340680/879299030952316988/ClusterMap.png"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Image
                    </CreditLink>
                    <p>
                        Special thanks to the contributers: Wraith, Zorceress,
                        Silvrr, LilyDango, KamLauBak, and YeetandSkeet
                    </p>
                    <h3>Created By MacTal</h3>
                    <p>
                        For suggestions or corrections, feel free to contact
                        TheAsianLife#2560 on discord
                    </p>
                </CreditsBox>
            </Modal>
            <Credits onClick={() => setIsCreditsOpen(true)}>Credits</Credits>
            <SettingBox>
                <CheckboxWithText>
                    <Checkbox
                        type="checkbox"
                        checked={isNumberEnabled}
                        onChange={() => {
                            setNumberEnabled(!isNumberEnabled);
                        }}
                    ></Checkbox>
                    <CheckboxText>Numbers</CheckboxText>
                </CheckboxWithText>
                <CheckboxWithText>
                    <Checkbox
                        type="checkbox"
                        checked={isColorEnabled}
                        onChange={() => {
                            setColorEnabled(!isColorEnabled);
                        }}
                    ></Checkbox>
                    <CheckboxText>Colors</CheckboxText>
                </CheckboxWithText>
            </SettingBox>
            <MapInteractionCSS maxScale={6} minScale={0.95} showControls={true}>
                <StyledSvg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 772 887"
                >
                    {/* <title>ZoneMapping</title> */}
                    <g id="Layer_1" data-name="Layer 1">
                        <image
                            width="772"
                            height="887"
                            xlinkHref={
                                process.env.PUBLIC_URL + "/MiniMap_01.png"
                            }
                        />
                    </g>
                    {boxes.map((box) =>
                        isNumberEnabled ? (
                            <StyledText
                                transform={`translate(${box.coords[0]} ${box.coords[1]} )`}
                                zone={box.zone}
                                isColorEnabled={isColorEnabled}
                                onClick={() => {
                                    setSelectedItem(box);
                                }}
                            >
                                {box.quantity}
                            </StyledText>
                        ) : (
                            <StyledCircle
                                cx={parseFloat(box.coords[0]) + 3}
                                cy={parseFloat(box.coords[1]) - 3}
                                r="2.5"
                                isColorEnabled={isColorEnabled}
                                zone={box.zone}
                                onClick={() => {
                                    setSelectedItem(box);
                                }}
                            ></StyledCircle>
                        )
                    )}
                </StyledSvg>
            </MapInteractionCSS>
        </MapDiv>
    );
}

export default BserMap;
