import { useEffect, useState } from "react";
import "./OnAirInfo.css";
// import Part from "./assets/Part";
function OnAirInfo() {
  const [image, setImage] = useState();
  const [artist, setArtist] = useState();
  const [song, setSong] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://onair.play.cz/json/casrock.json")
        .then((response) => response.json())
        .then((response) => {
          setImage(response.img);
          setArtist(response.artist);
          setSong(response.song);
          console.log("sec.");
        });
      console.log("This will run every second!");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className='OnAirInfo'>
        <img className='OnAirInfo-image' src={!image ?
          process.env.PUBLIC_URL+'/images/unknown-cover.png' : 
          (image.substring(0,27) === 'https://api.play.cz/static/') 
          ? process.env.PUBLIC_URL+'/images/unknown-cover.png' : image } alt='Artist' />
        <p className="OnAirInfo-artist">{!artist ? 'Unknown Artist' : (artist === 'Pravé Rockové Rádio') ? 'Unknown Artist' : artist}</p>
        <p>{!song ? 'Unknown Song' : song}</p>
      </div>
  );
}

export default OnAirInfo;
