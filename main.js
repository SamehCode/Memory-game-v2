let blocksContainer = document.querySelector('.memory-game-blocks')
let allBlocks = Array.from(blocksContainer.children)
let orderRange = [...allBlocks.keys()]

let wrongTries = 0;
let triesSpan = document.querySelector('.tries span')

let gameTime;

let dataUsers = []

document.querySelector('.splash button').onclick = function () {
    document.querySelector('.splash').remove()
    let yourName = prompt('Your name ?')
    if (yourName === null) {

        document.querySelector('.score-board .name span').innerHTML = 'Unknown'

    } else {

        document.querySelector('.score-board .name span').innerHTML = yourName
    }
    countDownTimer(302)
    document.getElementById('playMusic').play()

}

shuffle(orderRange)





function shuffle(arr) {
    let current = allBlocks.length,
        random,
        stash;
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        stash = arr[current]
        arr[current] = arr[random]
        arr[random] = stash

    }

}

allBlocks.forEach((block, index) => {
    block.style.order = orderRange[index]
})


flipBlock()

function flipBlock(ele) {
    let allFlippedBlocks = document.querySelectorAll('.is-flipped')
    allBlocks.forEach(block => {
        block.addEventListener('click', () => {
            block.classList.add('is-flipped')
            let allFlippedBlocks = document.querySelectorAll('.is-flipped')
            if (allFlippedBlocks.length === 2) {
                blocksContainer.classList.add('no-clicking')
                setTimeout(() => {
                    blocksContainer.classList.remove('no-clicking')

                }, 1000)

                if (allFlippedBlocks[0].dataset.tech === allFlippedBlocks[1].dataset.tech) {

                    setTimeout(() => {
                        allFlippedBlocks[0].classList.remove('is-flipped')
                        allFlippedBlocks[1].classList.remove('is-flipped')
                        allFlippedBlocks[0].classList.add('has-matched')
                        allFlippedBlocks[1].classList.add('has-matched')
                        document.getElementById('success-sound').play()
                    }, 1000)
                } else {
                    wrongTries++
                    document.getElementById('fail-sound').play()
                    triesSpan.innerHTML = wrongTries
                    setTimeout(() => {
                        allFlippedBlocks[0].classList.remove('is-flipped')
                        allFlippedBlocks[1].classList.remove('is-flipped')

                    }, 1000)
                    calcWrongTries(wrongTries)
                }
            }
        })
    })

}


function countDownTimer(time) {
    let minutes = parseInt(time / 60)
    let seconds = parseInt(time % 60)



    gameTime = setInterval(() => {
        seconds--

        if (seconds < 10) {
            seconds = '0' + seconds
        }

        if (minutes > 0 && seconds === '01') {
            minutes -= 1
            seconds = 59
        }

        if (minutes === 0 && seconds === '01') {
            clearInterval(gameTime)
            minutes = '0'
            seconds = '00'
            blocksContainer.classList.add('over')
            blocksContainer.classList.add('no-clicking')
            allBlocks.forEach(block => block.classList.add('is-flipped'))
            document.getElementById('over').classList.add('show')
        }

        document.querySelector('.minutes span').innerHTML = '0' + minutes
        document.querySelector('.seconds span').innerHTML = seconds

    }, 1000)

}



function calcWrongTries(wTries) {
    if (wTries === 10) {
        document.getElementById('playMusic').remove()
        clearInterval(gameTime)
        blocksContainer.classList.add('over')
        blocksContainer.classList.add('no-clicking')
        document.getElementById('over').classList.add('show')
        setTimeout(() => {
            allBlocks.forEach(block => block.classList.add('is-flipped'))
        }, 2000)
    }
}


function winFunction(matchedBlocks, allBlocks) {
    if (matchedBlocks === allBlocks) {

    }
}