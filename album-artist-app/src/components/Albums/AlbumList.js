import React, { useState } from 'react';
import AlbumDetail from './AlbumDetail';
import './AlbumList.css';

let fetchAlbums = true;

function AlbumList() {
    
    const [albums, setAlbums] = useState([]);

    if (fetchAlbums) {
        fetchAlbums = false;

        fetch('http://localhost:3004/albums')
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result = ", result);
                getAllAlbums(result);
            },
            (error) => {
                console.log("repos error = ", error);
            })  
    }

    function getAllAlbums(result) {
        console.log("[getAllAlbums] result = ", result);

        setAlbums(result);

    }
    
    console.log("[getAllAlbums] albums = ", albums);

    let albumDetail = [];
    if (albums.length > 0) {
        for (let i = 0; i < albums.length; i++) {
            albumDetail.push(<AlbumDetail details={albums[i]}/>);
        }
    }

    return (
        <div className="AlbumList">
            {albumDetail}
        </div>
    );
}

export default AlbumList;
