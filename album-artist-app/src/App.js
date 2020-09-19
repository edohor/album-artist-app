import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from './components/BaseComponents/Header';
import AlbumList from './components/Albums/AlbumList';

function App() {

  const [title, setTitle] = useState("Album list");
  const [search, setSearch] = useState("");
  console.log("App search = ", search);

  return (
    <div className="App">
      <Header title={title} search={setSearch}/>
      <Switch>
        <Route exact path={"/artist/:artistId"} render={({match, history}) => 
            <AlbumList 
                match={match} 
                history={history} 
                changeTitle={setTitle} 
                search={search}
                clearSearch={setSearch}/>} />
        <Route exact path={"/"} render={({match, history}) => 
            <AlbumList 
                match={match} 
                history={history} 
                changeTitle={setTitle} 
                search={search}
                clearSearch={setSearch}/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
