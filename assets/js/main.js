// Informations
const statut = document.querySelector("h2")
let activePlayer = "X"
let activeGame = true
let gameState = ["", "", "", "", "", "", "", "", ""]
let isOn = false
let changeText = true
let computerText = document.querySelector("#computer")

// Annonces
const playerTurn = () => `Tour du joueur  <br> ${activePlayer}`
const win = () => `Victoire du joueur <br> ${activePlayer}`
const equality = () => "Egalité"

computerText.innerHTML = "Joueur"

// Conditions de victoire
const victoryConditions = [
    // Horizontale
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Verticale
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonale
    [0, 4, 8],
    [2, 4, 6]
]

// Tour du joueur
statut.innerHTML = playerTurn()

// Ecouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", clickCaseManagement))
document.querySelector("#restart").addEventListener("click", restart)

// Fonction - Gestion du clic sur les cases
function clickCaseManagement() {

    // Index case cliquée
    const indexCase = parseInt(this.dataset.index)

    // Vérification de l'état du jeu
    if (gameState[indexCase] != "" || !activeGame) {
        return
    }

    // Symbole du joueur dans cellule et tableau
    gameState[indexCase] = activePlayer
    this.innerHTML = activePlayer

    // Vérification de victoire
    winCondition()
}

// Fonction - Vérification victoire
function winCondition() {
    let winTurn = false

    // Parcourt des conditions de victoire
    for (let victoryCondition of victoryConditions) {
        let val1 = gameState[victoryCondition[0]]
        let val2 = gameState[victoryCondition[1]]
        let val3 = gameState[victoryCondition[2]]

        // Case vide
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }

        // Case identique
        else if (val1 === val2 && val2 === val3) {
            winTurn = true
            break
        }
    }

    // Victoire
    if (winTurn) {
        statut.innerHTML = win()
        activeGame = false
        return
    }

    // Toutes cases remplies
    else if (!gameState.includes("")) {
        statut.innerHTML = equality()
        activeGame = false
        return
    }

    // Change joueur
    if (activePlayer === "X") {
        activePlayer = "O" 
        if (isOn) {
            activePlayer = "O"
            computer();
            activePlayer = "X"
        }
    }
    else {
        activePlayer = "X"
    }
    statut.innerHTML = playerTurn()
}

// Réinitialiser
function restart() {
    activePlayer = "X"
    activeGame = true
    gameState = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = playerTurn()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}

// Aleatoire
function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Ordinateur
function computer() {
    winCondition()
    for (let index = 0; index < document.querySelectorAll(".case").length; index++) {
        let random = aleatoire(0, document.querySelectorAll(".case").length);
        if (document.querySelectorAll(".case")[random].innerText == "") {
            document.querySelectorAll(".case")[random].innerText = "O";
            break;
        }
    }
}

// Boutton
function changeGame() {
   isOn = !isOn;
    btnChange()
    restart()
}

function btnChange() {
    if (changeText === true) {
        computerText.innerHTML = "Ordinateur"
        changeText = false
    }
    else {
        computerText.innerHTML = "Joueur"
        changeText = true
    }
}

