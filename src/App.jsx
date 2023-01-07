import React from "react"
import {useState, useEffect} from "react"
import Die from "./components/Die"
import Modal from "./components/Modal"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import './App.css'

function App() {

    const [dice, setDice] = useState(allNewDice()) 
    const [tenzies, setTenzies] = useState(false)
    const [attempt, setAttempts] = useState(0)
    const [time, setTime] = useState(0)
    const [isGameStarted, setIsGameStarted] = useState(false)


    useEffect(() => { //useEffect for rendering the timer
    let interval
    tenzies ? setIsGameStarted(false) : isGameStarted  // whill check if the game is done,
    //if the game is done, then it will turn off the timer
            
    if(isGameStarted){ //condition if when to start the timer  (isGameStarted === true)
            interval = setInterval(() => { // every 1000 ms or 1 sec the state will increment
            setTime(prevTime => prevTime + 1)
            }, 1000)

    } return () => { // will return if the state isGameStarted become false
        if(interval){
            clearInterval(interval) //this will stop the counter of time
        }
    }
    }, [isGameStarted, time])
  
    useEffect(() => { // this useEffect will render when all of the dices are clicked and has the same values
        const allHeld = dice.every(die => die.isHeld)// this will store the every die that is true
        const firstValue = dice[0].value // will store the first value of the die 
        const allSameValue = dice.every(die => die.value === firstValue) // this line will now compare the first value that has been stored and compare it in each die if it has the value
        if (allHeld && allSameValue) { // lastly will check if both allHeld and allSameValue is true, then it will set the tenzies's state as true
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {  // this function will return and generate the randomized value of each dices and has an attribute of isHeld and unique ids from nanoid() method
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() { //this function will push the generated dice into an array and this will be passed into dice state
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function newGame(){ //this function will set all the states into their default values when the new game button is clicked
        setTime(0)
        setAttempts(0)
        setTenzies(false)
        setDice(oldDice=> oldDice.map(die =>{ //this map will map all of the elements in the array and will turn it into false in order to reset the game
            return {...die, isHeld: !die.isHeld}, generateNewDie()
        }))
    }
    
    function rollDice() { // this function will just roll the dice
        setIsGameStarted(true) // it will set the state of isGameStarted into true in order to start the timer that i've coded above
        setAttempts( count => count + 1) // each roll will track the attempts or number of rolls
        setDice(oldDice => oldDice.map(die => { // this state will map every die and check if it isHeld, if it isHeld === true then it won't change its value
            return die.isHeld ?               // else the die that isHeld === false will generate a new value
                die :
                generateNewDie()
        }))
    }
    
    function holdDice(id) {  // this functions has a parameter of id the came from the nanoid() method that was set in die's attribute
        setIsGameStarted(true)  // it will set the state of isGameStarted into true in order to start the timer that i've coded above
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?  // this will check the id of the die that was clicked if it is equal to the present id of the die in the array
                {...die, isHeld: !die.isHeld} : // if the condition is true, isHeld attribute of the die that was clicked will reverse the boolean value 
                die // else it won't change anything 
        }))
    }
    
    const diceElements = dice.map(die => ( //this will map the dice from dice state and will put the Die component and its props
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && // conditional rendering that if the tenzies state become true, then it will render the modal component
            <Modal
             attempt={attempt} 
             newGame = {newGame} 
             time={time}  
             
            />}
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="counter">
                <p>{attempt > 1 ? "Rolls" : "Roll"}: {attempt}</p>
                <p>Time: {time}</p>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
                disabled = {tenzies? true : false}
            >
                Roll
            </button>
        </main>
    )
}

export default App