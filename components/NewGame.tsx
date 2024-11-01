import { NextPage } from 'next'
import Box from './Box'
import { useEffect, useState } from 'react'

interface Props {
    setIsOpen: (e: boolean) => void,
    newGame: () => void,
    setGameType: (e: 'player' | 'cpu' | 'hard') => void
}

const NewGame: NextPage<Props> = ({ setIsOpen, newGame, setGameType }) => {
    const [rememberChoice, setRememberChoice] = useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const handler = (type: 'player' | 'cpu' | 'hard') => {
        setGameType(type)
        newGame()
        if (rememberChoice) {
            localStorage.setItem('game-type', JSON.stringify(type))
        } else {
            localStorage.removeItem('game-type')
        }
        closeModal()
    }

    useEffect(() => {
        const localChoice = localStorage.getItem('game-type')
        if (localChoice) setRememberChoice(true)
    }, [])
    return (
        <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-[#00000085] animate-opacity'>
            <div className='w-[90%] max-w-[500px] h-auto bg-[#1f3540] flex flex-col items-center p-8 gap-4 animate-pop-up rounded-md z-10 relative'>
                <h1 className='text-center text-white font-semibold text-2xl mb-3'>Start a new game</h1>
                <Box bgColor="#6f8995" bgHeight={1}>
                    <div onClick={() => handler('player')} className="flex flex-col justify-center bg-[#a8bfc9] items-center w-full h-14 leading-3 py-5">
                        <h1 className="text-lg font-medium">Player vs Player</h1>
                        <p className="text-xs mt-[-3px] text-slate-600">Play with your friends</p>
                    </div>
                </Box>
                <Box bgColor="#388E3C" bgHeight={1}>
                    <div onClick={() => handler('cpu')} className="flex flex-col justify-center bg-[#4CAF50] items-center w-full h-14 leading-3 py-5 text-white">
                        <h1 className="text-lg font-medium">Player vs CPU - Easy</h1>
                        <p className="text-xs mt-[-3px] text-slate-700">Easy to win. The actions are random.</p>
                    </div>
                </Box>
                <Box bgColor="#B22222" bgHeight={1}>
                    <div onClick={() => handler('hard')} className="flex flex-col justify-center bg-[#FF0000] items-center w-full h-14 leading-3 py-5 text-white">
                        <h1 className="text-lg font-medium">Player vs CPU - Hard</h1>
                        <p className="text-xs mt-[-3px] text-slate-300">Calculated actions. Win if you can!</p>
                    </div>
                </Box>
                <div className='flex gap-2 text-white items-center cursor-pointer select-none'>
                    <input checked={rememberChoice} onChange={(e) => setRememberChoice(e.target.checked)} className='cursor-pointer' type="checkbox" id='remember' />
                    <label className='cursor-pointer' htmlFor="remember">Remember my choice!</label>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full h-full' onClick={closeModal}>

            </div>
        </div>
    )
}

export default NewGame