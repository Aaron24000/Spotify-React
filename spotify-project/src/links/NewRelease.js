import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Detail from '../components/Detail';
import Dropdown from '../components/Dropdown';
import ListBox from '../components/ListBox';
import { Credentials } from '../Credentials';

const NewRelease = () => {

  const spotify = Credentials();

  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/featured-playlists?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistResponse => {  
        console.log(playlistResponse);      
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });
      
    });

  }, [playlist.selectedPlaylist, spotify.ClientId, spotify.ClientSecret]);
  
  const playlistChanged = val => {
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });

    console.log(val);

    axios(`https://api.spotify.com/v1/playlists/${val}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(result => {
      console.log(result)
    })
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      console.log(tracksResponse)
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })
    });
  }

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);

    console.log(val);



  }



  return (
    <div className="container">
    <h2>Select a Genre...</h2>
      <form onSubmit={buttonClicked}>
      <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
      <div className="col-sm-6 row form-group px-0">
            <button type='submit' className="btn btn-success col-sm-12">
              Search
            </button>
          </div>
          <div className="row">
            <ListBox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} /> }
          </div> 
      </form>
    </div>
  );
};

export default NewRelease;
