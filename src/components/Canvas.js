import { useEffect, useRef, useState } from "react"

function Canvas({streamObj, isPlaying, videoObj, className, rowNum, colNum, dim, messy, meRowNum, meColNum, clickedCell, setClickedCell, swappedCell, setSwappedCell, setScore}){
  const [context, setContext] = useState()
  const [canvSize, setCanvSize] = useState(0)

  const canvRef = useRef(null)

  let rep = useRef(0)
  let isClicked = useRef(false)
  let isCorrect = useRef(false)
  let messedRow = useRef(0)
  let messedCol = useRef(0)

  useEffect(() => {
    setContext(canvRef.current.getContext('2d'))
    } 
  ,[])

  useEffect(()=>{
    setCanvSize(Number.parseInt(getComputedStyle(canvRef.current).width))
  }, [canvSize])
  
  useEffect(()=>{
    if (isClicked.current && swappedCell.length > 0){
      messedRow.current = swappedCell[0]
      messedCol.current = swappedCell[1]
      isClicked.current = false
      if (messedRow.current === rowNum && messedCol.current === colNum){
        isCorrect.current = true
        setScore(s => s + 1)
      }
      setSwappedCell([])
    }
  }, [swappedCell.length])

  function clickHandler(){
    if (!messy || isCorrect.current){
      return
    }
    if (clickedCell.length === 0){
      isClicked.current = true
      setClickedCell([messedRow.current, messedCol.current])
    }else{
      if (isClicked.current){
        isClicked.current = false
        setClickedCell([])
      }else{
        setSwappedCell([messedRow.current, messedCol.current])
        messedRow.current = clickedCell[0]
        messedCol.current = clickedCell[1]
        if (messedRow.current === rowNum && messedCol.current === colNum){
          isCorrect.current = true
          setScore(s => s + 1)
        }
        setClickedCell([])
        
      }
    }
  }

  let streamWidth;
  let streamHeight;
  let sourceX;
  let sourceY;
  let sourceWidth;
  let sourceHeight;

  if (meRowNum !== undefined && meColNum !== undefined){
    messedRow.current = meRowNum
    messedCol.current = meColNum
  }

  function showFrame(){
    clearTimeout(rep.current)
    context.drawImage(videoObj, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvSize, canvSize)
    rep.current = setTimeout(showFrame, 50)
  }

  if (isPlaying){
    streamWidth = streamObj.getVideoTracks()[0].getSettings().width
    streamHeight = streamObj.getVideoTracks()[0].getSettings().height

    if (messy){
      // console.log(`meRow:${messedRow.current} meCol:${messedCol.current} Row:${rowNum} Col:${colNum}`)
      sourceX = (streamWidth * messedCol.current) / dim
      sourceY = (streamHeight * messedRow.current) / dim
    }else{
      isCorrect.current = false
      sourceX = (streamWidth * colNum) / dim
      sourceY = (streamHeight * rowNum) / dim
    }
    sourceWidth = streamWidth / dim
    sourceHeight = streamHeight / dim
    showFrame() 
  }
  return (
    <canvas className={isCorrect.current? `${className} canv-correct`:isClicked.current? `${className} canv-clicked` :className} ref={canvRef} width={canvSize} height={canvSize} onClick={clickHandler}></canvas>
  )
}
export default Canvas;