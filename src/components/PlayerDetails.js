import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { devUrl } from "../config/index";
import "./PlayerDetails.css";

function PlayerDetails(props) {
  const sid = props.match.params.sid;
  const [playerDetails, setPlayerDetails] = useState([]);

  useEffect(() => {
    // 查詢單一球員資料
    const handlePlayerDetails = async () => {
      const r = await axios.get(`http://localhost:9999/player-list/${sid}`);

      const output = r.data;
      console.log(output);
      setPlayerDetails(output);
    };
    handlePlayerDetails();
  }, []);
  console.log(playerDetails);

  return (
    <>
      {playerDetails.map((el) => {
        return (
          <>
            <div className="container">
              <div class="row">
                <div class="col-4">
                  <img
                    src={`${devUrl}/images/player.png`}
                    alt=""
                    className="player-img"
                  />
                </div>
                <div class="col-8">
                  <div className="intro">
                    <div>
                      <h1>{el.name}</h1>
                      <h4>{el.team_name}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Games</th>
                    <th>MPG</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FG%</th>
                    <th>FT%</th>
                    <th>3PA</th>
                    <th>3PM</th>
                    <th>3PT%</th>
                    <th>Points</th>
                    <th>ORebounds</th>
                    <th>DRebounds</th>
                    <th>Rebounds</th>
                    <th>Assists</th>
                    <th>Steals</th>
                    <th>Blocks</th>
                    <th>Turnovers</th>
                    <th>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{el.games_played}</th>
                    <th>{(el.minutes_per_game).slice(0,-3)}</th>
                    <th>{el.field_goals_attempted_per_game}</th>
                    <th>{el.field_goals_made_per_game}</th>
                    <th>{el.field_goal_percentage}</th>
                    <th>{el.free_throw_percentage}</th>
                    <th>{el.three_point_attempted_per_game}</th>
                    <th>{el.three_point_made_per_game}</th>
                    <th>{el.three_point_percentage}</th>
                    <th>{el.points_per_game}</th>
                    <th>{el.offensive_rebounds_per_game}</th>
                    <th>{el.defensive_rebounds_per_game}</th>
                    <th>{el.rebounds_per_game}</th>
                    <th>{el.assists_per_game}</th>
                    <th>{el.steals_per_game}</th>
                    <th>{el.blocks_per_game}</th>
                    <th>{el.turnovers_per_game}</th>
                    <th>{el.player_efficiency_rating}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </>
  );
}

export default withRouter(PlayerDetails);
