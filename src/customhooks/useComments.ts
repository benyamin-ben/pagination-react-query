import { useQuery } from "react-query";
import axios from "axios";

const useComments = (page) => {
  return useQuery(
    "Courses" ,
    () => {
      return axios(`https://jsonplaceholder.typicode.com/comments`).then((res) => res.data);
    },
    {
      cacheTime: 330000,
      staleTime: 40000,
      refetchOnMount: true, 
      refetchOnWindowFocus: true,
      keepPreviousData: true,

      select: (data) => {
        const count = page*10
        const pageComments =  data.slice(count-10 , count)
        return [pageComments , data.length , data]
      },
      onSuccess: () => {
        console.log("success fetching"); 
      },
      onError: () => {
        console.log("error in fetching ");
      }, 
    }
  );
};

export default useComments;
