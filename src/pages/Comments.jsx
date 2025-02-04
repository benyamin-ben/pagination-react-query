import Course from "../components/Comment";
import "./comments.css";
import useComments from "../customhooks/useComments";
import { useQueryClient } from "react-query";
import { useState, useEffect } from "react";

function Comments() {
  const [searchValue, setsearchValue] = useState(() => { 
    return localStorage.getItem("search") || ''
  });
  const [searchedCourse, setsearchedCourse] = useState([]);
  const [page, setPage] = useState(() => {
    return Number(localStorage.getItem("page")) || 1;
  });

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("search", searchValue);
  }, [page , searchValue] );

  const lowerCase = (title) => {
    return title.toLowerCase();
  };

  const { data, isLoading, error, isError, isFetching, refetch } =
    useComments(page);



  const searching = (resInfo) => {
    const newD = resInfo.filter((item) =>
      item.name.toLowerCase().includes(lowerCase(searchValue))
    );
    return newD;
  };

  const generatePageNum = () => {
    if (data && page > 2) {
      const aa = Array.from(
        { length: Math.ceil(data[1] / 10) },
        (_, i) => i + 1
      );

      const heo = aa.slice(page - 3, page + 2);
      return heo;
    } else if (data && page === 2) {
      return [1, 2, 3, 4];
    } else if (data && page === 1) {
      return [1, 2, 3];
    }
  };




  if (isLoading) {
    return <h1 className="isloading-comments">Is Loading ...</h1>;
  }

  if (isError) {
    return <h1 className="error-page">Error - {error.message}</h1>;
  }

  return (
    <>
      <div className="conAll">
        <div className="mt-4  inputContainer text-center">
          <div>
            <svg
              style={{ width: "30px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="size-5 w-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
            value={searchValue}
            className="searchInput"
          />
        </div>
      </div>

      <div className="refetch-con">
        <button className="refetch" onClick={refetch}>
          refetch
        </button>
      </div>

      <div className="container mt-3">
        <div className="row" style={{ display: "flex" }}>
          {searchValue.length > 0 &&
            searching(data[2])?.map((item) => (
              <Course key={item.id} {...item} />
            ))}
          {searchValue.length === 0 &&
            data[0]?.map((item) => <Course key={item.id} {...item} />)}
        </div>
      </div>
      <div className="searchResult">
        {searchValue.length > 0 && searching(data[2]).length === 0
          ? "جستوجوی شما نتیجه ای نداشت "
          : ""}
      </div>

      {searchValue.length === 0 && (
        <div className="page-con">
          {generatePageNum().map((item) => (
            <div
              onClick={() => {
                setPage(item);
              }}
              className={item === page ? "number activepage" : "number"}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {/* prev next buttons */}
      <div className="buttons">
        {page > 1 && searchValue.length === 0 && (
          <button
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            className="pagination-bottom"
          >
            prev
          </button>
        )}

        {page < Math.ceil(data[1] / 10) && searchValue.length === 0 && (
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className="pagination-bottom"
          >
            next
          </button>
        )}
      </div>
    </>
  );
}
export default Comments;
