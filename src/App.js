import React, { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import List from "./components/List";
import TrackInfo from "./components/TrackInfo";
import axios from "axios";
import Credentials from "./api/utils";

export default function App(){
  const spotify = Credentials(); //spotify credentials after registering the app - added and importing from a separate file ('Credentials')
  
  //state to keep track of change in data
  let [token, setToken] = useState('');
  let [categories, setCategories] = useState({selectedCategory: '', listOfAPICategories: []});
  let [playlists, setPlaylists] = useState({selectedPlaylists: '', listOfAPIPlaylists: []});
  let [tracks, setTracks] = useState({selectedTrack: '', listOfTracks: []});
  let [song, setSong] = useState(null);

  useEffect(() => {

    //request for access token
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientID + ':' + spotify.ClientSecret) //btoa for converting tring to base64 format
      },
      data:'grant_type=client_credentials',
      method: 'POST'
    }).then(tokenResponse => {
      setToken(tokenResponse.data.access_token)

    //get 20 (default) spotify playlist categories 
    axios(`https://api.spotify.com/v1/browse/categories?country=US`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      method: 'GET'
    }).then(categoryResponse => {
      setCategories({
        selectedCategory: categories.selectedCategory,
        listOfAPICategories: categoryResponse.data.categories.items
      })
    })

    })
  }, [categories.selectedCategory, playlists.selectedPlaylists, spotify.ClientID, spotify.ClientSecret]); //setting dependency to be the selected dropdown values 

  //function to set category when a different category selected
  const categoryChange = (category) => {
    setCategories({
      selectedCategory: category,
      listOfAPICategories: categories.listOfAPICategories
    })
    
    axios(`https://api.spotify.com/v1/browse/categories/${category}/playlists`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      method: 'GET'
    }).then(playListResponse => {
      // console.log(playListResponse)
      setPlaylists({
        selectedCategory: playlists.selectedPlaylists,
        listOfAPIPlaylists: playListResponse.data.playlists.items
      })
    })
    // console.log(category)
  }

   //function to set playlist when a different one selected from the dropdown
   const playlistChange = (playlist) => {
    setPlaylists({
      selectedPlaylists: playlist,
      listOfAPIPlaylists: playlists.listOfAPIPlaylists
    })
    // console.log('playlist - ', playlist)
  }

  const buttonClicked = (e) => {
    e.preventDefault();

    //fetch 10 tracks from the selected playlist
    axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylists}/tracks?limit=10`, {
      headers:{
        'Authorization': 'Bearer ' + token
      },
      method: 'GET'
    }).then(list => {
      // console.log('list - ', list.data.items)
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracks: list.data.items
      })
    })
  }

  const listClicked = (trackId) => {
    let allTracks = [...tracks.listOfTracks];
    let currentTrack = allTracks.filter(t => t.track.id === trackId);
    setSong(currentTrack[0].track.album);
  }

  return (
    <form onSubmit={buttonClicked}>
      <div className='app'>
        <Dropdown data={categories.listOfAPICategories} selectedVal={categories.selectedCategory} changed={categoryChange}/>
        <Dropdown data={playlists.listOfAPIPlaylists} selectedVal={playlists.selectedGenre} changed={ playlistChange }/>
        <button type='submit'>SEARCH</button>
        <List data={tracks.listOfTracks} listClicked={listClicked}/>
        { song && <TrackInfo {...song} /> }
      </div>
    </form>
  );
}
