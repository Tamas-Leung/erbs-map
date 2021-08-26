import styled from "styled-components";
import MapSideBarWrapper from "./components/MapSideBarWrapper";

const Background = styled.div`
    background-color: hsl(0, 0%, 17.5%);
`;

function App() {
    return (
        <Background>
            <MapSideBarWrapper />
        </Background>
    );
}

export default App;
