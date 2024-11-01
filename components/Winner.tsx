import { NextPage } from 'next'
import { FaCircleDot } from 'react-icons/fa6'
import { ImCross } from 'react-icons/im'
import { twMerge } from 'tailwind-merge'
import Box from './Box'
import { useEffect } from 'react'
import { PlayerCpuScoreTypes, PlayersScoreTypes } from '@/types/types'
import { updateLocalStorageScore } from '@/functions/functions'

interface Props {
    gameType: 'player' | 'cpu' | 'hard',
    winner: boolean | null,
    newGame: () => void,
    isTie: boolean,
    setPlayersScore: (e: PlayersScoreTypes) => void,
    setPlayerCpuScore: (e: PlayerCpuScoreTypes) => void,
    setHardScore: (e: PlayerCpuScoreTypes) => void,
    playersScore: PlayersScoreTypes,
    playerCpuScore: PlayerCpuScoreTypes,
    hardScore: PlayerCpuScoreTypes
}

const Winner: NextPage<Props> = ({ gameType, winner, newGame, isTie, setPlayerCpuScore, setPlayersScore, playersScore, playerCpuScore, setHardScore, hardScore }) => {
    // updating local storage scores
    useEffect(() => {
        updateLocalStorageScore({ gameType, isTie, setPlayersScore, setPlayerCpuScore, setHardScore, playersScore, playerCpuScore, hardScore, winner })
    }, [])
    return (
        <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-[#00000085] animate-opacity'>
            <div className='w-full h-auto bg-[#1f3540] flex flex-col items-center py-8 gap-3 animate-pop-up'>
                <h4 className='text-white text-sm'>{!isTie ? (gameType === 'player' ? (winner ? 'PLAYER 1' : 'PLAYER 2') : (winner ? 'YOU WON!' : 'CPU WON!')) : "IT'S A TIE"}</h4>
                <h1 className={twMerge('uppercase flex items-center gap-3 font-semibold text-2xl', winner ? 'text-[#31c4be]' : 'text-[#f2b237]', isTie && 'text-[#a8bec9]')}>
                    {
                        isTie ? <><ImCross className='w-10 h-10 text-[#31c4be]' /> <FaCircleDot className='w-10 h-10 text-[#f2b237]' /></> : (winner ? <ImCross className='w-10 h-10' /> : <FaCircleDot className='w-10 h-10' />)
                    }
                    {
                        isTie ? 'no one wins' : 'takes the round'
                    }
                </h1>
                <div className='w-32'>
                    <Box bgColor="#6f8995" bgHeight={1}>
                        <button onClick={newGame} className="bg-[#a8bec9] text-[#192a32] py-2 rounded-md font-medium">PLAY AGAIN</button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Winner