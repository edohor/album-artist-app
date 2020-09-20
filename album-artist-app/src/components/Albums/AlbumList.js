import React, { useState, useEffect } from 'react';
import AlbumDetail from './AlbumDetail';
import './AlbumList.css';

let fetchAlbums = true;
let searchLimit = false;

function AlbumList(props) {
    console.log("AlbumList props = ", props);
    
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [filteredArtistId, setFilteredArtistId] = useState(null);
    const [search, setSearch] = useState(props.search);
    let albumDetail = [];

    if (props.search!=="" && props.search!==search) {
        setSearch(props.search);
    } else if (search!=="" && props.search==="") {
        setSearch("");
    }

    if (fetchAlbums) {
        fetchAlbums = false;
        fetchAllData();
    }

    function fetchAllData () {

        let fetchLimit = 10;
        if (window.location.search.includes("?limit=")) {
            console.log("AlbumList window.location.search = ", window.location.search);
            // console.log("AlbumList window.location.search.lastIndexOf("=") = ", window.location.search.lastIndexOf("="));
            let limitNo = parseInt(window.location.search.slice(window.location.search.lastIndexOf("=")+1));
            console.log("AlbumList window.location.search limitNo = ", limitNo);
            if (Number.isInteger(limitNo) && limitNo<10) {
                console.log("AlbumList window.location.search limitNo IS INTEGER <10");  
                fetchLimit = limitNo;
                searchLimit = true;
            }
        }
        console.log("AlbumList fetchAllData searchLimit = ", searchLimit);  

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

    function filterAlbums(artistId) {
        if (search!=="") {
            setSearch("");
            props.clearSearch("")
            props.history.push("/");
        }
        setFilteredArtistId(artistId);
    }

    function markFavorite(albumInfo) {
        console.log("markFavorite albumInfo = ", albumInfo);
        console.log("markFavorite albumInfo.id = ", albumInfo.id);
        console.log("markFavorite albumInfo.favorite = ", albumInfo.favorite);
        let favorite = albumInfo.favorite;
        console.log("markFavorite !favorite = ", !favorite);
        albumInfo.favorite = !favorite;
        console.log("markFavorite albumInfo after update = ", albumInfo);
        
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
                console.log("repos result = ", result);
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
        // console.log("searchData albumsFilter before = ", albumsFilter);
        // console.log("searchData artistsFilter before = ", artistsFilter);

        if (albumsFilter.length>0) {
            for (let i = 0; i < albumsFilter.length; i++) {
                // console.log("searchData albumsFilter[i] = ", albumsFilter[i]);
                for (let j = 0; j < artistsFilter.length; j++) {
                    // console.log("searchData artistsFilter[j] = ", artistsFilter[j]);
                    if (albumsFilter[i].artistId===artistsFilter[j].id) {
                        albumsFilter.splice(i, 1);
                        break;
                    }
                }
            }            
        }

        // console.log("searchData albumsFilter after = ", albumsFilter);
        // console.log("searchData artistsFilter after = ", artistsFilter);

        for (let i = 0; i < artistsFilter.length; i++) {
            getFilteredAlbums(parseInt(artistsFilter[i].id));
        }
        displaySearchedAlbums(albumsFilter);
        // console.log("searchData albumDetail = ", albumDetail);
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
    
    // console.log("[getAllAlbums] albums = ", albums);
    // console.log("[getAllAlbums] search = ", search);
    // console.log("[getAllAlbums] artists = ", artists);
    console.log("[getAllAlbums] window.location = ", window.location);
    console.log("[getAllAlbums] window.location.search = ", window.location.search);
    console.log("[getAllAlbums] /?search= = ", "/?search=" + props.search);
    console.log("[getAllAlbums] search = ", search);
    console.log("[getAllAlbums] props = ", props);

    if (search!=="") {
        console.log("SEARCH = ", search);
        searchData(search);
    } else {
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
            

            if (window.location.search.includes("?q=")) {
                let searchParam = window.location.search.slice(window.location.search.lastIndexOf("=")+1);    
                console.log("AlbumList window.location.search searchParam = ", searchParam);    
                searchData(searchParam);    
            } else {
                console.log("AlbumList searchLimit = ", searchLimit);    
                if (window.location.search==="" && searchLimit) {
                    console.log("AlbumList SEARCH ALL");    
                    searchLimit = false;
                    fetchAllData();
                }
                props.changeTitle("Album list");
                console.log("render all");
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
