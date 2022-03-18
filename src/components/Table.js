import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import { TiArrowUnsorted } from "react-icons/ti";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import Pagination from "./Pagination";
import BeatLoader from "react-spinners/BeatLoader";
import Chart from "./Chart";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { Link } from "react-router-dom";

function Table() {
  const [loading, setLoading] = useState(true);

  // 資料庫回傳的原始資料
  const [allData, setAllData] = useState([]);
  // 會顯示在前端15列的資料
  const [playerData, setPlayerData] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [team, setTeam] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [sortBy, setSortBy] = useState("DESC");

  const [modalShow, setModalShow] = useState(false);

  const column = [
    { json_name: "games_played", interface_name: "Games" },
    { json_name: "points_per_game", interface_name: "Points" },
    { json_name: "rebounds_per_game", interface_name: "Rebound" },
    { json_name: "assists_per_game", interface_name: "Assists" },
    { json_name: "steals_per_game", interface_name: "Steals" },
    { json_name: "blocks_per_game", interface_name: "Blocks" },
  ];
  // === 載入頁面時獲取資料
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1400);
    const getData = async () => {
      const r = await axios.get("http://localhost:9999/player-list"); // 拿到promise物件
      const output = await r.data;
      // 分頁
      setCurrPage(1);

      // playerList
      setAllData(output.allData);
      setPlayerData(output.limitData);

      // teamList
      let list = [];
      output.allData.forEach((el) => {
        if (list.indexOf(el.team_name) !== -1) {
          return;
        } else {
          list.push(el.team_name);
        }
      });
      setTeamList(list);

      // totalPage
      setTotalPage(output.totalPages);
    };
    getData();
  }, []);

  // === team & keyword Search
  const handleSearch = async () => {
    setLoading(true);
    const team = document.querySelector("#team").value;
    const keyword = document.querySelector("#keyword").value;
    const r = await axios.get(
      `http://localhost:9999/player-list?team=${team}&keyword=${keyword}&sortItem=${sort}`
    );
    const output = r.data;
    setCurrPage(1);
    setTeam(team);
    setKeyword(keyword);
    // setAllData(output.allData);
    setPlayerData(output.limitData);
    setTotalPage(output.totalPages);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // === 表格的排序
  const handleSort = async (sortItem) => {
    console.log(sort);
    let newSortBy;

    // 如果排序的項目不相同，則重新設定排序的項目
    if (sortItem !== sort) {
      setSort(sortItem);
      newSortBy = "DESC";
      setSortBy(newSortBy);
    } else {
      // 升冪 or 降冪 判斷
      if (sortBy === "DESC") {
        newSortBy = "ASC";
        setSortBy(newSortBy);
      } else {
        newSortBy = "DESC";
        setSortBy(newSortBy);
      }
    }

    const r = await axios.get(
      `http://localhost:9999/player-list?team=${team}&keyword=${keyword}&sortItem=${sortItem}&sortBy=${newSortBy}`
    );

    const output = r.data;
    setCurrPage(1);
    setPlayerData(output.limitData);
    setTotalPage(output.totalPages);
  };

  return (
    <div className="container">
      {/* search-bar */}
      <div className="search-bar">
        <div className="row">
          {/* --- team-select --- */}
          <div className="col-6 align-items-center">
            <select name="" id="team" className="select-team">
              <option value="">All</option>;
              {teamList.map((el) => {
                return (
                  <>
                    <option value={el}>{el}</option>;
                  </>
                );
              })}
            </select>

            {/* keyword */}
            <input type="text" id="keyword" placeholder=" Search player" />

            {/* Search-button */}
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>

          {/* --- chart --- */}
          <div className="col-2 justify-content-end d-flex"></div>

          {/* --- 分頁功能 --- */}
          <div className="col-4 d-flex">
            <Button
              className="chart-btn"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              Show Chart
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <div className="page-btn">
              <Pagination
                totalPage={totalPage}
                currPage={currPage}
                setCurrPage={setCurrPage}
                setPlayerData={setPlayerData}
                team={team}
                keyword={keyword}
                sort={sort}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-7"></div>
        <div className="col-5">
          <div className="d-flex align-items-center"></div>
        </div>
      </div>
      {/* player-list */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th className='special-width'>Team</th>
            <th className='special-width'>Name</th>
            {column.map((th, index) => {
              return (
                <>
                  <th
                    className="column-sort"
                    onClick={(e) => {
                      handleSort(th.json_name);

                      // 表註所選取的排序欄位
                      const allSortColumn = document.querySelectorAll("th");
                      for (let i = 0; i < allSortColumn.length; i++) {
                        allSortColumn[i].classList.remove("active");
                      }
                      e.currentTarget.classList.add("active");
                    }}
                  >
                    {th.interface_name}
                    <span>
                      {sort === th.json_name ? (
                        sortBy === "DESC" ? (
                          <CgArrowLongUp />
                        ) : (
                          <CgArrowLongDown />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                </>
              );
            })}
            <th>Details</th>
          </tr>
        </thead>
        {/* player-list */}
        <tbody>
          {!loading &&
            playerData &&
            playerData.map((el) => {
              return (
                <>
                  <tr>
                    <td>{`${el.team_name}(${el.team_acronym})`}</td>
                    <td>{el.name}</td>
                    <td>{el.games_played}</td>
                    <td>{el.points_per_game}</td>
                    <td>{el.rebounds_per_game}</td>
                    <td>{el.assists_per_game}</td>
                    <td>{el.steals_per_game}</td>
                    <td>{el.blocks_per_game}</td>
                    <td>
                      <div className="text-center">
                        <Link to={`/player-details/${el.sid}`} key={el.sid}>
                          <FcSearch />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      {loading && (
        <div className="text-center p-5">
          <BeatLoader />
        </div>
      )}
    </div>
  );
}

export default Table;
