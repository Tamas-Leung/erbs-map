import SideBar from "../SideBar";
import BserMap from "../BserMap";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
    display: flex;
    text-align: center;
`;

function MapSideBarWrapper() {
    const [selectedItem, setSelectedItem] = useState({});
    const [isColorEnabled, setColorEnabled] = useState(true);
    const [isNumberEnabled, setNumberEnabled] = useState(true);

    return (
        <Wrapper>
            <BserMap
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isColorEnabled={isColorEnabled}
                isNumberEnabled={isNumberEnabled}
                setColorEnabled={setColorEnabled}
                setNumberEnabled={setNumberEnabled}
            />
            <SideBar
                selectedItem={selectedItem}
                isColorEnabled={isColorEnabled}
            />
        </Wrapper>
    );
}

export default MapSideBarWrapper;
