import { useRef } from "react"

function Footer({messy, setMessy, success, setSuccess}){
  let preventHandler = useRef(0)

  const desc = <>
                  <span>NOT SOLVED</span>
                  <p>Swap the pieces until every rectangle gets a <span style={{color: 'green'}}>green</span> border</p>
                </>
  const shuffButton = <button onClick={shuffButtonHandler} disabled={messy? true: false}>SHUFFLE PIECES</button>

  const corrected = <section className="success">
                      <span id="success-ban">WELL DONE</span>
                      <button id="success-butt" onClick={tryButtonHandler}>Try again</button>    
                    </section>
           
  function shuffButtonHandler(event){
    if (preventHandler.current > 0){
      return
    }else{
      preventHandler.current++
    }
    function timer(b){
      if (b === 0){
        preventHandler.current = 0
        setMessy(true)
        // console.log(preventHandler.current)
        return
      }
      event.target.textContent = b
      setTimeout(timer, 1000, b-1)
    }
    timer(3)
  }

  function tryButtonHandler(){
    setSuccess(false)
  }

  return (
    <div className="foot">
      {success? corrected: messy? desc: shuffButton}
    </div>
  )
}
export default Footer;