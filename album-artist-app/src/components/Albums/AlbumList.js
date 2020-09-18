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
                setAlbums(result);
            },
            (error) => {
                console.log("repos error = ", error);
            })  
            
        fetch('http://localhost:3004/artists')
        .then(res => res.json())
        .then(
            (result) => {
                setArtists(result);
            },
            (error) => {
                console.log("repos error = ", error);
            })  

    }

    function filterAlbums(artistId) {
        setFilteredArtistId(artistId);
    }

    function markFavorite(albumInfo) {
        console.log("markFavorite albumInfo = ", albumInfo);
        console.log("markFavorite albumInfo.id = ", albumInfo.id);
        console.log("markFavorite albumInfo.favorite = ", albumInfo.favorite);
        let favorite = albumInfo.favorite;
        console.log("markFavorite !favorite = ", !favorite);
        
        fetch('http://localhost:3004/albums/' + albumInfo.id, 
        {method: "PATCH",
        body: JSON.stringify(
            {
                favorite: !favorite
            }
            )})
        .then(res => res.json())
        .then(
            (result) => {
                console.log("repos result = ", result);
                fetchAlbums = true;
            },
            (error) => {
                console.log("repos error = ", error);
            })  
    }

    let albumDetail = [];
    function getFilteredAlbums(artistId) {
        let artistName = "";
        let artistIdFiltered = null;
        
        for (let i = 0; i < albums.length; i++) {
            if (albums[i].artistId===artistId) {
                for (let j = 0; j < artists.length; j++) {
                    if (artists[j].id===artistId) {
                        artistName = artists[j].title;
                    }
                }      
                artistIdFiltered = artistId;
                albumDetail.push(<AlbumDetail 
                                    details={albums[i]} 
                                    artist={artistName} 
                                    filterAlbums={() => filterAlbums(artistIdFiltered)} 
                                    markFavorite={() => markFavorite(albums[i])}/>);  
            }
        }
    }
    
    // console.log("[getAllAlbums] albums = ", albums);
    // console.log("[getAllAlbums] artists = ", artists);

    if (window.location.pathname!=="/") {
        console.log("render filtered by pathname");
        let idFromUrl = window.location.pathname.split('/');  
        if (filteredArtistId===null) {          
            setFilteredArtistId(parseInt(idFromUrl[2]));
        }
        getFilteredAlbums(parseInt(idFromUrl[2]));
    } else if(filteredArtistId!==null && window.location.pathname!=="/") {
        console.log("render filtered by filteredArtistId");
        getFilteredAlbums(filteredArtistId);
    } else {
        console.log("render all");
        if (albums.length > 0 && artists.length > 0) {
            let artistId = null;
            let artistName = "";
            for (let i = 0; i < albums.length; i++) {
                for (let j = 0; j < artists.length; j++) {
                    if (albums[i].artistId===artists[j].id) {
                        artistName = artists[j].title;
                        artistId = artists[j].id;
                    }
                }
                albumDetail.push(<AlbumDetail 
                                    details={albums[i]} 
                                    artist={artistName} 
                                    filterAlbums={filterAlbums} 
                                    markFavorite={markFavorite}/>);
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
