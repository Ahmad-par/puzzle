import Canvas from './Canvas'

function CavasRow(props){
  let canvs = []

  for (let i=0; i<props.dim; i++){
    let sRow, sCol
    if(props.messy && props.selPairs.length < (props.dim*props.dim)){
      let circling = true
      while(circling){
        sRow = Math.floor(Math.random()*props.dim)
        sCol = Math.floor(Math.random()*props.dim)
        if (sRow !== props.rowNum || sCol !== i){
          if (!props.selPairs.some(p => p[0] === sRow && p[1] === sCol)){
            props.selPairs.push([sRow, sCol])
            circling = false
          }
        }
      }
    }
    canvs.push(<Canvas key={i} className='canv' colNum={i} {...props} meRowNum={sRow} meColNum={sCol} />)
  }
  
  return (
    <>
      {canvs}
    </>
  )
}
export default CavasRow;