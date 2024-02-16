'use strict';
const url = 'https://api.theradius.xyz';
const token = 'rknLawvMCOcv3bbfzKkfPOmt6eL0YOez66m-qbJJvf4QTUxTSnxShSglgZM6xMeBRs-aAkF-7bmvGMMJWjUaxw==';
const org = 'RadiusLab';
const headers = {
  Authorization: `Token ${token}`,
  'Content-Type': 'application/json',
};
async function queryLogs(timestamp) {
  const query = `from(bucket: "sequencer") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> filter(fn: (r) => r["at"] > "${timestamp}") |> sort(columns: ["at"])`;
  const data = {
    query: query,
    type: 'flux',
    timestamp,
  };

  try {
    const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
    const result = response.data
      .split('\n')
      .slice(1, -2)
      .map((line) => {
        const fields = line.split(',');

        return {
          data: fields[6]?.replace(/"/g, ''),
          from: fields[10]?.replace(/"/g, ''),
          to: fields[11]?.replace(/"/g, '').replace('\r', ''),
          timestamp: fields[9],
        };
      });

    return [...result];
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
}

async function queryRoles() {
  const query = `from(bucket: "sequencer_table") |> range(start: -7d) |> filter(fn: (r) => r["_measurement"] == "log") |> group(columns: ["id"]) |> last()`;
  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    query: query,
    type: 'flux',
  };
  try {
    const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
    const result = response.data
      .split('\n')
      .slice(-3, -2)
      .reduce((acc, line) => {
        const fields = line.split(',');
        const key = fields[9]?.replace(/"/g, '').replace('\r', '');
        const value = fields[10]?.replace(/"/g, '').replace('\r', '');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});

    return { ...result };
  } catch (error) {
    console.error('QUERY ERROR', error);
  }
}

(async function init() {
  const { timestamp } = await queryRoles();
  const logs = await queryLogs(timestamp);
})();

const toInsert = `${logs.map(
  (log) => `<div class='row'>${log.map((entry) => `<span class="entry">${entry}</span>`)}</div>`
)}
`;
const inserter = () => {};
