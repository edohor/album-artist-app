import React, { useState } from 'react';
import './AlbumList.css';

function AlbumDetail(props) {
    console.log("AlbumDetail props = ", props);
    
    let favorite = "MARK AS FAVORITE"
    if (props.details.favorite) {
        favorite = "Remove favorite";
    }

    return (
        <div className="AlbumDetail">
            <div className="imageDiv"><img src={props.details.imageUrl} className="image"/></div>
            <div className="basicInfo">
                <div className="title">{props.details.title}</div>
                <div className="artist">{props.details.artistId}</div>
            </div>
            <div className="releaseDate">{props.details.releaseDate}</div>
            <div className="price">{props.details.price}</div>
            <div className="favorite">{favorite}</div>
        </div>
    );
}

export default AlbumDetail;
