import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleComment.css";

function SingleComment() {
  const { id } = useParams();
  const qieryClient = useQueryClient();

  const { data, isLoading , isError } = useQuery(
    ["SingleCourse", id],
    (query) => {
      return axios(`https://jsonplaceholder.typicode.com/comments/${id}`).then(
        (res) => res.data
      );
    },
    {
      cacheTime: 10000000,
      staleTime: 14000,
    }
  );


  // const queryCli = qieryClient.getQueryData(["Courses"]); //  خب فرض کن که تی صفحه ها این کووری رو دریافت کردی قبلا و این اطلاعات با این کی ذخیره شدن

  if (isLoading) {
    return (
      <h1 className="alert isLoading alert-primary mt-[200px] text-center mt-4">
        Is Loading ...
      </h1>
    );
  }

  if (isError) {
    return <h1 className="error-page">Error - {error.message}</h1>;
  }


  return (
    <div className="singleCourse">
      <div className="container-details">
        <h1 className="person-name" >
         {data.name}
        </h1>
        <h2 className="singleCourse-email">email : {data.email}</h2>
      </div>
      <div className="containerDescIma">
        <div className="description" style={{ color: "white" }}>
          {data.body}
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
