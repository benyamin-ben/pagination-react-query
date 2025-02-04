import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Comments from "./pages/Comments";
import SingleComment from "./pages/SingleComment";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 330000,// این زمانی اثر میکنه که ما به صورت شخصی هر کووری رو کش تایم ندیم بهش
      },
    },
  });


  return (
    <div style={{backgroundColor:'black'}}>
    <QueryClientProvider client={client}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/comments" element={<Comments/>} />
        <Route path="/comments/:id" element={<SingleComment />} />
      </Routes>
      <ReactQueryDevtools position="right" initialIsOpen={true} />
    </QueryClientProvider>
    </div>
  );
}

export default App;
