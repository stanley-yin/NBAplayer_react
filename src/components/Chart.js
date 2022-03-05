import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

function Chart() {
  const [teamSize, setTeamSize] = useState([]);
  useEffect(() => {
    const getTeam = async () => {
      const r = await axios.get("http://localhost:9999/team-chart");
      const output = r.data; // 各組的人數

      // 人數相同的分到一組
      let list = [];
      let obj = {};
      // console.log(output)
      output.forEach((element) => {
        if (!obj[element.teamSize]) {
          obj[element.teamSize] = [element.team_acronym];
        } else {
          obj[element.teamSize].push(element.team_acronym);
        }
      });
      console.log(obj);
      setTeamSize(obj);
    };

    getTeam();
  }, []);

  const data01 = [
    { name: `${teamSize[13]}`, value: 13 },
    { name: `${teamSize[14]}`, value: 14 },
    { name: `${teamSize[15]}`, value: 15 },
  ];

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </>
  );
}

export default Chart;
