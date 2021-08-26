import styled from "styled-components";
import { MapInteractionCSS } from "react-map-interaction";
import boxes from "../../data/boxes.json";

export const zoneColors = {
    0: "hsl(0,0%, 75%)",
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
    fill: ${({ zone }) => zoneColors[zone]};
    font-size: 10px;
    font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Tahoma, sans-serif;
    cursor: pointer;
`;

function BserMap({ setSelectedItem }) {
    return (
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
                        xlinkHref={process.env.PUBLIC_URL + "/MiniMap_01.png"}
                    />
                </g>
                {boxes.map((box) => (
                    <StyledText
                        transform={`translate(${box.coords[0]} ${box.coords[1]} )`}
                        zone={box.zone}
                        onClick={() => {
                            setSelectedItem(box);
                        }}
                    >
                        {box.quantity}
                    </StyledText>
                ))}
            </StyledSvg>
        </MapInteractionCSS>
    );
}

export default BserMap;
