import styled from "styled-components";
import areas from "../../data/areas.json";
import areaItemCount from "../../data/areaItemCount.json";
import BserItem from "../BserItem/BserItem";
import boxes from "../../data/boxes.json";
import cdf from "@stdlib/stats-base-dists-hypergeometric-cdf";
import pmf from "@stdlib/stats-base-dists-hypergeometric-pmf";
import { zoneColors } from "../BserMap/BserMap";
import Tippy from "@tippyjs/react";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import "tippy.js/dist/tippy.css";
import { device } from "../../utils/device";
import SettingsContext from "../Context/SettingsContext";
import { useContext, useState } from "react";
import { itemTypes } from "../../enums/itemTypes";
import animalName from "../../data/animalName.json";
import animalToGroups from "../../data/animalToGroups.json";
import animalDropChance from "../../data/animalDropChance.json";
import codeToName from "../../data/codeToName.json";
import Modal from "../Modal";

const SidebarBox = styled.div`
    width: 25%;
    background-color: hsl(240, 5%, 30%);
    display: flex;
    position: relative;
    padding: 0px 20px;
    flex-direction: column;
    align-items: start;
    height: 100vh;
    overflow-y: auto;
    min-width: 16rem;

    @media ${device.tabletMax} {
        width: 100%;
        height: 40vh;
    }
`;

const Header = styled.h1`
    margin: 0.8rem 0px;
    color: hsl(0, 0%, 87%);
`;

const Text = styled.p`
    font-size: 1rem;
    margin: 0.2rem 0px;
    color: ${({ color }) => (color ? color : "hsl(0, 0%, 60%)")};
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "")};
`;

const Subtitle = styled.h2`
    margin: 0.4rem 0px;
    color: ${({ color }) => color || "hsl(0, 0%,87%)"};
`;

const ItemHolderBox = styled.div`
    margin-bottom: 0.2rem;
    display: flex;
    flex-wrap: wrap;
`;

const ItemWithPercentages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ alignItems }) => (alignItems ? alignItems : "start")};
`;

const SubSubTitle = styled.h3`
    /* font-size: 0.8rem; */
    color: hsl(0, 0%, 60%);
`;

const SubSubtitleWithQuestionTooltip = styled.div`
    margin: 0.4rem 0;
    display: flex;
    align-items: center;
`;

const QuestionTooltip = styled(AiOutlineQuestionCircle)`
    margin-left: 2px;
    color: hsl(0, 0%, 60%);
`;

const Info = styled.h3`
    margin: 0.4rem 0px;
    color: hsl(0, 0%, 87%);
