import React from "react";
import axios from "axios";
import './Pagination.css'
function Pagination({
  totalPage,
  currPage,
  setCurrPage,
  setPlayerData,
  team,
  keyword,
  sort,
}) {
  let pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  //   處理分頁
  const handleChangePage = async (page, move) => {
    let newPage = page;
    if (move !== undefined) {
      newPage += move;
    }
    setCurrPage(newPage);

    const r = await axios.get(
      `http://localhost:9999/player-list?page=${newPage}&team=${team}&keyword=${keyword}&sortItem=${sort}`
    ); // 拿到promise物件
    const output = r.data;
    setPlayerData(output.limitData);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currPage <= 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => {
              handleChangePage(currPage, -1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumber.map((number) => {
          if (number < currPage - 2 || number > currPage + 2) {
            return;
          } else {
            return (
              <>
                <li
                  key={number}
                  className={`page-item ${currPage === number ? "active" : ""}`}
                >
                  <a
                    // href="#"
                    className="page-link"
                    onClick={() => handleChangePage(number)}
                  >
                    {number}
                  </a>
                </li>
              </>
            );
          }
        })}
        <li className={`page-item ${currPage >= totalPage ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => {
              handleChangePage(currPage, 1);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Pagination;
