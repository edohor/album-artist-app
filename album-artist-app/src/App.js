import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from './components/BaseComponents/Header';
import AlbumList from './components/Albums/AlbumList';

function App() {

  const [title, setTitle] = useState("Album list");
  const [search, setSearch] = useState("");
  console.log("App search = ", search);

  let content = (({match, history}) =>
    <AlbumList 
                match={match} 
                history={history} 
                changeTitle={setTitle} 
                search={search}
                clearSearch={setSearch} />
  )

  return (
    <div className="App">
      <Header title={title} search={setSearch}/>
      
      <Switch>
        <Route exact path={"/artist/:artistId"} render={content} />
        <Route exact path={"/?limit=:limitNo"} render={content} />
        <Route exact path={"/"} render={content}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
