const $chessBoard = document.querySelector('.chess-board-tiles')

const $gameWindow = document.querySelector('.game-window')

const blackTiles = [ 13,15,17,19,22,24,26,28,33,35,37,39,42,44,46,48,53,55,57,59,62,64,66,68,73,75,77,79,82,84,86,88]
const tilesWithChekers = [ 13,15,17,19,22,24,26,28,32,33,37,39,35,62,64,66,68,73,75,77,79,82,84,86,88]
const tilesBrown = [1,10,91,100]

const whiteKingTiles = [13,15,17,19]

const letters = ['a','b','c','d','e','f','g','h']
const numbers = [8,7,6,5,4,3,2,1]

// добавить промисы в этот проект

function renderChessBoard(array){
    let i = 0
    let tilesId = 0

    array.map(e=>
        e.filter(e=>{
            tilesId++
            const $tile = document.createElement('div')
            $tile.id = tilesId

            $tile.addEventListener('mousedown',()=>checker.moveTile())

            // $tile.addEventListener('mouseover',()=> deleteTilesColor() )
            // $tile.addEventListener('mousedown',()=> addYellowColor($tile) )

            if (e == letters[letters.indexOf(e)])
               $tile.innerText = e
               
            if (e == numbers[numbers.indexOf(e)])
                $tile.innerText = e
                
            if( blackTiles.indexOf(++i)!=-1){
                $tile.className = 'tile'
                $tile.classList.add('tile-black')
            }

            else
                $tile.className = 'tile'
                
            if ($tile.innerText!=''){
                $tile.classList.add('tile-black')
                $tile.style.backgroundColor='#939393'
            }

            tilesBrown.forEach(e=>{
                if ($tile.id == e){
                    $tile.classList.add('tile-black')
                    $tile.innerText='-'
                    $tile.style.backgroundColor='#939393'
                }
            })

            if (tilesWithChekers.indexOf(tilesId) != -1 ){
                if (tilesWithChekers[tilesWithChekers.indexOf(tilesId)] >= 41 && $tile.className=='tile tile-black')
                    $tile.classList.add('tile-with-white-checker')
                    
                else if (tilesWithChekers[tilesWithChekers.indexOf(tilesId)] < 41 && $tile.className=='tile tile-black')
                    $tile.classList.add('tile-with-black-checker')
            }

            $chessBoard.append($tile)
    }))
}

const chessBoardList = [
    [0,'h','g','f','e','d','c','b','a',0],
    [8, 0,0,0,0,0,0,0,0, 1],
    [7, 0,0,0,0,0,0,0,0, 2],
    [6, 0,0,0,0,0,0,0,0, 3],
    [5, 0,0,0,0,0,0,0,0, 4],
    [4, 0,0,0,0,0,0,0,0, 5],
    [3, 0,0,0,0,0,0,0,0, 6],
    [2, 0,0,0,0,0,0,0,0, 7],
    [1, 0,0,0,0,0,0,0,0, 8],
    [0,'a','b','c','d','e','f','g','h',0],
]

function removeBlueTile(blueTile,tileWithChecker){

    blueTile.classList.remove('tile-blue')

    if (tileWithChecker.className=='tile tile-black tile-green tile-with-black-checker')
        blueTile.classList.remove('tile-with-white-checker')
    
    if (tileWithChecker.className=='tile tile-black tile-green-white tile-with-white-checker')
        blueTile.classList.remove('tile-with-black-checker')

    if (tileWithChecker.className=='tile tile-black white-king')
        blueTile.classList.remove('white-king')
    

}

