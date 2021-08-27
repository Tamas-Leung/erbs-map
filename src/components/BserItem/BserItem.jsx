import styled from "styled-components";
import codeToName from "../../data/codeToName.json";

const GradeColor = {
    Common: {
        fill: "linear-gradient(hsla(0, 0%, 50%, 1), hsla(0, 0%, 60%, 1))",
    },
};

const StyledImg = styled.img`
    height: 100%;
    /* filter: drop-shadow(1px 1px 0 ${({ grade }) => GradeColor[grade].border})
        drop-shadow(-1px 1px 0 ${({ grade }) => GradeColor[grade].border})
        drop-shadow(1px -1px 0 ${({ grade }) => GradeColor[grade].border})
        drop-shadow(-0.1px -0.1px 0 ${({ grade }) =>
        GradeColor[grade].border}); */
`;

const AltTextFontWrapper = styled.span`
    height: 100%;
    font-size: 0.6rem;
`;

const ItemBackground = styled.div`
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-radius: 3px;
    margin: 0.1rem;
    height: ${({ size }) => (size === "small" ? "1.5rem" : "2rem")};
    width: ${({ size }) => (size === "small" ? "2.7rem" : "3.6rem")};
`;

const ImageColorBackground = styled(ItemBackground)`
    background: ${({ grade }) => GradeColor[grade].fill};
    position: relative;
    /* border: ${({ grade }) => GradeColor[grade].border} solid 2px; */
    /* border-radius: 3px; */
    background-clip: padding-box;
    border: ${({ focus, theme }) =>
        focus ? `${theme.colors.secondary} 2px solid` : `transparent`};
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QuantityText = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: hsl(0, 0%, 17.5%);
    color: hsl(0, 0%, 87%);
    padding: 0 0.2rem;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
`;

function BserItem({ item, quantity, size }) {
    let itemName = codeToName[item];

    let imgSrc = process.env.PUBLIC_URL + "/images/items/" + item + ".png";

    return (
        <Item>
            <ImageColorBackground grade={"Common"} size={size}>
                <AltTextFontWrapper>
                    <StyledImg grade={"Common"} src={imgSrc} alt={itemName} />
                </AltTextFontWrapper>
                {quantity && <QuantityText>{quantity}</QuantityText>}
            </ImageColorBackground>
        </Item>
    );
}

export default BserItem;
