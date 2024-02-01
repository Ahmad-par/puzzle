import { useEffect, useRef, useState } from 'react'
import CanvasRow from './CanvasRow'

function Container(props){
  
  const [clickedCell, setClickedCell] = useState([])
  const [swappedCell, setSwappedCell] = useState([])
  const [score, setScore] = useState(0)

  useEffect(()=>{
    if (score === props.dim * props.dim){
      selPairs.current = []
      setScore(0)
      props.setSuccess(true)
      props.setMessy(false)
    }
  },[score])

  let selPairs = useRef([])

  let rows = []

  for (let i=0; i<props.dim; i++){
    rows.push(<div className='row' key={i}><CanvasRow rowNum={i} {...props} selPairs={selPairs.current} setScore={setScore} 
              clickedCell={clickedCell} setClickedCell={setClickedCell} swappedCell={swappedCell} setSwappedCell={setSwappedCell}/></div>)
  }
  
  return(
    <div id="container">
      {rows}
      {/* <Canvas className="canv" width={200} height={200} id="c1" {...props}/>
      <Canvas className="canv" width={200} height={200} id="c2" {...props}/> */}
    </div>
  )
}

export default Container;