import { createPortal } from 'react-dom';
import closeImg from '../assets/close2.png'

function NotWork({setIsError}){

  function closeImgHandler(){
    setIsError(false)
  }

  return createPortal(
    <div className='error-dialog'>
      <img src={closeImg} alt='close button' onClick={closeImgHandler}/>
      <div className='error-desc'>
        <p>Sorry, an <span style={{color: 'red'}}>error</span> occured! To use this app please make sure:</p>
        <p>1- Your device has a camera.</p>
        <p>2- You allow this page to access your camera.</p>
      </div>
      
    </div>
  , document.getElementById('dialog'))
}
export default NotWork;