function addYellowColor(tile){

    if (tile.className == 'tile tile-black white-king'){
        tile.classList.add('tile-yellow')
        moveWhiteKing(tile)
    }
        if (tile.className == 'tile tile-black tile-green-white-king'){
            tile.classList.add('white-king')

        document.querySelector('.tile-yellow').classList.remove('white-king')
    }

    if (tile.className == 'tile tile-black tile-with-white-checker')
        tile.classList.add('tile-yellow')

        if (tile.className == 'tile tile-black tile-green-white'){
            tile.classList.add('tile-with-white-checker')

        document.querySelector('.tile-yellow').classList.remove('tile-with-white-checker')
    }

    if (tile.className == 'tile tile-black tile-with-black-checker')
        tile.classList.add('tile-yellow')
                    
        if (tile.className == 'tile tile-black tile-green'){
            tile.classList.add('tile-with-black-checker')

        document.querySelector('.tile-yellow').classList.remove('tile-with-black-checker')
    }
}

function changeTilesColor(tile){

    if (tile.className == 'tile tile-black tile-with-white-checker'){
        if (tile.id == 13 || tile.id == 15 || tile.id == 17 ||tile.id == 19)
            addWhiteKing(tile)
    }
        
    if (tile.className == 'tile tile-black tile-with-white-checker'){

        const state1 = document.querySelector(`.tile[id='${tile.id-11}']`)
        const state2 = document.querySelector(`.tile[id='${tile.id-9}']`)
        const state3 = document.querySelector(`.tile[id='${tile.id-18}']`)
        const state4 = document.querySelector(`.tile[id='${tile.id-22}']`)

        const state5 = document.querySelector(`.tile[id='${+tile.id+11}']`)
        const state6 = document.querySelector(`.tile[id='${+tile.id+9}']`)
        const state7 = document.querySelector(`.tile[id='${+tile.id+18}']`)
        const state8 = document.querySelector(`.tile[id='${+tile.id+22}']`)


        if (state1.className == 'tile tile-black white-king' || state1.className == 'tile tile-black tile-with-white-checker' || state1.className == 'tile tile-black tile-with-black-checker' && state4.className == 'tile tile-black tile-with-black-checker') 
            state1.classList.add('tile-red')
        
        if (state2.className == 'tile tile-black white-king' || state2.className == 'tile tile-black tile-with-white-checker' || state2.className == 'tile tile-black tile-with-black-checker' && state3.className == 'tile tile-black tile-with-black-checker')
            state2.classList.add('tile-red') 

        if (state1.className != 'tile tile-black tile-with-black-checker' && state1.innerText=='')
            state1.classList.add('tile-green-white')
            
        if (state2.className != 'tile tile-black tile-with-black-checker' && state2.innerText=='')
            state2.classList.add('tile-green-white')
        
        if (state3.className != 'tile tile-black tile-with-black-checker' && state3.className != 'tile tile-black tile-with-white-checker' && state2.className == 'tile tile-black tile-with-black-checker' && state3.innerText==''){
            state2.classList.add('tile-blue')
            state3.classList.add('tile-green-white')

            state3.addEventListener('mousedown',()=>removeBlueTile(state2,state3), {
                once: true
              })
        }

        if (state4.className != 'tile tile-black tile-with-black-checker' && state4.className != 'tile tile-black tile-with-white-checker' && state1.className == 'tile tile-black tile-with-black-checker' &&  state4.innerText==''){
            state1.classList.add('tile-blue')
            state4.classList.add('tile-green-white')

            state4.addEventListener('mousedown',()=>removeBlueTile(state1,state4), {
                once: true
              })
        }

        if (state7.className != 'tile tile-black tile-with-white-checker' && state7.className != 'tile tile-black tile-with-black-checker' && state6.className == 'tile tile-black tile-with-black-checker' && state7.innerText==''){
            state6.classList.add('tile-blue')
            state7.classList.add('tile-green-white')

            state7.addEventListener('mousedown',()=>removeBlueTile(state6,state7), {
                once: true
              })
        }
    
        if (state8.className != 'tile tile-black tile-with-white-checker' && state8.className != 'tile tile-black tile-with-black-checker' && state5.className == 'tile tile-black tile-with-black-checker' && state8.innerText==''){
            state5.classList.add('tile-blue')
            state8.classList.add('tile-green-white')

            state8.addEventListener('mousedown',()=>removeBlueTile(state5,state8), {
                once: true
              })
        }
    }
    if (tile.className == 'tile tile-black tile-with-black-checker'){

        const state1 = document.querySelector(`.tile[id='${+tile.id+11}']`)
        const state2 = document.querySelector(`.tile[id='${+tile.id+9}']`)
        const state3 = document.querySelector(`.tile[id='${+tile.id+18}']`)
        const state4 = document.querySelector(`.tile[id='${+tile.id+22}']`)

        const state5 = document.querySelector(`.tile[id='${tile.id-11}']`)
        const state6 = document.querySelector(`.tile[id='${tile.id-9}']`)
        const state7 = document.querySelector(`.tile[id='${tile.id-18}']`)
        const state8 = document.querySelector(`.tile[id='${tile.id-22}']`)


        if (state1.className == 'tile tile-black white-king' || state1.className == 'tile tile-black tile-with-black-checker' || state1.className == 'tile tile-black tile-with-white-checker' && state4.className == 'tile tile-black tile-with-white-checker') 
            state1.classList.add('tile-red')
        
        if (state2.className == 'tile tile-black white-king' || state2.className == 'tile tile-black tile-with-black-checker' || state2.className == 'tile tile-black tile-with-white-checker' && state3.className == 'tile tile-black tile-with-white-checker')
            state2.classList.add('tile-red')

        if (state1.className != 'tile tile-black tile-with-white-checker'  && state1.innerText=='')
            state1.classList.add('tile-green')
            
        if (state2.className != 'tile tile-black tile-with-white-checker'  && state2.innerText=='')
            state2.classList.add('tile-green')
        
        if (state2.className == 'tile tile-black white-king' || state3.className != 'tile tile-black tile-with-white-checker' && state3.className != 'tile tile-black tile-with-black-checker' && state2.className == 'tile tile-black tile-with-white-checker' && state3.innerText==''){
            state2.classList.add('tile-blue')
            state3.classList.add('tile-green')

            state3.addEventListener('mousedown',()=>removeBlueTile(state2,state3), {
                once: true
              })
        }
    
        if (state4.className != 'tile tile-black tile-with-white-checker' && state4.className != 'tile tile-black tile-with-black-checker' && state1.className == 'tile tile-black tile-with-white-checker' && state4.innerText==''){
            state1.classList.add('tile-blue')
            state4.classList.add('tile-green')

            state4.addEventListener('mousedown',()=>removeBlueTile(state1,state4), {
                once: true
              })
        }

        if (state7.className != 'tile tile-black tile-with-white-checker' && state7.className != 'tile tile-black tile-with-black-checker' && state6.className == 'tile tile-black tile-with-white-checker' && state7.innerText==''){
            state6.classList.add('tile-blue')
            state7.classList.add('tile-green')

            state7.addEventListener('mousedown',()=>removeBlueTile(state6,state7), {
                once: true
              })
        }
    
        if (state8.className != 'tile tile-black tile-with-white-checker' && state8.className != 'tile tile-black tile-with-black-checker' && state5.className == 'tile tile-black tile-with-white-checker' && state8.innerText==''){
            state5.classList.add('tile-blue')
            state8.classList.add('tile-green')

            state8.addEventListener('mousedown',()=>removeBlueTile(state5,state8), {
                once: true
              })
        }
}}

