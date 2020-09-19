import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from './components/BaseComponents/Header';
import AlbumList from './components/Albums/AlbumList';

function App() {

  const [title, setTitle] = useState("Album list");

  return (
    <div className="App">
      <Header title={title}/>
      <Switch>
        <Route exact path={"/artist/:artistId"} render={({match, history}) => <AlbumList match={match} history={history} changeTitle={setTitle}/>} />
        <Route exact path={"/"} render={({match, history}) => <AlbumList match={match} history={history} changeTitle={setTitle}/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
