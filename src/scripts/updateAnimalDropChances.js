import dotenv from "dotenv";
import codeToName from "../data/codeToName.json";
import fs from "fs";
import fetch from "node-fetch";

dotenv.config({ path: new URL("./../../.env", import.meta.url) });

const api = process.env.BSER_API_KEY;

const baseRequestURL = "https://open-api.bser.io";

function getDataPath(filename) {
    return new URL(`../data/${filename}`, import.meta.url);
}

async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: { accept: "application/json", "x-api-key": api },
    });

    let json;
    if (response.ok) {
        json = await response.json();
    } else {
        console.log("HTTP-Error: " + response.status);
        return;
    }

    const data = json.data;
    return data;
}

async function main() {
    const data = await getData(`${baseRequestURL}/v1/data/DropGroup`);

    const itemData = {};

    for (const { itemCode, groupCode, probability, dropType } of data) {
        // if (!groupCode.toString().startsWith("1")) continue;

        itemData[groupCode] = [
            ...(itemData[groupCode] || []),
            {
                code: itemCode,
                probability: probability,
                dropType: dropType,
            },
        ];
    }

    const itemProbabilities = {};

    for (const [group, items] of Object.entries(itemData)) {
        const totalProbability = items.reduce(
            (total, item) =>
                total + (item.dropType === "Random" ? item.probability : 0),
            0
        );

        items.forEach((item) => {
            itemProbabilities[group] = [
                ...(itemProbabilities[group] || []),
                {
                    code: item.code,
                    probability:
                        item.dropType === "Random"
                            ? Number(
                                  (item.probability / totalProbability) * 100
                              ).toFixed(2)
                            : "100",
                },
            ];
        });
    }

    const itemProbabilitiesSorted = {};

    for (const [group, items] of Object.entries(itemProbabilities)) {
        itemProbabilitiesSorted[group] = items.sort(
            (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
        );
    }

    console.log(itemProbabilitiesSorted);

    fs.writeFile(
        getDataPath("animalDropChance.json"),
        JSON.stringify(itemProbabilitiesSorted),
        function (err, res) {
            if (err) console.log(err);
        }
    );
}

main();
