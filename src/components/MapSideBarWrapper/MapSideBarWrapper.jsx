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

    return (
        <Wrapper>
            <BserMap
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <SideBar selectedItem={selectedItem} />
        </Wrapper>
    );
}

export default MapSideBarWrapper;