`;

const CreateSideBarSection = ({ selectedItem }) => {
    const { settings } = useContext(SettingsContext);

    if (selectedItem.type === itemTypes.BOXES) {
        const area = areas[selectedItem.area];
        const itemCount = areaItemCount[selectedItem.area];
        let areaItem = 0;
        const zoneItem = [];
        let mandatoryCount = 0;
        let leftoverCount = 0;

        for (const box of boxes) {
            if (box.area !== selectedItem.area) continue;
            areaItem += box.quantity;

            zoneItem[box.zone] = (zoneItem[box.zone] || 0) + box.quantity;
        }

        for (const item in itemCount) {
            const quantity = itemCount[item];

            mandatoryCount += Math.floor(quantity / 5);
            leftoverCount += quantity % 5;
        }

        const zoneLeftovers = zoneItem.map((zone, index) => {
            if (index === 0) return zone;
            return zone - mandatoryCount;
        });

        const zoneName = selectedItem.zone
            ? `Zone ${selectedItem.zone}`
            : `Zoneless`;

        return (
            <>
                <Subtitle>{area.englishName}</Subtitle>
                <Text>Items: {areaItem}</Text>
                <ItemHolderBox>
                    {Object.keys(itemCount).map((item) => {
                        const count = itemCount[item];

                        return (
                            <BserItem key={item} item={item} quantity={count} />
                        );
                    })}
                </ItemHolderBox>
                {/* <Text>Items per zone: {mandatoryCount}</Text>
                    <ItemHolderBox>
                        {Object.keys(itemCount).map((item) => {
                            const count = Math.floor(itemCount[item] / 5);

                            if (count === 0) return <></>;

                            return <BserItem item={item} quantity={count} />;
                        })}
                    </ItemHolderBox>
                    <Text>Leftovers: {leftoverCount}</Text>
                    <ItemHolderBox>
                        {Object.keys(itemCount).map((item) => {
                            const count = itemCount[item] % 5;

                            if (count === 0) return <></>;

                            return <BserItem item={item} quantity={count} />;
                        })}
                    </ItemHolderBox> */}
                <Subtitle
                    color={
                        settings.color.state
                            ? zoneColors[selectedItem.zone]
                            : null
                    }
                >
                    {zoneName}
                </Subtitle>
                {/* <Subtitle>
                    {selectedItem.coords[0] +
                        ", " +
                        selectedItem.coords[1]}
                </Subtitle> */}

                {selectedItem.zone ? (
                    <>
                        <Text>
                            Items in Zone: {zoneItem[selectedItem.zone]}
                        </Text>
                        <Text>Extras: {zoneLeftovers[selectedItem.zone]}</Text>

                        <SubSubtitleWithQuestionTooltip>
                            <SubSubTitle>Item Chance in Zone</SubSubTitle>
                            <Tippy
                                arrow={true}
                                content={
                                    <span>
                                        All percentages are <b>estimates</b> due
                                        to the complex nature of the boxes. They
                                        are all <b>inaccurate</b> and should
                                        only be used as an idea of what the
                                        actual chance is
                                    </span>
                                }
                            >
                                <div>
                                    <QuestionTooltip />
                                </div>
                            </Tippy>
                        </SubSubtitleWithQuestionTooltip>

                        <ItemHolderBox>
                            {Object.keys(itemCount).map((item) => {
                                const count = itemCount[item] % 5;

                                const mandatory =
                                    selectedItem.zone !== 0
                                        ? Math.floor(itemCount[item] / 5)
                                        : 0;

                                const chances = {};

                                if (mandatory > 0) chances[mandatory] = 100;

                                let currentExtra = 0;

                                while (true) {
                                    currentExtra++;
                                    const chance =
                                        1 -
                                        cdf(
                                            currentExtra,
                                            leftoverCount,
                                            count,
                                            zoneLeftovers[selectedItem.zone]
                                        ) +
                                        pmf(
                                            currentExtra,
                                            leftoverCount,
                                            count,
                                            zoneLeftovers[selectedItem.zone]
                                        );

                                    if (chance <= 0.01 || currentExtra >= 4)
                                        break;

                                    chances[currentExtra + mandatory] = (
                                        chance * 100
                                    ).toFixed(0);
                                }

                                return (
                                    <ItemWithPercentages key={item}>
                                        <BserItem item={item} />
                                        {Object.keys(chances).map(
                                            (quantity) => {
                                                return (
                                                    <Text key={quantity}>
                                                        {quantity}:
                                                        {chances[quantity]}%
                                                    </Text>
                                                );
                                            }
                                        )}
                                    </ItemWithPercentages>
                                );
                            })}
                        </ItemHolderBox>
                    </>
                ) : (
                    <>
                        <Text>Leftovers: {zoneItem[selectedItem.zone]}</Text>
                        <SubSubtitleWithQuestionTooltip>
                            <SubSubTitle>
                                Item Chance in Selected Box
                            </SubSubTitle>
                            <Tippy
                                arrow={true}
                                content={
                                    <span>
                                        All percentages are <b>estimates</b> due
                                        to the complex nature of the boxes.
                                        Expect the chance to be higher than
                                        listed.
                                    </span>
                                }
                            >
                                <div>
                                    <QuestionTooltip />
                                </div>
                            </Tippy>
                        </SubSubtitleWithQuestionTooltip>
                        <ItemHolderBox>
                            {Object.keys(itemCount).map((item) => {
                                const count = itemCount[item] % 5;

                                if (count === 0) return <></>;

                                const chances = {};

                                let currentExtra = 0;

                                while (true) {
                                    currentExtra++;
                                    const chance =
                                        1 -
                                        cdf(
                                            currentExtra,
                                            leftoverCount,
                                            count,
                                            selectedItem.quantity
                                        ) +
                                        pmf(
                                            currentExtra,
                                            leftoverCount,
                                            count,
                                            selectedItem.quantity
                                        );

                                    if (chance <= 0.01 || currentExtra >= 2)
                                        break;

                                    chances[currentExtra] = (
                                        chance * 100
                                    ).toFixed(0);
                                }

                                return (
                                    <ItemWithPercentages key={item}>
                                        <BserItem item={item} />
                                        {Object.keys(chances).map(
                                            (quantity) => {
                                                return (
                                                    <Text key={quantity}>
                                                        {quantity}:
                                                        {chances[quantity]}%
                                                    </Text>
                                                );
                                            }
                                        )}
                                    </ItemWithPercentages>
                                );
                            })}
                        </ItemHolderBox>
                    </>
                )}
            </>
        );
    } else if (selectedItem.type === itemTypes.ANIMALS) {
        const area = areas[selectedItem.area];
        return (
            <>
                <Subtitle>
                    {area.englishName} {animalName[selectedItem.code]}
                </Subtitle>
                {animalToGroups[selectedItem.code].map(
                    ({ group, groupName }) => (
                        <>
                            <Subtitle>{groupName}</Subtitle>
                            <ItemHolderBox>
                                {animalDropChance[group].map(
                                    ({ code, probability }) => (
                                        <ItemWithPercentages
                                            key={code}
                                            alignItems={"center"}
                                        >
                                            <BserItem item={code} />
                                            <Text
                                                fontWeight={
                                                    probability === "100"
                                                        ? 700
                                                        : null
                                                }
                                            >
                                                {probability}%
                                            </Text>
                                        </ItemWithPercentages>
                                    )
                                )}
                            </ItemHolderBox>
                        </>
                    )
                )}
            </>
        );
    } else if (selectedItem.type === itemTypes.SPAWNS) {
        const area = areas[selectedItem.area];

        return (
            <>
                <Subtitle>{area.englishName} Spawn</Subtitle>
                <Subtitle
                    color={
                        settings.color.state
                            ? zoneColors[selectedItem.zone]
                            : null
                    }
                >
                    Zone {selectedItem.zone}
                </Subtitle>
            </>
        );
    } else if (selectedItem.type === itemTypes.COLLECTABLES) {
        const area = areas[selectedItem.area];

        return (
            <>
                <Subtitle>{area.englishName} Collectable</Subtitle>
                <Subtitle>{codeToName[selectedItem.code]}</Subtitle>
            </>
        );
    } else {
        return <Info>Select a Box/Animal/Spawn/Collectable to start</Info>;
    }
};

const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const QuestionIcon = styled(AiOutlineQuestionCircle)`
    color: hsl(0, 0%, 60%);
    height: 100%;
    width: 2rem;

    :hover {
        color: hsl(0, 0%, 87%);
    }
