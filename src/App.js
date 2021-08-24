import BserMap from "./components/BserMap";
import styled from "styled-components";

const Background = styled.div`
    background-color: hsl(0, 0%, 17.5%);
`;

function App() {
    return (
        <Background>
            <BserMap />
        </Background>
    );
}

export default App;