function addWhiteKing(tile){
    tile.classList.remove('tile-with-white-checker')
    tile.classList.add('white-king')
}

function moveWhiteKing(tile){

        const states9 = [9,18,27,36,45,54,63,72]
        const states11 = [11,22,33,44,55,66]

        for (let state of states9){
            const state1 = document.querySelector(`.tile[id='${tile.id-state}']`)
                if (state1){
                    if (state1.className!='tile tile-black tile-with-black-checker' && state1.className!='tile tile-black tile-with-white-checker' && state1.className=='tile tile-black')
                    state1.classList.add('tile-green-white-king')

                    else break
                }
               
        }

        for (let state of states9){
            const state1 = document.querySelector(`.tile[id='${+tile.id+state}']`)
                if (state1){
                    if (state1.className!='tile tile-black tile-with-black-checker' && state1.className!='tile tile-black tile-with-white-checker' && state1.className=='tile tile-black')
                    state1.classList.add('tile-green-white-king')

                    else break
                }

        }

        for (let state of states11){
            const state1 = document.querySelector(`.tile[id='${+tile.id+state}']`)
                if (state1){
                    if (state1.className!='tile tile-black tile-with-black-checker' && state1.className!='tile tile-black tile-with-white-checker' && state1.className=='tile tile-black')
                    state1.classList.add('tile-green-white-king')

                    else break
                }
        }
        
        for (let state of states11){
            const state1 = document.querySelector(`.tile[id='${+tile.id-state}']`)
                if (state1){
                    if (state1.className!='tile tile-black tile-with-black-checker' && state1.className!='tile tile-black tile-with-white-checker' && state1.className=='tile tile-black')
                    state1.classList.add('tile-green-white-king')

                    else break
                }
        }

}

