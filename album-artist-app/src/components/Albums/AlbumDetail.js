import React, { useState } from 'react';
import './AlbumList.css';
import { Link } from 'react-router-dom';

function AlbumDetail(props) {
    console.log("AlbumDetail props = ", props);
    
    let favorite = "MARK AS FAVORITE"
    if (props.details.favorite) {
        favorite = "Remove favorite";
    }

    let d = new Date(props.details.releaseDate);
    let releaseYear = d.getFullYear();

    function markFavorite(albumId) {
        console.log("Button clicked", albumId)
    }

    return (
        <div className="AlbumDetail">
            <div className="imageDiv"><img src={props.details.imageUrl} className="image"/></div>
            <div className="basicInfo">
                <div className="title">{props.details.title}</div>
                <div className="artist">
                    <Link exact to={"/artist/" + props.details.artistId} className="grayText">{props.artist}</Link>
                </div>
            </div>
            <div className="releaseDate"><span className="grayText">Released:</span> {releaseYear}</div>
            <div className="price">{props.details.price}</div>
            <button onClick={() => markFavorite(props.details.id)} className="favoriteButton">{favorite}</button>
        </div>
    );
}

export default AlbumDetail;
