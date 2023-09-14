import React, { createContext, useState, useEffect } from "react";

import { fetchDataFromApi } from '../Utils/api'

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectCatagories, setSelectCatagories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategoryData(selectCatagories);

    }, [selectCatagories]);

    const fetchSelectedCategoryData = (query)=>{
        
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({contents}) =>{
            // console.log(contents);
            setSearchResults(contents);
            setLoading(false)
        });


    };

    return (

        <Context.Provider value ={{
            loading,
            setLoading,
            searchResults,
            selectCatagories,
            setSelectCatagories,
            mobileMenu,
            setMobileMenu,
            


        }}>
            {props.children}
        </Context.Provider>

    )

}