import React, { useState } from 'react'
import Card from '../card/card.jsx';
import './grid.css'
import CheckWiner from '../helper/CheckWiner.jsx'; 

export default function Grid({numberOfCard}) {
    const[board,setBoard]=useState(Array(numberOfCard).fill("")); // pass the array with empty string
    const [turn,setTurn]=useState(true) // specify current playertrue=>o false=>x
    const[winner,setWinner]=useState(null);// specify winner 
    function play(index){
        if(turn==true){
            board[index]='o'
        }
        else{
            board[index]='x'
        }
        const win=CheckWiner(board,turn ? 'o':'x') // pass to checkWiner and get the symbol
        if(win){
        setWinner(win); // store the symbol in Winner
        }
        setBoard(...board); // unpack all value in the array
        setTurn(!turn);
    }
    function reset(){
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCard).fill(""));
    }
  return (
    <div className='grid-wrapper'>
        { 
        // if we winner is true then execute <h1> and <button> statment otherwise not execute
            winner && (
             <div>
            <h1 className='winnerClass'>Winner is: <span className='winer'>{winner}</span> </h1>
            <button className='reset' onClick={reset}>Rest Game </button>
            </div>
            )
            
        }
        {/* To specify current player x or o */}
    <h1 className='turnHighlight'>Current turn: <span className='Cturn'>{(turn)?'O':'X'}</span> </h1> 
    <div className='grid' >
      {/* if any one click on card Onplay run and symbol changed   */}
    {board.map((el,idx)=><Card gameEnd={(winner)?true:false}key={idx} onPlay={play} player={el} index={idx}/>)} 
    </div>
    </div>
  )
}
// where idx=index and key is for unique identy of card
// for each el card is printed 
