import * as $ from 'jquery'

export default class Game {

    board: Field[][] = [];
    player1: Player;
    player2: Player;
    currentPlayer: Player = undefined;
    winner: Player = undefined;

    gameStatus: JQuery = $("#game-status>h2");
    gameButton: JQuery = $("#game-status>button");
    gameBoard: JQuery = $("#game-board");

    constructor() {
        this.player1 = new Player("Player X", FieldType.X);
        this.player2 = new Player("Player O", FieldType.O);
        this.initGame();
    }

    initGame() {
        this.gameBoard.children().remove();
        for (let i = 0; i < 3; i++) {
            let row: Field[] = [];
            for (let j = 0; j < 3; j++) {
                let element = $("<div></div>")
                this.gameBoard.append(element);
                let field = new Field(element);
                element.on('click', () => this.onFieldClick(field));
                row.push(field)
            }
            this.board.push(row);
        }
        this.gameButton.on('click', () => this.startGame());
    }

    onFieldClick(field: Field) {
        if (this.winner !== undefined || this.currentPlayer === undefined)
            return;

        if (field.state === FieldType.Empty) {
            field.setState(this.currentPlayer.mark);
            this.nextTurn();
        }
    }

    startGame() {
        this.currentPlayer = this.winner == this.player1 ? this.player2 : this.player1;
        this.winner = undefined;
        this.board.forEach(r => r.forEach(i => i.setState(FieldType.Empty)))
        this.renderStatus();
    }

    nextTurn() {
        if (this.hasWinner())
            this.winner = this.currentPlayer;
        else if (this.isDraw())
            this.winner = null;
        else
            this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
        this.renderStatus();
    }

    hasWinner() {
        return [0, 1, 2].some((i) =>
            this.board[i].every((f => f.state == this.currentPlayer.mark))
            || this.board.every((f => f[i].state == this.currentPlayer.mark))
            || [0, 1, 2].every((i) => this.board[i][i].state == this.currentPlayer.mark)
            || [0, 1, 2].every((i) => this.board[i][2 - i].state == this.currentPlayer.mark)
        );
    }

    isDraw() {
        return this.board.every(r => r.every(f => f.state !== FieldType.Empty))
    }

    renderStatus() {
        if (this.winner === undefined) {
            this.gameButton.hide();
            this.gameStatus.html(`${this.currentPlayer.name}'s turn...`);
        } else if (this.winner === null) {
            this.gameStatus.html(`Draw`);
            this.gameButton.html("New game").show();
        } else {
            this.gameStatus.html(`${this.currentPlayer.name} is the winner!`);
            this.gameButton.html("New game").show();
        }
    }

}

class Player {
    constructor(public name: string, public mark: FieldType) {
    }
}

enum FieldType { Empty = 0, X = 1, O = 2 }

class Field {
    state: FieldType = FieldType.Empty;

    constructor(public element: JQuery) {
        this.render()
    }

    setState(state: FieldType) {
        if (this.state !== state) {
            this.state = state;
            this.render();
        }
    }

    render() {
        this.element.removeClass();

        if (this.state === FieldType.X) {
            this.element.addClass("block block-x");
        } else if (this.state === FieldType.O) {
            this.element.addClass("block block-o");
        } else {
            this.element.addClass("block block-empty");
        }
    }

}