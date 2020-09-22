import React, { useState, useEffect } from 'react';
import AlbumDetail from './AlbumDetail';
import './AlbumList.css';

let fetchAlbums = true;
let searchLimit = false;

function AlbumList(props) {
    
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [filteredArtistId, setFilteredArtistId] = useState(null);
    const [search, setSearch] = useState(props.search);
    let albumDetail = [];
    let fetchLimit = 10;

    if (props.search!=="" && props.search!==search) {
        setSearch(props.search);
    } else if (search!=="" && props.search==="") {
        setSearch("");
    }

    if (fetchAlbums) {
        fetchAlbums = false;
        checkLimit();
    }

    function fetchAllData () {

        if (searchLimit) {
            fetch('http://localhost:3004/albums?_limit='+fetchLimit)
            .then(res => res.json())
            .then(
                (result) => {
                    setAlbums(result);
                },
                (error) => {
                    console.log("repos error = ", error);
                })             
        } else {
            fetch('http://localhost:3004/albums')
            .then(res => res.json())
            .then(
                (result) => {
                    setAlbums(result);
                },
                (error) => {
                    console.log("repos error = ", error);
                }) 
        }
 
            
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

    function checkLimit() {
        if (window.location.search.includes("?limit=")) {
            fetchLimit = parseInt(window.location.search.slice(window.location.search.lastIndexOf("=")+1));
            if (Number.isInteger(fetchLimit) && fetchLimit<10) {
                fetchLimit = fetchLimit;
                searchLimit = true;
            } else {
                fetchLimit = 10;
                searchLimit = false;
            }
        }
        fetchAllData();
    }

    function filterAlbums(artistId) {
        if (search!=="") {
            setSearch("");
            props.clearSearch("")
            props.history.push("/");
        }
        setFilteredArtistId(artistId);
    }

    function markFavorite(albumInfo) {
        let favorite = albumInfo.favorite;
        albumInfo.favorite = !favorite;
        
        // PUT and PATCH methods not updating data correctly
        fetch('http://localhost:3004/albums/' + albumInfo.id, 
        {method: "PATCH",
        body: JSON.stringify(
            {
                favorite: !favorite
            }
            ),
        headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(res => res.json())
        .then(
            (result) => {
                fetchAllData();
            },
            (error) => {
                console.log("repos error = ", error);
            })  
    }

    function searchData(searchInput){
        const excludeColumns = ["id", "artistId", "favorite", "imageUrl", "price", "releaseDate"];
        let albumsFilter = albums.filter(item => {
            return Object.keys(item).some(key =>
              excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(searchInput.toLowerCase()));})
        let artistsFilter = artists.filter(item => {
            return Object.keys(item).some(key =>
            excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(searchInput.toLowerCase()));})

        if (albumsFilter.length>0) {
            for (let i = 0; i < albumsFilter.length; i++) {
                for (let j = 0; j < artistsFilter.length; j++) {
                    if (albumsFilter[i].artistId===artistsFilter[j].id) {
                        albumsFilter.splice(i, 1);
                        break;
                    }
                }
            }            
        }

        for (let i = 0; i < artistsFilter.length; i++) {
            getFilteredAlbums(parseInt(artistsFilter[i].id));
        }
        displaySearchedAlbums(albumsFilter);
        if (albumDetail.length===0) {
            albumDetail = <div className="noResults">No results found</div>
        }

        props.changeTitle("Search results");
    }

    function displaySearchedAlbums(searchedAlbums){
        if (searchedAlbums.length > 0 && artists.length > 0) {
            let artistId = null;
            let artistName = "";
            for (let i = 0; i < searchedAlbums.length; i++) {
                for (let j = 0; j < artists.length; j++) {
                    if (searchedAlbums[i].artistId===artists[j].id) {
                        artistName = artists[j].title;
                        artistId = artists[j].id;
                    }
                }
                albumDetail.push(<AlbumDetail 
                                    details={searchedAlbums[i]} 
                                    artist={artistName} 
                                    filterAlbums={filterAlbums} 
                                    markFavorite={markFavorite}/>);
            }
        }
    }

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
                props.changeTitle(artistName);
                
                artistIdFiltered = artistId;
                albumDetail.push(<AlbumDetail 
                                    details={albums[i]} 
                                    artist={artistName} 
                                    filterAlbums={() => filterAlbums(artistIdFiltered)} 
                                    markFavorite={() => markFavorite(albums[i])}/>);  
            }
        }
    }

    if (search!=="") {
        searchData(search);
    } else {
        if (window.location.pathname!=="/") {
            let idFromUrl = window.location.pathname.split('/');  
            if (filteredArtistId===null) {          
                setFilteredArtistId(parseInt(idFromUrl[2]));
            }
            getFilteredAlbums(parseInt(idFromUrl[2]));
        } else if(filteredArtistId!==null && window.location.pathname!=="/") {
            getFilteredAlbums(filteredArtistId);
        } else {
            

            if (window.location.search.includes("?q=")) {
                let searchParam = window.location.search.slice(window.location.search.lastIndexOf("=")+1);  
                searchData(searchParam);    
            } else {
                if (window.location.search==="" && searchLimit) {
                    searchLimit = false;
                    fetchAllData();
                } else if (window.location.search.includes("?limit=") && !searchLimit) {
                    checkLimit();
                }
                props.changeTitle("Album list");
                if (albums.length > 0 && artists.length > 0) {
                    let artistName = "";
                    for (let i = 0; i < albums.length; i++) {
                        for (let j = 0; j < artists.length; j++) {
                            if (albums[i].artistId===artists[j].id) {
                                artistName = artists[j].title;
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

        }
    }


    return (
        <div className="AlbumList">
            {albumDetail}
        </div>
    );
}

export default AlbumList;
