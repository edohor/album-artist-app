import React, { useState } from 'react';
import './Header.css';
import { Link, useHistory  } from 'react-router-dom';

function Header(props) {
    console.log("Header props = ", props);
    // let history = useHistory();
    
    const [search, setSearch] = useState("");
    console.log("Header search = ", search);
    if (search==="") {
        props.search(search);
    }

    const searchOnEnterPressed = (e) => {
        if (e.key === 'Enter') {
            props.search(search);
        }
    }

    const searchContent = () => {
        props.search(search)
        // history.push("/?search=" + search);
    }

    return (
        <div className="Header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="headerContent">
                <Link exact to={"/"} 
                    className="Title" 
                    onClick={() => setSearch("")}>{props.title}</Link>
                <input type="search" 
                    placeholder="Search" 
                    className="searchBar" 
                    onChange={event => setSearch(event.target.value)} 
                    onKeyDown={searchOnEnterPressed} 
                    value={search}/>
                <div onClick={searchContent}><i class="fa fa-search searchButton"></i></div>
            </div>
        </div>
    );
}

export default Header;
