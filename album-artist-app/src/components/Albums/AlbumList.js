import React, { useState } from 'react';
import AlbumDetail from './AlbumDetail';
import './AlbumList.css';

let fetchAlbums = true;

function AlbumList() {
    
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    if (fetchAlbums) {
        fetchAlbums = false;

        fetch('http://localhost:3004/albums')
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result = ", result);
                setAlbums(result);
            },
            (error) => {
                console.log("repos error = ", error);
            })  
            
        fetch('http://localhost:3004/artists')
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result = ", result);
                setArtists(result);
            },
            (error) => {
                console.log("repos error = ", error);
            })  
    }
    
    console.log("[getAllAlbums] albums = ", albums);
    console.log("[getAllAlbums] artists = ", artists);

    let albumDetail = [];
    if (albums.length > 0 && artists.length > 0) {
        for (let i = 0; i < albums.length; i++) {
            let artistName = "";
            for (let j = 0; j < artists.length; j++) {
                console.log("albums = ", albums[i].artistId);
                console.log("artists = ", artists[j].id);
                if (albums[i].artistId===artists[j].id) {
                    console.log("MATCH", artists[j].title);
                    artistName = artists[j].title;
                }
            }
            albumDetail.push(<AlbumDetail details={albums[i]} artist={artistName}/>);
        }
    }

    return (
        <div className="AlbumList">
            {albumDetail}
        </div>
    );
}

export default AlbumList;
