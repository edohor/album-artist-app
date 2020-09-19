import React, { useState } from 'react';
import './Header.css';

function Header(props) {
    console.log("Header props = ", props);
    
    const [search, setSearch] = useState("");
    console.log("Header search = ", search);
    if (search==="") {
        props.search(search);
    }

    return (
        <div className="Header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="headerContent">
                <div className="Title">{props.title}</div>
                <input type="search" placeholder="Search" className="searchBar" onChange={event => setSearch(event.target.value)}/>
                <div onClick={() => props.search(search)}><i class="fa fa-search searchButton"></i></div>
            </div>
        </div>
    );
}

export default Header;
