import styled from "styled-components";
import { MapInteractionCSS } from "react-map-interaction";
import boxes from "../../data/boxes.json";
import animals from "../../data/animals.json";
import spawns from "../../data/spawns.json";
import collectables from "../../data/collectables.json";
import { useState, useContext, useRef } from "react";
import Modal from "../Modal";
import { device } from "../../utils/device";
import UpdateHistory from "../UpdateHistory";
import SettingsContext from "../Context/SettingsContext";
import SettingsBox from "../SettingsBox";
import { itemTypes } from "../../enums/itemTypes";

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
    @media ${device.tabletMax} {
        height: calc(60vh - 4px);
    }
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
        isColorEnabled ? zoneColors[zone] : "hsl(0, 0%, 0%)"};
    cursor: pointer;
    stroke-width: 0.2px;
    stroke: ${({ isBorderColorEnabled, zone }) =>
        isBorderColorEnabled ? zoneColors[zone] : "hsl(0, 0%, 25%)"};
`;

const StyledImage = styled.image`
    cursor: pointer;
`;

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

const HistoryText = styled(Credits)`
    top: 0.5rem;
    bottom: auto;
`;

const CreditsBox = styled.div`
    width: 40rem;
    max-width: 90vw;
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

function BserMap({ setSelectedItem }) {
    const { settings } = useContext(SettingsContext);

    const [isCreditsOpen, setIsCreditsOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const svgRef = useRef(null);

    const getCursorPoint = (event) => {
        let cursorPoint = svgRef.current.createSVGPoint();
        cursorPoint.x = event.clientX;
        cursorPoint.y = event.clientY;
        cursorPoint = cursorPoint.matrixTransform(
            svgRef.current.getScreenCTM().inverse()
        );
        cursorPoint.x = Math.round(cursorPoint.x);
        cursorPoint.y = Math.round(cursorPoint.y);

        //For Dev purposes only
        // console.log(cursorPoint);

        return cursorPoint;
    };

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
            <Modal open={isHistoryOpen} onClose={() => setIsHistoryOpen(false)}>
                <UpdateHistory />
            </Modal>
            <SettingsBox />
            <Credits onClick={() => setIsCreditsOpen(true)}>Credits</Credits>
            <HistoryText onClick={() => setIsHistoryOpen(true)}>
                Last Updated: Patch 0.45.0
            </HistoryText>
            <MapInteractionCSS maxScale={6} minScale={0.95} showControls={true}>
                <StyledSvg
                    xmlns="https://www.w3.org/2000/svg"
                    xmlnsXlink="https://www.w3.org/1999/xlink"
                    viewBox="0 0 772 887"
                    ref={svgRef}
                    onClick={getCursorPoint}
                >
                    <g id="Layer_1" data-name="Layer 1">
                        <image
                            width="772"
                            height="887"
                            xlinkHref={
                                process.env.PUBLIC_URL + "/MiniMap_01.png"
                            }
                        />
                    </g>
                    {settings.collectables.state &&
                        collectables
                            .filter(({ code }) => {
                                return settings.collectables[code];
                            })
                            .map((collectable) => (
                                <StyledImage
                                    key={
                                        collectable.code +
                                        collectable.area +
                                        collectable.coords[0] +
                                        collectable.coords[1]
                                    }
                                    xlinkHref={
                                        process.env.PUBLIC_URL +
                                        `/images/items/${collectable.code}.png`
                                    }
                                    x={
                                        parseFloat(collectable.coords[0]) -
                                        15 / 2
                                    }
                                    y={
                                        parseFloat(collectable.coords[1]) -
                                        15 / 2
                                    }
                                    width={15}
                                    height={15}
                                    onClick={() => {
                                        setSelectedItem(
                                            collectable,
                                            itemTypes.COLLECTABLES
                                        );
                                    }}
                                    onTouchEnd={() => {
                                        setSelectedItem(
                                            collectable,
                                            itemTypes.COLLECTABLES
                                        );
                                    }}
                                />
                            ))}
                    {settings.spawns.state &&
                        spawns.map((spawn) => (
                            <StyledCircle
                                key={
                                    spawn.zone +
                                    spawn.area +
                                    spawn.coords[0] +
                                    spawn.coords[1]
                                }
                                cx={parseFloat(spawn.coords[0])}
                                cy={parseFloat(spawn.coords[1])}
                                r="2.5"
                                zone={spawn.zone}
                                isBorderColorEnabled={true}
                                onClick={() => {
                                    setSelectedItem(spawn, itemTypes.SPAWNS);
                                }}
                                onTouchEnd={() => {
                                    setSelectedItem(spawn, itemTypes.SPAWNS);
                                }}
                            ></StyledCircle>
                        ))}
                    {settings.animals.state &&
                        animals
                            .filter(({ code }) => {
                                return settings.animals[code];
                            })
                            .map((animal) => {
                                return (
                                    <StyledImage
                                        key={
                                            animal.code +
                                            animal.area +
                                            animal.coords[0] +
                                            animal.coords[1]
                                        }
                                        xlinkHref={
                                            process.env.PUBLIC_URL +
                                            `/images/animals/${animal.code}.png`
                                        }
                                        x={
                                            parseFloat(animal.coords[0]) -
                                            25 / 2
                                        }
                                        y={
                                            parseFloat(animal.coords[1]) -
                                            25 / 2
                                        }
                                        width={25}
                                        height={25}
                                        onClick={() => {
                                            setSelectedItem(
                                                animal,
                                                itemTypes.ANIMALS
                                            );
                                        }}
                                        onTouchEnd={() => {
                                            setSelectedItem(
                                                animal,
                                                itemTypes.ANIMALS
                                            );
                                        }}
                                    />
                                );
                            })}
                    {settings.boxes.state &&
                        boxes.map((box) =>
                            settings.numbers.state ? (
                                <StyledText
                                    key={
                                        box.area +
                                        box.zone +
                                        box.coords[0] +
                                        box.coords[1]
                                    }
                                    transform={`translate(${box.coords[0]} ${box.coords[1]} )`}
                                    zone={box.zone}
                                    isColorEnabled={settings.color.state}
                                    onClick={() => {
                                        setSelectedItem(box, itemTypes.BOXES);
                                    }}
                                    onTouchEnd={() => {
                                        setSelectedItem(box, itemTypes.BOXES);
                                    }}
                                >
                                    {box.quantity}
                                </StyledText>
                            ) : (
                                <StyledCircle
                                    key={
                                        box.area +
                                        box.zone +
                                        box.coords[0] +
                                        box.coords[1]
                                    }
                                    cx={parseFloat(box.coords[0]) + 3}
                                    cy={parseFloat(box.coords[1]) - 3}
                                    r="2.5"
                                    isColorEnabled={settings.color.state}
                                    zone={box.zone}
                                    onClick={() => {
                                        setSelectedItem(box, itemTypes.BOXES);
                                    }}
                                    onTouchEnd={() => {
                                        setSelectedItem(box, itemTypes.BOXES);
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
