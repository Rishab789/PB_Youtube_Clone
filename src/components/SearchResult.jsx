import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../Utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result , setResult] = useState();
  const {searchQuery} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h');
    fetchSearchResults();
   
    
 // eslint-disable-next-line
  },[searchQuery]) ;

    const fetchSearchResults = ()=>{
      debugger;
      setLoading(true);
      fetchDataFromApi(`search/?q=${searchQuery}`).then((res)=>{
        console.log("getting data")
        console.log(res);
        setResult(res?.contents);
        setLoading(false);
      });
    };

 



  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
     <LeftNav/>
     <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
      <div className="grid grid-cols-1 gap-2 p-5">
        {result?.map((item)=>{
          if(item?.type !== "video") return false;
          let video=item?.video;
          return (
            <SearchResultVideoCard key={video?.videoId} video={video}/>
          )
        })} </div>
     </div>
     
     
    </div>
  );
};

export default SearchResult