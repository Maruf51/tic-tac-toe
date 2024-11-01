import { NextPage } from 'next'
import Box from './Box'

interface Props {
    setIsOpen: (e: boolean) => void,
    resetScore: () => void,
}

const ResetScore: NextPage<Props> = ({ setIsOpen, resetScore }) => {
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-[#00000085] animate-opacity'>
            <div className='w-[90%] max-w-[500px] h-auto bg-[#1f3540] flex flex-col items-center p-8 animate-pop-up rounded-md z-10 relative'>
                <h1 className='text-center text-white font-semibold text-2xl'>Reset score</h1>
                <p className='text-slate-400 text-sm'>This action cannot be reversed.</p>
                <div className='grid grid-cols-2 gap-3 w-full mt-8'>
                    <Box bgColor="#6f8995" bgHeight={1}>
                        <div onClick={closeModal} className="flex flex-col justify-center bg-[#a8bfc9] items-center w-full h-12 leading-3 py-5">
                            <h1 className="text-lg font-medium">Cancel</h1>
                        </div>
                    </Box>
                    <Box bgColor="#B22222" bgHeight={1}>
                        <div onClick={resetScore} className="flex flex-col justify-center bg-[#FF0000] items-center w-full h-12 leading-3 py-5 text-white">
                            <h1 className="text-lg font-medium">Reset</h1>
                        </div>
                    </Box>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full h-full' onClick={closeModal}>

            </div>
        </div>
    )
}

export default ResetScore