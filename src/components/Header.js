import cameraIcon from '../assets/icons8-switch-camera-48.png'

function Header({dim, setDim, setPlaying, setCamera, streamObj, messy, showFooter}){

  function buttonHandler(event){
    if (event.target.nodeName.toLowerCase() === 'button'){
      setDim(Number.parseInt(event.target.textContent[0]))
      setPlaying(false)
    }
    
  }
  function cameraIconHandler(event){
    if (event.target.tagName.toLowerCase() !== 'img'){
      return
    }
    setPlaying(false)
    if (streamObj){
      streamObj.getVideoTracks()[0].stop()
    } 
    setCamera(camState => !camState)
  }
  return (
    <div className="head">
      <div className="left-buts">
        <button className="home-but" onClick={()=> window.location.reload()}>Home</button>
      </div>
      <div className='switch-icon'>
        <button title='switch camera' disabled={messy? true: showFooter? false: true}  onClick={cameraIconHandler}><img src={cameraIcon} alt='switch camera'/></button>
      </div>
      <div onClick={buttonHandler} className="right-buts">
        <button className={dim === 4? 'active dim-set': 'dim-set'} disabled={messy? true: showFooter? false: true}>4x4</button>
        <button className={dim === 5? 'active dim-set': 'dim-set'} disabled={messy? true: showFooter? false: true}>5x5</button>
        <button className={dim === 6? 'active dim-set': 'dim-set'} disabled={messy? true: showFooter? false: true}>6x6</button>
      </div>
    </div>
  )
}
export default Header;