class Tile {
    constructor(options){
        
        this.color = options.color // black or white
        this.type = options.type // пешка или дамка
        this.id = options.id
        this.text = options.text
    }

    getTileOption(option){
        return this[option]
    }

    touchTile(){
    }

    deleteTilesColor(){

        const deleteColors = ['tile-green-white-king','tile-green','tile-red','tile-yellow','tile-blue','tile-green-white']
    
        deleteColors.forEach(e=>
            document.querySelectorAll(`.${e}`).forEach(deleteColor=>
                deleteColor.classList.remove(e))
       )
    }
}

class Checker extends Tile{

    moveTile(){
        const freeTiles = [ 9, 11, ]
        console.log(this.color)

        if (this.color == 'white'){

            return new Promise((res, rej)=>{
                console.log( document.querySelector(`.tile[id='${this.id}']`))
                document.querySelector(`.tile[id='${this.id}']`).classList.add('tile-yellow')

                freeTiles.forEach(e=>
                document.querySelector(`.tile[id='${this.id-e}']`).classList.add('tile-green-white'))

                this.color='yellow'
                res()
            })
            .then(res=>{
                console.log(this.color,'удаление')
                document.querySelectorAll(`.tile`).forEach(e=>
                    e.addEventListener('mousedown',()=>{
                    console.log(e,'очищение')
                    this.deleteTilesColor()}))
                })
            .finally(()=>this.color='white')
        }

        if (this.color == 'black'){
            console.log(this.id, this.type)
        }

    }

    eatTile(){
        // что-нибудь придумаю 
    }
}

class Lady extends Checker{
    moveTile(){
    }

    eatTile(){
        // что-нибудь придумаю 
    }
}

const tile = new Tile({
    color: 'black',
    type: 'tile',
    id: 15,
    text: '1'
})

const checker = new Checker({
    color: 'white',
    type: 'checker',
    id: 64,
})

const lady= new Lady({
    color: 'white',
    type: 'lady',
    id: 55,
})

// function deleteTilesColor(){

//     const deleteColors = ['tile-green-white-king','tile-green','tile-red','tile-yellow','tile-blue','tile-green-white']

//     deleteColors.forEach(e=>
//         document.querySelectorAll(`.${e}`).forEach(deleteColor=>
//             setTimeout(() => deleteColor.classList.remove(e), 300))
//    )
// }


renderChessBoard(chessBoardList)


// Разделить эту махину на отдельные функции 👌
// Добавить поедание назад 👌
// Добавить дамку


// newLive Loading