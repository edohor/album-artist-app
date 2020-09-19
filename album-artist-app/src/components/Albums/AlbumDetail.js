import React, { useState } from 'react';
import './AlbumList.css';
import { Link } from 'react-router-dom';

function AlbumDetail(props) {
    // console.log("AlbumDetail props = ", props);
    
    let favoriteText = "MARK AS FAVORITE"
    if (props.details.favorite) {
        favoriteText = "Remove favorite";
    }

    let d = new Date(props.details.releaseDate);
    let releaseYear = d.getFullYear();

    function markFavorite(id) {
        console.log("Button clicked", id);
        props.markFavorite(props.details);
    }

    function filterAlbums(id) {
        props.filterAlbums(id);
    }

    return (
        <div className="AlbumDetail">
            <div className="imageDiv"><img src={props.details.imageUrl} className="image"/></div>
            <div className="basicInfo">
                <div className="title">{props.details.title}</div>
                <div className="artist">
                    <Link exact to={"/artist/" + props.details.artistId} className="grayText" onClick={() => filterAlbums(props.details.artistId)}>{props.artist}</Link>
                </div>
            </div>
            <div className="releaseDate bold"><span className="grayText normal">Released:</span> <span classname="bold">{releaseYear}</span></div>
            <div className="price bold">{props.details.price}</div>
            <button onClick={() => markFavorite(props.details.id)} className={props.details.favorite ? "removeFavoriteButton" : "markFavoriteButton"}>{favoriteText}</button>
        </div>
    );
}

export default AlbumDetail;
