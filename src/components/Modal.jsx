import React from 'react'
import './Modal.css'

function Modal(props) {
  const finalTime = props.time
  return (
    <div className='modal'>
        <div className='modal-text'>
            <h1 className='congrats-text'>Congratulations, you've completed the dices!</h1>
            <p>You have completed the dices with <b>{props.attempt}</b> rolls and within <b>{finalTime}</b> seconds.</p>
        </div>
        <button className='new-game-btn' onClick={props.newGame}>New Game</button>
    </div>
  )
}

export default Modal
