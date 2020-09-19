import React from 'react';
import './Header.css';

function Header(props) {
    console.log("Header props = ", props);

    return (
        <div className="Header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="headerContent">
                <div className="Title">{props.title}</div>
                <input type="search" placeholder="Search" className="searchBar"/><i class="fa fa-search searchButton" onClick={props.search}></i>
            </div>
        </div>
    );
}

export default Header;
