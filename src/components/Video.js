import { useEffect, useRef } from "react";

function Video({streamObj, setPlaying, setVideo}){
  const videoRef = useRef(null)
  
  useEffect(() => {
    setVideo(videoRef.current)
    videoRef.current.srcObject = streamObj
    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play()
      setPlaying(true)
    }
  }, [streamObj])

  return (
    <video ref={videoRef}></video>
  )
}

export default Video;