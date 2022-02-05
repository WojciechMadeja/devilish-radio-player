import "./App.css";
import { Howl, Howler } from "howler";
import { useEffect, useState } from "react";
import jsonp from "fetch-jsonp";
import OnAirInfo from "./OnAirInfo";
const sound = new Howl({
  src: ["http://icecast6.play.cz/casrock128.mp3"],
  html5: true,
  load: true
});

function App() {
  const [radioImage, setRadioImage] = useState();
  const [radioTitle, setRadioTitle] = useState();
  const [radioPlay, setRadioPlay] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    jsonp("http://api.play.cz/jsonp/getRadioInfo/casrock")
      .then((response) => response.json())
      .then((response) => {
        setRadioImage(response.data.basic.logo);
        setRadioTitle(response.data.basic.title);
      });
    Howler.volume(0.8);
  });
  return (
    <div className='App'>
      <img className='App-radio-logo' src={!radioImage ? process.env.PUBLIC_URL+"/images/radio-logo.png" : radioImage} alt='logo' />
      <h2>{radioTitle}</h2>
      <div className='App-radio-list'></div>
      <OnAirInfo />
      <div className="App-radio-play-panel">
        <button className={!isActive ? "App-play-button transform": "App-play-button transform-active" }
          onClick={() => {
            if (radioPlay === false){
              sound.play();
              setRadioPlay(true);
              setIsActive(true);
            }
            if (radioPlay === true) {
              sound.stop();
              setRadioPlay(false);
              setIsActive(false);
            }
          }}>
        </button>
      </div>

      
    </div>
  );
}

export default App;
