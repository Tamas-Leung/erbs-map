import styled from "styled-components";

const HistoryBox = styled.div`
    width: 40rem;
    max-width: 90vw;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: hsl(240, 5%, 30%);
    color: hsl(0, 0%, 87%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 80vh;
    overflow-y: auto;
`;

const HistoryTitle = styled.h2`
    font-size: 1.5rem;
`;

const ChangeDate = styled.div`
    font-weight: 700;
`;

const ChangesList = styled.ul`
    margin-bottom: 1rem;
`;

const ChangesListItem = styled.li`
    margin-left: 1rem;
`;

const historyData = [
    {
        date: "2021/11/25",
        changes: [
            "Updated to Patch 0.46.0",
            "Updated drop chances of Bears",
            "Updated animal locations for New Alpha/Omega Spawns",
            "Added Help Guide",
        ],
    },
    {
        date: "2021/11/15",
        changes: [
            "Updated layout for tablet sizes",
            "Fixed arrow expanding issues",
        ],
    },
    {
        date: "2021/11/14",
        changes: [
            "Updated to Patch 0.45.0",
            "Added Collectables and Spawns",
            "Added nested toggles for Animals and Collectables",
            "Added Animal drop chances",
            "Added tooltip to item hovering",
        ],
    },
    {
        date: "2021/11/06",
        changes: [
            "Updated to Patch 0.44.0",
            "Fixed School and Forest Loot Maps",
            "Added Animals Toggle",
            "Removed Color and number toggles",
        ],
    },
    {
        date: "2021/09/30",
        changes: ["Updated to Patch 0.42.0"],
    },
    {
        date: "2021/09/16",
        changes: ["Updated to Patch 0.41.0"],
    },
    {
        date: "2021/09/08",
        changes: ["Changed percentage calculations"],
    },
    {
        date: "2021/09/04",
        changes: [
            "Fixed Bandage/Coffee/Garlic images",
            "Added new boxes for Temple + Dock",
            "Changed Zoning for Archery Range",
        ],
    },
    {
        date: "2021/08",
        changes: ["Created ERBS Loot Map"],
    },
];

function UpdateHistory() {
    return (
        <HistoryBox>
            <HistoryTitle>Update History</HistoryTitle>
            {historyData.map(({ date, changes }) => (
                <>
                    <ChangeDate key={date}>{date}</ChangeDate>
                    <ChangesList>
                        {changes.map((change) => (
                            <ChangesListItem>{change}</ChangesListItem>
                        ))}
                    </ChangesList>
                </>
            ))}
        </HistoryBox>
    );
}

export default UpdateHistory;
