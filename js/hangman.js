var programmingLanguage = [
    'python',
    'javascript',
    'mongodb',
    'json',
    'java',
    'html',
    'css',
    'c',
    'csharp',
    'golang',
    'kotlin',
    'php',
    'sql',
    'ruby'
]

const draws = [ 
    'head', 
    'body', 
    'rightHarm', 
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
 ]

let answer = '';
let maxWrong = 8;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d")

function drawGallow(){
    context.strokeStyle = '#444';
                context.lineWidth = 10;
                context.beginPath();
                context.moveTo(175, 225);
                context.lineTo(5, 225);
                context.moveTo(40, 225);
                context.lineTo(25, 5);
                context.lineTo(100, 5);
                context.lineTo(100, 25);
                context.stroke();
}



function draw(part){
    switch (part) {    
            case 'head':
                context.lineWidth = 5;
                context.beginPath();
                context.arc(100, 50, 25, 0, Math.PI*2, true);
                context.closePath();
                context.stroke();
                break;
              
              case 'body':
                context.beginPath();
                context.moveTo(100, 75);
                context.lineTo(100, 140);
                context.stroke();
                break;
        
              case 'rightHarm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(60, 100);
                context.stroke();
                break;
        
              case 'leftHarm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(140, 100);
                context.stroke();
                break;
        
              case 'rightLeg':
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(80, 190);
                context.stroke();
                break;
        
              case 'rightFoot':
                 context.beginPath();
                 context.moveTo(82, 190);
                 context.lineTo(70, 185);
                 context.stroke();
              break;
        
              case 'leftLeg':
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(125, 190);
                context.stroke();
              break;
        
              case 'leftFoot':
                 context.beginPath();
                 context.moveTo(122, 190);
                 context.lineTo(135, 185);
                 context.stroke();
              break;
    } 
}    


function randomWord() {
    answer = programmingLanguage[Math.floor(Math.random() * programmingLanguage.length)].toUpperCase();
}

function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
            <button
                class="btn btn-lg btn-primary m-2"
                id='` + letter + `'
                onClick="handleGuess('` + letter +`')"

            >

            ` + letter + `
            </button>
        `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;    
}

function guessWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0){
        guessWord();
        checkIfGameWon()
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGamelost()
        drawMan()
    }
}

function drawMan() { 
    draw(draws[mistakes - 1])
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = "<span class='color-green'>Você Ganhou!!!</span>";
    }
}

function checkIfGamelost() {
    if (mistakes === maxWrong) {

        document.getElementById('wordSpotlight').innerHTML= 'A resposta era: ' + answer
        document.getElementById('keyboard').innerHTML = "<span class='color-red'>Você Perdeu!!!</span>";

    }
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawGallow()
  }

function reset(){
    mistakes = 0;
    guessed = [];
    
    randomWord();
    guessWord();
    updateMistakes();
    clearCanvas();
    generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong


// Adicionar palavra
const btnAddWord = document.getElementById('btnAddWord')

btnAddWord.addEventListener('click', function handleClick(){
    // event.preventDefault();

    let addWord = document.getElementById('boxword')
    programmingLanguage.push(addWord.value)
    console.log(programmingLanguage)
    addWord.value = '';
})

// Iniciar Jogo
const blockHang = document.getElementById('block-hang');
const btnStartGame = document.getElementById('btn-start');
const blockMenu = document.getElementById('block-menu')

btnStartGame.addEventListener('click', function startTheGame(){ 
    if(blockHang.style.display === 'block') {
        blockHang.style.display = 'none';
    }else{
        blockHang.style.display = 'block'
        blockMenu.style.display = 'none'
    }
})

// voltar

const btnBackMenu = document.getElementById('back')

btnBackMenu.addEventListener('click', function backToMenu(){
    blockHang.style.display = 'none'
    blockMenu.style.display = 'block'
})


// iniciar funções
drawGallow()
randomWord();
generateButtons();
guessWord();

