const templateData = [
    {
        player: null,
        id: 0
    },
    {
        player: null,
        id: 1
    },
    {
        player: null,
        id: 2
    },
    {
        player: null,
        id: 3
    },
    {
        player: null,
        id: 4
    },
    {
        player: null,
        id: 5
    },
    {
        player: null,
        id: 6
    },
    {
        player: null,
        id: 7
    },
    {
        player: null,
        id: 8
    },
]

const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
]

export {
    templateData,
    winningCombinations
}