import styled from "styled-components";
import areas from "../../data/areas.json";
import areaItemCount from "../../data/areaItemCount.json";
import BserItem from "../BserItem/BserItem";
import boxes from "../../data/boxes.json";
import cdf from "@stdlib/stats-base-dists-hypergeometric-cdf";
import pmf from "@stdlib/stats-base-dists-hypergeometric-pmf";
import { zoneColors } from "../BserMap/BserMap";
import Tippy from "@tippyjs/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "tippy.js/dist/tippy.css";
import { device } from "../../utils/device";

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

    @media ${device.mobileLMax} {
        width: 100%;
        height: 40vh;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: hsl(0, 0%, 90%);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: hsl(0, 0%, 55%);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: hsl(0, 0%, 60%);
    }
`;

const Header = styled.h1`
    margin: 0.8rem 0px;
    color: hsl(0, 0%, 87%);
`;

const Text = styled.p`
    font-size: 1rem;
    margin: 0.2rem 0px;
    color: hsl(0, 0%, 60%);
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
    align-items: start;
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

function SideBar({ selectedItem, isColorEnabled }) {
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
        <SidebarBox>
            <Header>ERBS Map</Header>
            {selectedItem.area ? (
                selectedItem.area && (
                    <>
                        <Subtitle>{area.englishName}</Subtitle>
                        <Text>Items: {areaItem}</Text>
                        <ItemHolderBox>
                            {Object.keys(itemCount).map((item) => {
                                const count = itemCount[item];

                                return (
                                    <BserItem item={item} quantity={count} />
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
                                isColorEnabled
                                    ? zoneColors[selectedItem.zone]
                                    : null
                            }
                        >
                            {zoneName}
                        </Subtitle>

                        {selectedItem.zone ? (
                            <>
                                <Text>
                                    Items in Zone: {zoneItem[selectedItem.zone]}
                                </Text>
                                <Text>
                                    Extras: {zoneLeftovers[selectedItem.zone]}
                                </Text>

                                <SubSubtitleWithQuestionTooltip>
                                    <SubSubTitle>
                                        Item Chance in Zone
                                    </SubSubTitle>
                                    <Tippy
                                        arrow={true}
                                        content={
                                            <span>
                                                All percentages are estimates
                                                due to the complex nature of the
                                                boxes. Zones with higher number
                                                of boxes will have higher
                                                chances than the estimate
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
                                                ? Math.floor(
                                                      itemCount[item] / 5
                                                  )
                                                : 0;

                                        if (count === 0) return <></>;

                                        const chances = {};

                                        if (mandatory > 0)
                                            chances[mandatory] = 100;

                                        let currentExtra = 0;

                                        while (true) {
                                            currentExtra++;
                                            const chance =
                                                1 -
                                                cdf(
                                                    currentExtra,
                                                    leftoverCount,
                                                    count,
                                                    zoneLeftovers[
                                                        selectedItem.zone
                                                    ]
                                                ) +
                                                pmf(
                                                    currentExtra,
                                                    leftoverCount,
                                                    count,
                                                    zoneLeftovers[
                                                        selectedItem.zone
                                                    ]
                                                );

                                            if (
                                                chance <= 0.01 ||
                                                currentExtra >= 4
                                            )
                                                break;

                                            chances[currentExtra + mandatory] =
                                                (chance * 100).toFixed(0);
                                        }

                                        return (
                                            <ItemWithPercentages>
                                                <BserItem item={item} />
                                                {Object.keys(chances).map(
                                                    (quantity) => {
                                                        return (
                                                            <Text>
                                                                {quantity}:
                                                                {
                                                                    chances[
                                                                        quantity
                                                                    ]
                                                                }
                                                                %
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
                                <Text>
                                    Leftovers: {zoneItem[selectedItem.zone]}
                                </Text>
                                <SubSubtitleWithQuestionTooltip>
                                    <SubSubTitle>
                                        Item Chance in Selected Box
                                    </SubSubTitle>
                                    <Tippy
                                        arrow={true}
                                        content={
                                            <span>
                                                All percentages are estimates
                                                due to the complex nature of the
                                                boxes.
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

                                            if (
                                                chance <= 0.01 ||
                                                currentExtra >= 4
                                            )
                                                break;

                                            chances[currentExtra] = (
                                                chance * 100
                                            ).toFixed(0);
                                        }

                                        return (
                                            <ItemWithPercentages>
                                                <BserItem item={item} />
                                                {Object.keys(chances).map(
                                                    (quantity) => {
                                                        return (
                                                            <Text>
                                                                {quantity}:
                                                                {
                                                                    chances[
                                                                        quantity
                                                                    ]
                                                                }
                                                                %
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
                )
            ) : (
                <Info>Select a box to start</Info>
            )}
        </SidebarBox>
    );
}

export default SideBar;
