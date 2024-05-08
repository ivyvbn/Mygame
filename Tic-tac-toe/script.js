document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const playerDisplay = document.querySelector('#player')
    const result = document.querySelector('#result')
    const restart = document.querySelector('#restart')
    const squareArray = Array.from(squares)
    const winList = Array.of([0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6])

    let currentPlayer = 'playerX'
    let end = ''
    let Xmark = []
    let Omark = []

    squares.forEach(square => {
        square.addEventListener('click', startGame)
    })

    restart.addEventListener('click', restartGame)

    function startGame(e) {
        const index = squareArray.indexOf(e.target)
        const choose = squareArray[index]

        if (choose.classList.contains('playerO') || choose.classList.contains('playerX')) {
            return
        }

        if (currentPlayer === 'playerX') {
            if (choose.classList.contains('playerO')) {
                return
            } else {
                currentPlayer = 'playerO'
                choose.classList.add('playerX')
            }
        } else if (currentPlayer === 'playerO') {
            if (choose.classList.contains('playerX')) {
                return
            } else {
                currentPlayer = 'playerX'
                choose.classList.add('playerO')
            }
        }

        playerDisplay.innerHTML = currentPlayer

        addMark(index)
        checkWin()
    }

    function restartGame() {
        squares.forEach(square => {
            if (square.classList.contains('playerO')) {
                square.classList.remove('playerO')
            }
            if (square.classList.contains('playerX')) {
                square.classList.remove('playerX')
            }
        })
        Xmark = []
        Omark = []
        currentPlayer = 'playerX'
        playerDisplay.innerHTML = currentPlayer
        end = '結果'
        result.innerHTML = end
        if (result.getAttribute('endState') === 'true') {
            squares.forEach(square => {
                square.addEventListener('click', startGame)
            })
        }
    }

    function addMark(index) {
        if (currentPlayer === 'playerX') {
            Xmark.push(index)
            Xmark.sort((a, b) => {
                return a - b
            })
        }
        if (currentPlayer === 'playerO') {
            Omark.push(index)
            Omark.sort((a, b) => {
                return a - b
            })
        }
    }

    function checkWin() {
        if (XWin()) {
            end = 'playerX Win'
            result.innerHTML = end
            result.setAttribute('endState', 'true')
            squareArray.forEach(square => square.removeEventListener('click', startGame))
            alert('playerX Win')
        } else if (YWin()) {
            end = 'playerO Win'
            result.innerHTML = end
            result.setAttribute('endState', 'true')
            squareArray.forEach(square => square.removeEventListener('click', startGame))
            alert('playerO Win')
        } else if (isDraw()) {
            end = 'draw'
            result.innerHTML = end
            result.setAttribute('endState', 'true')
            alert('draw')
        }
    }

    function XWin() {
        return winList.some(array => {
            return array.every(index => {
                return squareArray[index].classList.contains('playerX')
            })
        })
    }

    function YWin() {
        return winList.some(array => {
            return array.every(index => {
                return squareArray[index].classList.contains('playerO')
            })
        })
    }

    function isDraw() {
        return squareArray.every(square => {
            return square.classList.contains('playerX') || square.classList.contains('playerO')
        })
    }

})