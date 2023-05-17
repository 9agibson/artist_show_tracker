import React, {useState} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import {FaMapMarkerAlt} from 'react-icons/fa'
import moment from "moment"
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapbox.css'



const Mapbox = () => {

  const mapboxToken = process.env.REACT_APP_MAPBOX
  const bandId = process.env.REACT_APP_BAND_ID
  
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [name, setName] = useState('')
  const shows = 'upcoming'
  const [alert, setAlert] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    zoom: 2,
    
  });
  const clearAlert = () => {
    setTimeout(() => {
      setAlert(false)
    },3000)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newName = name.split(' ').join('%20')
    
    setName(newName)
    
    const getPins = async () => {
      try {
        const res = await axios.get(`https://rest.bandsintown.com/artists/${name}/events?app_id=${bandId}&date=${shows}`)
        setPins(res.data)
        
      } catch (error) {
        console.log(error)
        setAlert(true)
        setPins([])
        clearAlert()
      }

    }
    getPins()
  }




  
  
  return (
    <section>
    <h2>Track Your Favorite Artist</h2>
    <form onSubmit={handleSubmit}>
      <label>Artist Name</label>
      <input placeholder='Enter Name' onChange={(e)=> setName(e.target.value)}></input>
      <button className='btn submit_btn' type="submit">Track</button>
    </form>
    <div className='container .map__container'>
      <div className='map'>
      
    <Map
        id="mymap"
      {...viewport}
      onMove={evt =>  setViewport(evt.viewState)}
      style={{width: "100%", height: "70vh", }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      mapboxAccessToken={mapboxToken}
      doubleClickZoom = {false}
      onViewportChange= {(viewport) => setViewport(viewport)}
      
      >
      {pins.map(p=>(
        <>
        <Marker  longitude={p.venue.longitude} latitude={p.venue.latitude} anchor="bottom" >
        <div className='icon' onClick={() => setCurrentPlaceId(p.id) }>
        <FaMapMarkerAlt  style={{color: 'var(--color-primary)', fontSize: 20, cursor: 'pointer'}}/>
        </div>
      </Marker>
      
      {currentPlaceId === p.id && (
      <Popup 
          key={p.id}
          longitude={p.venue.longitude} 
          latitude={p.venue.latitude}
          anchor="left"
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
        >
        <div className='popup'>
          <label>Venue</label>
          <h4 className='place'>{p.venue.name}</h4>
          <label>Location</label>
          <p>{p.venue.street_address}</p>
          <p>{p.venue.city + " " + p.venue.region}</p>
          <label>Date</label>
          <p>{moment(p.datetime).utc().format('MM-DD-YYYY')}</p>
        </div>
      </Popup>
      )} 
      
      </>
      ))} 
      </Map>
      {alert && (
        <div className='alert'>
            <h3>No Results Found, Ensure Spelling is Correct.</h3>
        </div>
       )} 
      <small className='copyright'>Copyright &copy; Aaron Gibson {(new Date().getFullYear())}</small>
      </div>
      </div>
      </section>
  )
}

export default Mapbox