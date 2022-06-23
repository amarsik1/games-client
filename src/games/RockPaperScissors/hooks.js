import { useEffect, useState } from 'react';
import { useRoom } from '../../services/roomContext';
import socket from '../../socket';

import femaleIdle from './assets/img/female_idle.svg';
import femalePaper from './assets/img/female_paper.svg';
import femaleRock from './assets/img/female_rock.svg';
import femaleScissors from './assets/img/female_scissors.svg';
import malePaper from './assets/img/male_paper.svg';
import maleRock from './assets/img/male_rock.svg';
import maleScissors from './assets/img/male_scissors.svg';
import maleIdle from './assets/img/male_idle.svg';

import rockSound from './assets/sound/rock.mp3';
import paperSound from './assets/sound/slap.mp3';
import scissorsSound from './assets/sound/scissors.mp3';
import startSound from './assets/sound/start.mp3';
import confettiSound from './assets/sound/confetti.mp3';
import loseSound from './assets/sound/lose.mp3';
import RequestService from '../../services/RequestApi';

const startSfx = new Audio(startSound);
const confettiSfx = new Audio(confettiSound);
const loseSfx = new Audio(loseSound);
const rockSfx = new Audio(rockSound);
const paperSfx = new Audio(paperSound);
const scissorsSfx = new Audio(scissorsSound);

export const useRockPaperScissors = () => {
  const { room, setRoom } = useRoom();
  const [players, setPlayers] = useState([]);
  const [splash, setSplash] = useState(false);

  const [firstPlayerChoise, setFirstPlayerChoise] = useState(null);
  const [secondPlayerChoise, setSecondPlayerChoise] = useState(null);

  const [firstPlayerUIChoise, setFirstPlayerUIChoise] = useState(maleIdle);
  const [secondPlayerUIChoise, setSecondPlayerUIChoise] = useState(femaleIdle);

  const [firstPlayerPoints, setFirstPlayerPoints] = useState(0);
  const [secondPlayerPoints, setSecondPlayerPoints] = useState(0);

  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const numberAllPlayers = room.players.length;
    const numberReadyPlayers = room.readyToRoundPlayers.length;

    if (numberReadyPlayers === numberAllPlayers) {
      setSplash(true);
    }
  }, [room]);

  useEffect(() => {
    if (!room) return;

    setPlayers([
      {
        ...room.players[0],
        id: 1,
      },
      {
        ...room.players[1],
        id: 2,
      },
    ]);
  }, [room]);

  const getUIChoise = (value, playerNumber) => {
    let ui = null;

    switch (value) {
      case 'scissors': {
        ui = playerNumber === 1 ? maleScissors : femaleScissors;
        scissorsSfx.play();
        break;
      }
      case 'paper': {
        ui = playerNumber === 1 ? malePaper : femalePaper;
        paperSfx.play();
        break;
      }
      case 'rock': {
        ui = playerNumber === 1 ? maleRock : femaleRock;
        rockSfx.play();
        break;
      }
      default: break;
    }
    return ui;
  };

  const handleReset = () => {
    startSfx.play();
    setGameOver(false);
    setFirstPlayerChoise(0);
    setSecondPlayerPoints(0);
    setSecondPlayerUIChoise(maleIdle);
    setFirstPlayerUIChoise(femaleIdle);
  };

  console.log(players, firstPlayerChoise, secondPlayerChoise);

  useEffect(() => {
    const unsub = () => {
      socket.off('playerReady');
    };

    if (!room) return unsub;

    (() => {
      socket.emit('joinToRoom', room._id);
      socket.on('playerReady', (playerUuid) => {
        setRoom((prev) => ({
          ...prev,
          readyToRoundPlayers: [...prev.readyToRoundPlayers, playerUuid],
        }));
      });
      socket.on('RockPaperScissiors-choise', ({
        playerUuid,
        choise,
      }) => {
        if (!players.length) return;
        const { id: playerId } = players.find((item) => item.uuid === playerUuid);
        const setChoise = playerId === 1 ? setFirstPlayerChoise : setSecondPlayerChoise;

        setChoise(choise);
      });
    })();

    return unsub;
  }, [room, players]);

  useEffect(() => {
    if (!(firstPlayerChoise && secondPlayerChoise)) return;

    setFirstPlayerUIChoise(getUIChoise(firstPlayerChoise, 1));
    setSecondPlayerUIChoise(getUIChoise(secondPlayerChoise, 2));

    const comboMoves = firstPlayerChoise + secondPlayerChoise;
    if (firstPlayerPoints <= 4 && secondPlayerPoints <= 4) {
      if (
        comboMoves === 'scissorspaper'
        || comboMoves === 'rockscissors'
        || comboMoves === 'paperrock'
      ) {
        const updatedUserPoints = firstPlayerPoints + 1;
        setFirstPlayerPoints(updatedUserPoints);

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
        const updatedComputerPoints = secondPlayerPoints + 1;
        setSecondPlayerPoints(updatedComputerPoints);

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

    setTimeout(() => {
      setFirstPlayerChoise(null);
      setSecondPlayerChoise(null);
      setFirstPlayerUIChoise(maleIdle);
      setSecondPlayerUIChoise(femaleIdle);
      new RequestService('rooms/resend-action').post({
        roomName: room._id,
        eventName: 'RockPaperScissors-nextMove',
      });
    }, 2000);
  }, [firstPlayerChoise, secondPlayerChoise]);

  return {
    splash,
    room,
    result,
    gameOver,
    firstPlayerChoise,
    secondPlayerChoise,
    firstPlayerUIChoise,
    secondPlayerUIChoise,

    firstPlayerPoints,
    secondPlayerPoints,
    setFirstPlayerPoints,
    setSecondPlayerPoints,
  };
};
