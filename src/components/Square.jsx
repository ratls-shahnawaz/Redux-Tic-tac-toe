import React from 'react'
import styles from '../styles/Square.module.css'
import { useSelector, useDispatch } from "react-redux";

const Square = ({value,onClick}) => {

    const playerXColor = useSelector((state) => state.tictactoe.playerXColor);
    const playerYColor = useSelector((state) => state.tictactoe.playerYColor);
  
    return (
        <div>
            <button 
            style={{backgroundColor: value? (value == 'X'  ? playerXColor : playerYColor) : 'white'}}
            className={styles.square}
            onClick={onClick}>
                {value?value:''}
            </button>
        </div>
    )
}

export default Square
