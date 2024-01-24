import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
// import axios from 'axios';
// import Test from './components/Test';

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

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #090a0f;
  padding: ;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  gap: 42px;
`;

const Menu = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  max-width: 320px;
  gap: 16px;
  padding-bottom: 86px;
`;

const MenuItem = styled.p`
  color: #fff;
  font-family: Manrope;
  font-size: 16px;
  font-weight: 500;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
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
    <Root>
      <Navbar />
      <Content>
        <Menu>
          <MenuItem>Decentralized Shared Sequencing Layer</MenuItem>
          <MenuItem>MEV / Censorship Resistance</MenuItem>
          <MenuItem>Sequencer Liveness</MenuItem>
          <MenuItem>Multi-Rollup Sequencing </MenuItem>
        </Menu>
        <Main></Main>
      </Content>
    </Root>
  );
}

export default App;
