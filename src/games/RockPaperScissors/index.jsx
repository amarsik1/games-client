import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import femaleIdle from './assets/img/female_idle.svg';
import femalePaper from './assets/img/female_paper.svg';
import femaleRock from './assets/img/female_rock.svg';
import femaleScissors from './assets/img/female_scissors.svg';
import malePaper from './assets/img/male_paper.svg';
import maleRock from './assets/img/male_rock.svg';
import maleScissors from './assets/img/male_scissors.svg';
import maleIdle from './assets/img/male_idle.svg';
import rockIcon from './assets/img/rock_icon.svg';
import paperIcon from './assets/img/paper_icon.svg';
import scissorsIcon from './assets/img/scissors_icon.svg';
import randomIcon from './assets/img/random_icon.svg';
import restart from './assets/img/restart.svg';
import resultCpu from './assets/img/result_cpu.svg';
import resultUser from './assets/img/result_user.svg';
import userHpAvatar from './assets/img/user_hp_avatar.svg';
import cpuHpAvatar from './assets/img/cpu_hp_avatar.svg';
import rockSound from './assets/sound/rock.mp3';
import paperSound from './assets/sound/slap.mp3';
import scissorsSound from './assets/sound/scissors.mp3';
import startSound from './assets/sound/start.mp3';
import confettiSound from './assets/sound/confetti.mp3';
import loseSound from './assets/sound/lose.mp3';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];
const startSfx = new Audio(startSound);
const confettiSfx = new Audio(confettiSound);
const loseSfx = new Audio(loseSound);
const rockSfx = new Audio(rockSound);
const paperSfx = new Audio(paperSound);
const scissorsSfx = new Audio(scissorsSound);

const RockPaperScissiors = ({
  onFinish,
}) => {
  const [userChoice, setUserChoice] = useState(maleIdle);
  const [computerChoice, setComputerChoice] = useState(femaleIdle);
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [maleImg, setMaleImg] = useState(maleIdle);
  const [femaleImg, setFemaleImg] = useState(femaleIdle);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [splash, setSplash] = useState(false);

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];

  const generateComputerChoice = () => {
    setComputerChoice(randomChoice);
    console.log(`cpu ${randomChoice}`);
    if (randomChoice === 'scissors') {
      setFemaleImg(femaleScissors);
    } else if (randomChoice === 'rock') {
      setFemaleImg(femaleRock);
    } else {
      setFemaleImg(femalePaper);
    }
  };

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
    if (value === 'scissors') {
      setMaleImg(maleScissors);
      if (randomChoice === 'rock') {
        rockSfx.play();
      } else if (randomChoice === 'paper') {
        scissorsSfx.play();
      }
    } else if (value === 'rock') {
      setMaleImg(maleRock);
      if (randomChoice === 'paper') {
        paperSfx.play();
      } else if (randomChoice === 'scissors') {
        rockSfx.play();
      }
    } else {
      setMaleImg(malePaper);
      if (randomChoice === 'scissors') {
        scissorsSfx.play();
      } else if (randomChoice === 'rock') {
        paperSfx.play();
      }
    }
    console.log(`choice user: ${value}`);
  };

  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(randomClick);
    generateComputerChoice();
    if (randomClick === 'scissors') {
      setMaleImg(maleScissors);
      if (randomChoice === 'rock') {
        rockSfx.play();
      } else if (randomChoice === 'paper') {
        scissorsSfx.play();
      }
    } else if (randomClick === 'rock') {
      setMaleImg(maleRock);
      if (randomChoice === 'paper') {
        paperSfx.play();
      } else if (randomChoice === 'scissors') {
        rockSfx.play();
      }
    } else {
      setMaleImg(malePaper);
      if (randomChoice === 'scissors') {
        scissorsSfx.play();
      } else if (randomChoice === 'rock') {
        paperSfx.play();
      }
    }
    console.log(`random user: ${randomClick}`);
  };

  const handleReset = () => {
    startSfx.play();
    setGameOver(false);
    setUserPoints(0);
    setComputerPoints(0);
    setMaleImg(maleIdle);
    setFemaleImg(femaleIdle);
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 4 && computerPoints <= 4) {
      if (
        comboMoves === 'scissorspaper'
        || comboMoves === 'rockscissors'
        || comboMoves === 'paperrock'
      ) {
        const updatedUserPoints = userPoints + 1;
        setUserPoints(updatedUserPoints);

        if (updatedUserPoints === 5) {
          setResult('You Win');
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            confettiSfx.play();
          }, 1000);
        }
      }

      if (
        comboMoves === 'paperscissors'
        || comboMoves === 'scissorsrock'
        || comboMoves === 'rockpaper'
      ) {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1;
        setComputerPoints(updatedComputerPoints);

        if (updatedComputerPoints === 5) {
          setResult('You Lose');
          const gameOff = true;
          setTimeout(() => {
            setGameOver(gameOff);
            loseSfx.play();
          }, 1000);
        }
      }
    }
  }, [computerChoice, userChoice]);

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
                    key={computerChoice}
                    src={femaleImg}
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
                    src={maleImg}
                    key={userChoice}
                    alt=""
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    initial={{ y: 200 }}
                    animate={{ y: 50 }}
                  />
                </div>
                <div className="ui">
                  <div className="ui-box">
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
                  </div>
                </div>
              </div>
              <div className="score">
                {gameOver && <p>{result}</p>}
                <div className="hp-box-user">
                  <div className="hp-box-inner-user">
                    <progress
                      className="user-hp"
                      value={5 - computerPoints}
                      max="5"
                    />
                    <motion.img
                      src={userHpAvatar}
                      className="user_hp_avatar"
                      alt=""
                      key={computerPoints}
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
                      value={5 - userPoints}
                      max="5"
                    />
                    <motion.img
                      src={cpuHpAvatar}
                      className="cpu_hp_avatar"
                      alt=""
                      key={userPoints}
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
                {computerPoints}
                {' '}
                -
                {' '}
                {userPoints}
              </p>
              <motion.img
                src={restart}
                alt=""
                onClick={handleReset}
                animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
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
        >
          <motion.button
            onClick={() => {
              setSplash(true);
              startSfx.play();
            }}
            animate={{
              rotate: [0, 0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
          >
            Start
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default RockPaperScissiors;
