import axios from "axios"
import { Parser } from "json2csv"
import fs from "node:fs"

export const fetchExoplanetsWithLimit = async (limit) => {
    try {
        const { data } = await axios.get(
            `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+TOP+${limit}+*+from+cumulative&format=json`, {
            timeout: 15000
        }
        );
        return data;
    } catch (error) {
        console.error("Erro no fetch de exoplanetas pelo limit", error.message);
    }
}

export const fetchAllExoplanets = async () => {
    try {
        const { data } = await axios.get(
            `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative&format=json`
        );
        return data;
    } catch (error) {
        console.error("Erro no fetch all dos exoplanetas", error.message);
    }
}

export const fetchExoplanetsByDisposition = async (disposition) => {
    try {
        const query = `SELECT koi_disposition,koi_period FROM cumulative WHERE koi_disposition LIKE '${disposition}' `;
        const { data } = await axios.get("https://exoplanetarchive.ipac.caltech.edu/TAP/sync",
            {
                params: {
                    query,
                    format: "json"
                },
                timeout: 15000,
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            }
        )
        return data
    } catch (error) {
        console.error("Erro no fetch dos exoplanetas pelo disposition", error.message);
    }
}
export const exportDataToCSV = async (data, filename = "output", fields = null) => {
    if (!Array.isArray(data) || data.length == 0) {
        console.error("Nenhum dado fornecido para gerar CSV.");
        return;
    }
    try {
        const opts = { fields: fields || Object.keys(data[0]) };
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        fs.writeFileSync(`${filename}.csv`, csv);
        console.log(`CSV '${filename}.csv' gerado com sucesso!`);
    }
    catch (error) {
        console.error("Erro ao gerar CSV:", error.message);
    }
}