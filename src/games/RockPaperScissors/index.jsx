import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import rockIcon from './assets/img/rock_icon.svg';
import paperIcon from './assets/img/paper_icon.svg';
import scissorsIcon from './assets/img/scissors_icon.svg';
import randomIcon from './assets/img/random_icon.svg';
import restart from './assets/img/restart.svg';
import resultCpu from './assets/img/result_cpu.svg';
import resultUser from './assets/img/result_user.svg';
import userHpAvatar from './assets/img/user_hp_avatar.svg';
import cpuHpAvatar from './assets/img/cpu_hp_avatar.svg';
import './App.css';
import { useRockPaperScissors } from './hooks';

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissiors = ({
  onFinish,
}) => {
  const {
    splash,
    result,
    firstPlayerChoise,
    secondPlayerChoise,
    firstPlayerUIChoise,
    secondPlayerUIChoise,

    firstPlayerPoints,
    secondPlayerPoints,
    gameOver,
  } = useRockPaperScissors(onFinish);

  return (
    <>
      {splash && (
        <div className="App">
          {!gameOver && (
            <>
              <div className="game">
                <div className="top">
                  <motion.img
                    style={{ maxWidth: '100%', display: 'block' }}
                    key={secondPlayerChoise}
                    src={secondPlayerUIChoise}
                    alt=""
                    transition={{
                      ease: 'easeOut',
                      duration: 0.5,
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: -50 }}
                  />
                  {' '}
                </div>
                <div className="bottom">
                  <motion.img
                    src={firstPlayerChoise}
                    key={firstPlayerUIChoise}
                    alt=""
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    initial={{ y: 200 }}
                    animate={{ y: 50 }}
                  />
                </div>
                <div className="ui">
                  {/* <div className="ui-box">
                    <img
                      src={rockIcon}
                      alt=""
                      className="rock_icon"
                      key="rock_item"
                      onClick={() => handleClick(choices[0])}
                    />
                    <img
                      src={paperIcon}
                      alt=""
                      className="paper_icon"
                      onClick={() => handleClick(choices[1])}
                    />
                    <img
                      src={scissorsIcon}
                      alt=""
                      className="scissors_icon"
                      onClick={() => handleClick(choices[2])}
                    />
                    <img
                      src={randomIcon}
                      alt=""
                      className="random_icon"
                      onClick={() => randomClick()}
                    />
                  </div> */}
                </div>
              </div>
              <div className="score">
                {gameOver && <p>{result}</p>}
                <div className="hp-box-user">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp"
                      value={5 - secondPlayerPoints}
                      max="5"
                    />
                    <motion.img
                      src={userHpAvatar}
                      className="user_hp_avatar"
                      alt=""
                      key={secondPlayerChoise}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="hp-box-cpu">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp cpu"
                      value={5 - firstPlayerPoints}
                      max="5"
                    />
                    <motion.img
                      src={cpuHpAvatar}
                      className="cpu_hp_avatar"
                      alt=""
                      key={firstPlayerPoints}
                      animate={{
                        rotate: [0, 0, 20, 20, 0, 20, 20, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {gameOver && (
            <motion.div
              className="result"
              animate={{ scale: 1.3 }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.img
                src={result === 'You Lose' ? resultUser : resultCpu}
                alt=""
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                }}
                transition={{ duration: 1 }}
              />
              <p className="result-msg">{result}</p>
              <p className="result-score">
                {secondPlayerPoints}
                {' '}
                -
                {' '}
                {firstPlayerPoints}
              </p>
            </motion.div>
          )}
        </div>
      )}
      {!splash && (
        <motion.div
          className="splash"
          initial={{ y: 1000 }}
          transition={{ duration: 1 }}
          animate={{ y: 0 }}
        />
      )}
    </>
  );
};

export default RockPaperScissiors;
