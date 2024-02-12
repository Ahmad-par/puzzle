
import './App.css';
import Video from './components/Video'
import Container from './components/Container'
import Header from './components/Header'
import NotWork from './components/NotWork'
import Footer from './components/Footer'
import { useEffect, useState } from 'react';

function App() {
  const [stream, setStream] = useState()
  const [videoObj, setVideoObj] = useState(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [dimension, setDimension] = useState(4)
  const [isFront, setIsFront] = useState(true)
  const [isError, setIsError] = useState(false)
  const [messy, setMessy] = useState(false)
  const [showFooter, setShowFooter] = useState(true)
  const [success, setSuccess] = useState(false)
  
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({audio: false, video: { frameRate: { ideal: 20 }, width: {ideal: 1024}, 
      height: {ideal: 780}, facingMode: isFront? 'user': 'environment' }}).then(res=> {
          setStream(res)
      }).catch(err => {
        console.log('Not Working...')
        setIsError(true)
        setShowFooter(false)
      })
  }, [dimension, isFront])

  return (
    <>
      {isError? <NotWork setIsError={setIsError}/>: undefined}
      <Header dim={dimension} setDim={setDimension} setPlaying={setIsVideoPlaying} setCamera={setIsFront} streamObj={stream} messy={messy} showFooter={showFooter}/>
      <Video streamObj={stream} setPlaying={setIsVideoPlaying} setVideo={setVideoObj}/>
      <Container streamObj={stream} isPlaying={isVideoPlaying} videoObj={videoObj} dim={dimension} messy={messy} setMessy={setMessy} setSuccess={setSuccess}/>
      {showFooter && <Footer messy={messy} setMessy={setMessy} success={success} setSuccess={setSuccess}/>}
    </>
  );
}

export default App;
