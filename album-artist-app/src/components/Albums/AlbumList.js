import React, { useState } from 'react';
import AlbumDetail from './AlbumDetail';
import './AlbumList.css';

let fetchAlbums = true;

function AlbumList() {
    
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [filteredArtistId, setFilteredArtistId] = useState(null);

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

    function filterAlbums(artistId) {
        console.log("[filterAlbums]", artistId);
        setFilteredArtistId(artistId);
    }
    
    // console.log("[getAllAlbums] albums = ", albums);
    // console.log("[getAllAlbums] artists = ", artists);

    let albumDetail = [];
    if (albums.length > 0 && artists.length > 0) {
        let artistName = "";
        let artistId = null;
        if (filteredArtistId!==null) {
            for (let i = 0; i < albums.length; i++) {
                if (albums[i].artistId===filteredArtistId) {
                    for (let j = 0; j < artists.length; j++) {
                        if (artists[j].id===filteredArtistId) {
                            artistName = artists[j].title;
                        }
                    }      
                    artistId = filteredArtistId;
                    albumDetail.push(<AlbumDetail details={albums[i]} artist={artistName} filterAlbums={() => filterAlbums(artistId)}/>);  
                }

                console.log("albumDetail = ", albumDetail);
            }
        } else {
            for (let i = 0; i < albums.length; i++) {
                for (let j = 0; j < artists.length; j++) {
                    if (albums[i].artistId===artists[j].id) {
                        artistName = artists[j].title;
                        artistId = artists[j].id;
                    }
                }
                albumDetail.push(<AlbumDetail details={albums[i]} artist={artistName} filterAlbums={filterAlbums}/>);
            }
        }
    }

    return (
        <div className="AlbumList">
            {albumDetail}
        </div>
    );
}

export default AlbumList;
