import React from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from './components/BaseComponents/Header';
import AlbumList from './components/Albums/AlbumList';
import ArtistDetails from './components/ArtistDetails/ArtistDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={"/artist/:artistId"} render={({match, history}) => <AlbumList match={match} history={history}/>} />
        <Route exact path={"/"} render={({match, history}) => <AlbumList match={match} history={history}/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
