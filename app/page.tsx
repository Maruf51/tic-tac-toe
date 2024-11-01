'use client'

import Box from "@/components/Box";
import NewGame from "@/components/NewGame";
import ResetScore from "@/components/ResetScore";
import Winner from "@/components/Winner";
import { templateData, winningCombinations } from "@/data/data";
import { blockWinning, checkComb, winningMove } from "@/functions/functions";
import { FieldTypes, PlayerCpuScoreTypes, PlayersScoreTypes } from "@/types/types";
import { useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { twMerge } from "tailwind-merge";


export default function Home() {
  const [gameType, setGameType] = useState<'player' | 'cpu' | 'hard'>('cpu')
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const [fieldData, setFieldData] = useState<FieldTypes[]>(templateData.map(item => ({ ...item })))
  const [playerCpuScore, setPlayerCpuScore] = useState<PlayerCpuScoreTypes>({ player: 0, ties: 0, cpu: 0 })
  const [hardScore, setHardScore] = useState<PlayerCpuScoreTypes>({ player: 0, ties: 0, cpu: 0 })
  const [playersScore, setPlayersScore] = useState<PlayersScoreTypes>({ player1: 0, ties: 0, player2: 0 })
  const [winner, setWinner] = useState<number[] | null>(null)
  const [isTie, setIsTie] = useState<boolean>(false)
  const [isNewGameOpen, setIsNewGameOpen] = useState<boolean>(false)
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)

  // checking if anyone is winner
  const checkWinner = (data: FieldTypes[]) => {
    const gettingWinner = winningCombinations.find((comb: number[]) => checkComb(comb, data))
    if (gettingWinner !== undefined) {
      setWinner(gettingWinner)
    } else {
      setWinner(null)
    }
    const gettingTie = data.find((field: FieldTypes) => field.player === null)
    if (gettingTie === undefined && gettingWinner === undefined) setIsTie(true)
  }

  const handleAction = (id: number) => {
    setFieldData((prevData: FieldTypes[]) => {
      const newData = [...prevData]
      if (playerTurn) newData[id].player = true
      else newData[id].player = false
      checkWinner(newData)
      return newData
    })
    setPlayerTurn((prevState: boolean) => !prevState)
  }

  // for clearing score
  const resetScore = () => {
    if (gameType === 'player') {
      localStorage.removeItem('players-score')
      setPlayersScore({ player1: 0, ties: 0, player2: 0 })
    } else if (gameType === 'cpu') {
      localStorage.removeItem('player-cpu-score')
      setPlayerCpuScore({ player: 0, ties: 0, cpu: 0 })
    } else if (gameType === 'hard') {
      localStorage.removeItem('hard-score')
      setHardScore({ player: 0, ties: 0, cpu: 0 })
    }
    setIsResetModalOpen(false)
  }

  // new game handler
  const newGame = () => {
    setPlayerTurn(true)
    setFieldData(templateData.map(item => ({ ...item })))
    setWinner(null)
    setIsTie(false)
  }

  // for cpu to give random action
  const cpuActionHandler = (emptyFields: FieldTypes[]) => {
    if (emptyFields[0]) {
      const randomNumber = Math.floor(Math.random() * emptyFields.length)
      setFieldData((prevData: FieldTypes[]) => {
        const newData = [...prevData]
        newData[emptyFields[randomNumber].id].player = false
        checkWinner(newData)
        return newData
      })
      setPlayerTurn((prevState: boolean) => !prevState)
    }
  }

  // for giving cpu hard mode action
  const hardActionHandler = (emptyFields: FieldTypes[]) => {
    const actionHandler = (id: number) => {
      setFieldData((prevData: FieldTypes[]) => {
        const newData = [...prevData]
        newData[fieldData[id].id].player = false
        checkWinner(newData)
        return newData
      })
    }

    const playerMoves = fieldData.filter((field: FieldTypes) => field.player === true)
    const botMoves = fieldData.filter((field: FieldTypes) => field.player === false)

    const blockMove: number[] = blockWinning(fieldData, playerMoves)
    const winMove: number[] = winningMove(fieldData, botMoves)

    const middleField = fieldData.find((field: FieldTypes) => field.id === 4)

    if (winMove[0]) {
      actionHandler(winMove[0])
    } else if (blockMove[0]) {
      actionHandler(blockMove[0])
    } else if (middleField?.player === null) {
      actionHandler(4)
    } else {
      const randomNumber = Math.floor(Math.random() * emptyFields.length)
      setFieldData((prevData: FieldTypes[]) => {
        const newData = [...prevData]
        newData[emptyFields[randomNumber].id].player = false
        checkWinner(newData)
        return newData
      })
    }
    setPlayerTurn((prevState: boolean) => !prevState)
  }

  useEffect(() => {
    const emptyFields = fieldData.filter((field: FieldTypes) => field.player === null)

    if (!playerTurn && gameType == 'cpu' && !winner && emptyFields[0]) {
      cpuActionHandler(emptyFields)
    }
    else if (!playerTurn && gameType == 'hard' && !winner && emptyFields[0]) {
      hardActionHandler(emptyFields)
    }
  }, [playerTurn])

  // for saving data in localstorage
  useEffect(() => {
    setPlayersScore(JSON.parse(localStorage.getItem('players-score') || '{"player1":0,"ties":0,"player2":0}'))
    setPlayerCpuScore(JSON.parse(localStorage.getItem('player-cpu-score') || '{"player":0,"ties":0,"cpu":0}'))
    setHardScore(JSON.parse(localStorage.getItem('hard-score') || '{"player":0,"ties":0,"cpu":0}'))
  }, [gameType])

  // for checking local storage to open the new game modal or not
  useEffect(() => {
    const defaultGameType: 'player' | 'cpu' | 'hard' = JSON.parse(localStorage.getItem('game-type') || '"cpu"')
    setGameType(defaultGameType)
    if (localStorage.getItem('game-type')) {
      setIsNewGameOpen(false)
    } else {
      setIsNewGameOpen(true)
    }
  }, [])
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="grid grid-cols-3 gap-3 md:gap-5 w-[90%] max-w-[500px] mx-auto">
        {/* menu */}
        <>
          <Box bgColor="#6f8995" bgHeight={1}>
            <button onClick={() => setIsNewGameOpen(true)} className="bg-[#a8bfc9] h-11 text-xl font-medium">NEW</button>
          </Box>
          <Box bgHeight={1} disabled={true}>
            <button className="bg-[#1f3540] text-white h-11 text-lg font-medium flex gap-2 cursor-default">
              {
                playerTurn ? <ImCross /> : <FaCircleDot />
              }
              Turn
            </button>
          </Box>
          <Box bgColor="#6f8995" bgHeight={1}>
            <div onClick={() => setIsResetModalOpen(true)} className="flex flex-col justify-center bg-[#a8bfc9] items-center w-full h-11 leading-3">
              <h1 className="text-base font-medium">Reset</h1>
              <p className="text-xs mt-[-5px]">Score</p>
            </div>
          </Box>
        </>

        {/* board */}
        {
          fieldData.map((field: FieldTypes, index: number) => {
            const winnerType = winner && fieldData[winner[0]].player || null
            return (
              <Box key={index} bgHeight={2} disabled={winner ? true : (field.player === null ? false : true)}>
                <div
                  onClick={() => {
                    if (!winner && field.player === null) handleAction(field.id)
                  }}
                  style={{ aspectRatio: 1 }}
                  className={twMerge("bg-[#1f3540] text-white text-lg font-medium flex gap-2 p-10", winner && winner.includes(field.id) && (winnerType ? ' bg-primary' : ' bg-secondary'))}
                >
                  {
                    field.player !== null && (field.player ? <ImCross className={twMerge("w-full h-full text-primary", winner && (winnerType && winner.includes(field.id) && ' text-[#1f3540]'))} /> : <FaCircleDot className={twMerge("w-full h-full text-secondary", winner && (!winnerType && winner.includes(field.id) && ' text-[#1f3540]'))} />)
                  }
                </div>
              </Box>
            )
          })
        }

        {/* score */}
        <>
          <Box disabled={true}>
            <div className="flex flex-col justify-center bg-[#31c4be] text-[#192a32] items-center w-full h-auto py-1.5">
              <h1 className="text-base font-semibold flex gap-2 items-center"><ImCross />(YOU)</h1>
              <p className="text-lg font-bold">{gameType === 'player' ? playersScore.player1 : (gameType === 'cpu' ? playerCpuScore.player : hardScore.player)}</p>
            </div>
          </Box>
          <Box disabled={true}>
            <div className="flex flex-col justify-center bg-[#a8bec9] text-[#192a32] items-center w-full h-auto py-1.5">
              <h1 className="text-base font-semibold">Ties</h1>
              <p className="text-lg font-bold">{gameType === 'player' ? playersScore.ties : (gameType === 'cpu' ? playerCpuScore.ties : hardScore.ties)}</p>
            </div>
          </Box>
          <Box disabled={true}>
            <div className="flex flex-col justify-center bg-[#f2b237] text-[#192a32] items-center w-full h-auto py-1.5">
              <h1 className="text-base font-semibold flex gap-2 items-center"><FaCircleDot />(CPU)</h1>
              <p className="text-lg font-bold">{gameType === 'player' ? playersScore.player2 : (gameType === 'cpu' ? playerCpuScore.cpu : hardScore.cpu)}</p>
            </div>
          </Box>
        </>
      </div>
      {
        (winner || isTie) &&
        <Winner
          gameType={gameType}
          winner={winner ? fieldData[winner[0]].player : null}
          newGame={newGame}
          isTie={isTie}
          setPlayersScore={setPlayersScore}
          setPlayerCpuScore={setPlayerCpuScore}
          playersScore={playersScore}
          playerCpuScore={playerCpuScore}
          hardScore={hardScore}
          setHardScore={setHardScore}
        />
      }
      {
        isNewGameOpen &&
        <NewGame
          newGame={newGame}
          setGameType={setGameType}
          setIsOpen={setIsNewGameOpen}
        />
      }
      {
        isResetModalOpen &&
        <ResetScore
          resetScore={resetScore}
          setIsOpen={setIsResetModalOpen}
        />
      }
    </div>
  );
}