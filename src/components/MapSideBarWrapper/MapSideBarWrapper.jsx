import SideBar from "../SideBar";
import BserMap from "../BserMap";
import styled from "styled-components";
import { useState } from "react";
import { device } from "../../utils/device";
import { SettingsProvider } from "../Context/SettingsContext";

const Wrapper = styled.div`
    display: flex;
    text-align: center;

    @media ${device.mobileLMax} {
        flex-direction: column;
    }
`;

function MapSideBarWrapper() {
    const [selectedItem, setSelectedItem] = useState({});

    return (
        <SettingsProvider>
            <Wrapper>
                <BserMap
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
                <SideBar selectedItem={selectedItem} />
            </Wrapper>
        </SettingsProvider>
    );
}

export default MapSideBarWrapper;
