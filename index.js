import axios from "axios"
import { Parser } from "json2csv"
import fs from "node:fs"

const getData = async () => {
  try {
    const { data } = await axios.get(
      "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json"
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
const generateCSV = async (desc, filename) => {

  const data = desc ? await getDataByDescription(desc) : await getData();
  const fields = Object.keys(data[0]);
  const opts = { fields };
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    fs.writeFileSync(`${filename}.csv`, csv);
    console.log("✅ CSV gerado com sucesso!");
  } catch (error) {
    console.error(error.message);
  }
}

await generateCSV('CONFIRMED', 'data_by_description_confirmed');