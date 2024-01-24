import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Test from './components/Test';

const token = import.meta.env.VITE_INFLUXDB_TOKEN;
const url = import.meta.env.VITE_INFLUXDB_URL;
const org = 'RadiusLab';
const bucket = 'logylman';

const query = `
from(bucket: "${bucket}")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "logEntry")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
`;

function App() {
  // const [constructed, setConstructed] = useState([]);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  // async function queryData() {
  //   const headers = {
  //     Authorization: `Token ${token}`,
  //     'Content-Type': 'application/json',
  //   };

  //   const data = {
  //     query: query,
  //     type: 'flux',
  //   };

  //   try {
  //     const response = await axios.post(`${url}/api/v2/query?org=${org}`, data, { headers });
  //     const newData = response.data
  //       .split('\n')
  //       .map((line) => line.split(','))
  //       .filter((arr, index) => arr.length > 1 && index !== 0)
  //       .map((arr) => ({ data: arr[7], fid: arr[8], from: arr[9], tid: arr[10], to: arr[11].slice(0, -1) }));

  //     setConstructed(newData);
  //     setIsDataLoaded(true);
  //   } catch (error) {
  //     console.error('QUERY ERROR', error);
  //   }
  // }

  // useEffect(() => {
  //   queryData();
  // }, []);

  return (
    <div style={{ background: 'black' }}>
      <Test />
    </div>
  );
}

export default App;
