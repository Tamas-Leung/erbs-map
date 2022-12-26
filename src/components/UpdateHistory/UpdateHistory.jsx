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
    date: "2022/12/26",
    changes: [
      "Update to Patch 0.74"
    ],
  },
  {
    date: "2022/10/4",
    changes: [
      "Update to Patch 0.68"
    ],
  },
  {
    date: "2022/08/23",
    changes: [
      "Fixed temple boxes"
    ],
  },
  {
    date: "2022/08/18",
    changes: [
      "Update to Patch 0.65"
    ],
  },
  {
    date: "2022/07/31",
    changes: [
      "Fixed purple box chance"
    ],
  },
  {
    date: "2022/07/10",
    changes: [
      "Updated to Patch 0.62.0",
      "Updated drop rates",
      "Added Necro",
      "Fixed Wick/Alpha Spawns locations",
    ],
  },
  {
    date: "2022/05/14",
    changes: [
      "Updated to Patch 0.58.0",
      "Added flowers",
      "Updated air drop and animal drops",
    ],
  },
  {
    date: "2022/04/27",
    changes: [
      "Updated to Patch 0.57.0",
      "Air drops may be inaccurate",
      "Animal spawns updated",
    ],
  },
  {
    date: "2022/02/03",
    changes: [
      "Updated to Patch 0.51.0",
      "Updated With Season 5 Official Loot distributions",
    ],
  },
  {
    date: "2022/01/28",
    changes: [
      "Updated to Patch 0.50.0",
      "Updated With Official Loot distributions",
      "Fixed spawn locations in certain areas",
      "Added new Meteorite spawns",
      "Added Supply crate drop rates",
    ],
  },
  {
    date: "2021/12/29",
    changes: ["Updated to Patch 0.48.0"],
  },
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
