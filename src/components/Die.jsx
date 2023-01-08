import React from "react"

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <img src= {`/public/assetss/images/dice-${props.value}.svg`} alt="dice" className="die-img"/>
        </div>
    )
}

export default Die