`;

function SideBar({ selectedItem }) {
    const [isHelpOpened, setHelpOpened] = useState(false);

    return (
        <SidebarBox>
            <Modal open={isHelpOpened} onClose={() => setHelpOpened(false)}>
                <HelpModal onClose={() => setHelpOpened(false)} />
            </Modal>
            <HeaderBox>
                <Header>ERBS Map</Header>
                <QuestionIcon onClick={() => setHelpOpened(true)} />
            </HeaderBox>

            <CreateSideBarSection selectedItem={selectedItem} />
        </SidebarBox>
    );
}

const HelpModalDiv = styled.div`
    width: 90vw;
    height: 90vh;
    background-color: hsl(240, 5%, 30%);
    color: hsl(0, 0%, 87%);
    padding: 2rem;
    border-radius: 0.5rem;

    overflow-y: auto;
`;

const CloseButton = styled(AiOutlineClose)`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    width: 1.5rem;
    height: 1.5rem;

    color: hsl(0, 0%, 60%);

    :hover {
        color: hsl(0, 0%, 87%);
    }
`;

const HelpTitle = styled.h2``;

const StyledImg = styled.img`
    height: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
    margin: ${({ margin }) => margin};
    max-width: ${({ maxWidth }) => maxWidth};
`;

const HelpSubTitle = styled.h3``;

const Paragraph = styled.p``;

const HelpBoxes = styled.div`
    margin-top: 1.5rem;
`;

const StyledLink = styled.a`
    color: hsl(0, 0%, 60%);
`;

const HelpModal = ({ onClose }) => {
    return (
        <HelpModalDiv>
            <CloseButton onClick={onClose} />
            <HelpTitle>Help Guide</HelpTitle>
            <HelpBoxes>
                <HelpSubTitle>Boxes and Spawns</HelpSubTitle>
                <StyledImg
                    grade={"Common"}
                    src={process.env.PUBLIC_URL + "/images/box_guide.png"}
                    alt={"Box Guide"}
                    borderRadius={"0.5rem"}
                    height={"14rem"}
                />
                <Paragraph>
                    Number on each box represents the number of items in that
                    box. Each color represents a loot distribution zone/cluster.
                    To learn more on loot clusters:&nbsp;
                    <StyledLink
                        href="https://www.youtube.com/watch?v=NCn_0UxFGM8"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.youtube.com/watch?v=NCn_0UxFGM8
                    </StyledLink>
                </Paragraph>
            </HelpBoxes>

            <HelpBoxes>
                <HelpSubTitle>Additional Options</HelpSubTitle>
                <StyledImg
                    grade={"Common"}
                    src={process.env.PUBLIC_URL + "/images/setting_toggles.png"}
                    alt={"Box Guide"}
                    borderRadius={"0.5rem"}
                    height={"10rem"}
                />
                <Paragraph>
                    Toggle options to see locations of collectables and animals.
                    Click on Animals to see drop chances of animals!
                </Paragraph>
            </HelpBoxes>

            <HelpBoxes>
                <HelpSubTitle>Reading drop chances</HelpSubTitle>
                <StyledImg
                    grade={"Common"}
                    src={process.env.PUBLIC_URL + "/images/drop_chances.png"}
                    alt={"Box Guide"}
                    borderRadius={"0.5rem"}
                    width={"100%"}
                    maxWidth={"40rem"}
                />
                <Paragraph>
                    Drop chance are shown in form of "Quantity: Percentage".
                    <br /> <br /> For boxes, All chances that are not 100% are
                    estimates and not accurate. They should be used as a guide
                    to what the real chance could be. For animals, they are all
                    accurate.
                </Paragraph>
            </HelpBoxes>
        </HelpModalDiv>
    );
};

export default SideBar;
