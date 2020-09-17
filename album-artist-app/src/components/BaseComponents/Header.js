import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="Header">
            <div className="Title">Title</div>
            <input type="search" placeholder="Search" className="searchBar"/>
        </div>
    );
}

export default Header;
