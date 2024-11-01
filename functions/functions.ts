import { winningCombinations } from "@/data/data"
import { FieldTypes, PlayerCpuScoreTypes, PlayersScoreTypes } from "@/types/types"

const checkComb = (comb: number[], data: FieldTypes[]) => {
    let playerSelection: number[] = []
    let cpuSelection: number[] = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].player) playerSelection = [...playerSelection, data[i].id]
        else if (data[i].player === false) cpuSelection = [...cpuSelection, data[i].id]
    }
    if (comb.every((id: number) => playerSelection.includes(id)) || comb.every((id: number) => cpuSelection.includes(id))) return true;
    return false;
}

interface UpdateLocalStorageTypes {
    gameType: 'player' | 'cpu' | 'hard',
    winner: boolean | null,
    isTie: boolean,
    setPlayersScore: (e: PlayersScoreTypes) => void,
    setPlayerCpuScore: (e: PlayerCpuScoreTypes) => void,
    setHardScore: (e: PlayerCpuScoreTypes) => void,
    playersScore: PlayersScoreTypes,
    playerCpuScore: PlayerCpuScoreTypes,
    hardScore: PlayerCpuScoreTypes
}

const updateLocalStorageScore = ({ gameType, isTie, setPlayersScore, setPlayerCpuScore, setHardScore, playersScore, playerCpuScore, hardScore, winner }: UpdateLocalStorageTypes) => {
    if (gameType === 'player') {
        let newScore = { ...playersScore }
        if (isTie) {
            newScore.ties = newScore.ties + 1
            localStorage.setItem('players-score', JSON.stringify(newScore))
            setPlayersScore(newScore)
        } else if (winner) {
            newScore.player1 = newScore.player1 + 1
            localStorage.setItem('players-score', JSON.stringify(newScore))
            setPlayersScore(newScore)
        } else if (!winner) {
            newScore.player2 = newScore.player2 + 1
            localStorage.setItem('players-score', JSON.stringify(newScore))
            setPlayersScore(newScore)
        }
    } else if (gameType === 'cpu') {
        let newScore = { ...playerCpuScore }
        if (isTie) {
            newScore.ties = newScore.ties + 1
            localStorage.setItem('player-cpu-score', JSON.stringify(newScore))
            setPlayerCpuScore(newScore)
        } else if (winner) {
            newScore.player = newScore.player + 1
            localStorage.setItem('player-cpu-score', JSON.stringify(newScore))
            setPlayerCpuScore(newScore)
        } else if (!winner) {
            newScore.cpu = newScore.cpu + 1
            localStorage.setItem('player-cpu-score', JSON.stringify(newScore))
            setPlayerCpuScore(newScore)
        }
    } else if (gameType === 'hard') {
        let newScore = { ...hardScore }
        if (isTie) {
            newScore.ties = newScore.ties + 1
            localStorage.setItem('hard-score', JSON.stringify(newScore))
            setHardScore(newScore)
        } else if (winner) {
            newScore.player = newScore.player + 1
            localStorage.setItem('hard-score', JSON.stringify(newScore))
            setHardScore(newScore)
        } else if (!winner) {
            newScore.cpu = newScore.cpu + 1
            localStorage.setItem('hard-score', JSON.stringify(newScore))
            setHardScore(newScore)
        }
    }
}

const blockWinning = (data: FieldTypes[], playerMoves: FieldTypes[]): number[] => {
    let playerIds: number[] = []
    for (let i = 0; i < playerMoves.length; i++) {
        playerIds = [...playerIds, playerMoves[i].id]
    }
    let blockIds: number[] = []
    for (let i = 0; i < winningCombinations.length; i++) {
        const newArray = playerIds.filter((id: number) => winningCombinations[i].includes(id))
        const newArr = winningCombinations[i].filter((id: number) => !newArray.includes(id))
        if (newArr.length === 1) blockIds = [...blockIds, newArr[0]]
    }
    let returnableIds: number[] = [] 
    for (let i = 0; i < blockIds.length; i++) {
        const field = data.find((dt: FieldTypes) => dt.id === blockIds[i])
        if(field && field.player === null) returnableIds = [...returnableIds, blockIds[i]]
    }
    return returnableIds;
}

const winningMove = (data: FieldTypes[], botMoves: FieldTypes[]): number[] => {
    let playerIds: number[] = []
    for (let i = 0; i < botMoves.length; i++) {
        playerIds = [...playerIds, botMoves[i].id]
    }
    let blockIds: number[] = []
    for (let i = 0; i < winningCombinations.length; i++) {
        const newArray = playerIds.filter((id: number) => winningCombinations[i].includes(id))
        const newArr = winningCombinations[i].filter((id: number) => !newArray.includes(id))
        if (newArr.length === 1) blockIds = [...blockIds, newArr[0]]
    }
    let returnableIds: number[] = [] 
    for (let i = 0; i < blockIds.length; i++) {
        const field = data.find((dt: FieldTypes) => dt.id === blockIds[i])
        if(field && field.player === null) returnableIds = [...returnableIds, blockIds[i]]
    }
    return returnableIds;
}

export {
    checkComb,
    updateLocalStorageScore,
    blockWinning,
    winningMove
}