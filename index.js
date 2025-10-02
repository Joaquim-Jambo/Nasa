import axios from "axios"
import { Parser } from "json2csv"
import fs from "node:fs"

const getDataWithLimit = async (limit) => {
  try {
    const { data } = await axios.get(
      `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+TOP+${limit}+*+from+cumulative&format=json`
    );
    return data;
  } catch (error) {
    console.error("Erro", error.message);
  }
}

const getData = async (limit) => {
  try {
    const { data } = await axios.get(
      `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative&format=json`
    );
    return data;
  } catch (error) {
    console.error("Erro", error.message);
  }
};
const getDataByDescription = async (desc) => {
  try {
    let query = `SELECT koi_disposition,koi_period FROM cumulative WHERE koi_disposition LIKE 'CONFIRMED' `;
    const query_candidate = `SELECT koi_disposition,koi_period FROM cumulative WHERE koi_disposition LIKE 'CANDIDATE' `;
    const query_false_positive = `SELECT koi_disposition,koi_period FROM cumulative WHERE koi_disposition LIKE 'FALSE POSITIVE' `;
    if (desc === 'CANDIDATE') {
      query = query_candidate
    } else if (desc === 'FALSE POSITIVE') {
      query = query_false_positive
    }
    const { data } = await axios.get("https://exoplanetarchive.ipac.caltech.edu/TAP/sync",
      {
        params: {
          query,
          format: "json"
        },
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    )
    return data
  } catch (error) {
    console.error(error.message);
  }
}

const generateCSV = (data, filename = "output", fields = null) => {
  if (!Array.isArray(data) || data.length == 0) {
    console.error("Nenhum dado fornecido para gerar CSV.");
    return;
  }
  try {
    const opts = { fields: fields || Object.keys(data[0]) };
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    fs.writeFileSync(`${filename}.csv`, csv);
    console.log(`✅ CSV '${filename}.csv' gerado com sucesso!`);
  } 
  catch (error) {
    console.error("Erro ao gerar CSV:", error.message);
  }
}
const data = await getDataWithLimit(1);
generateCSV(data, "new1",["kepid", "kepoi_name"]);
