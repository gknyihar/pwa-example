import * as $ from 'jquery'
import {Field, FieldType} from "./field";
import {Player} from "./player";

export default class Game{

    currentPlayer: Player = undefined;
    board: Field[][] = [];
    player1: Player;
    player2: Player;
    winner: Player = undefined;

    constructor(public gameElement: JQuery) {
        this.player1 = new Player("Player 1", FieldType.X);
        this.player2 = new Player("Player 2", FieldType.O);
        this.init(gameElement)
        $("#start-btn").click(() => this.start());
    }

    start() {
        this.currentPlayer = this.winner == this.player1 ? this.player2 : this.player1;
        this.winner = undefined;
        this.board.forEach(r => r.forEach(i => i.setState(FieldType.Empty)))
        this.render();
    }

    init(gameElement: JQuery) {
        gameElement.children().remove();
        for (let i = 0; i < 3; i++) {
            let row: Field[] = [];
            for (let j = 0; j < 3; j++) {
                let element = $("<div></div>")
                gameElement.append(element);
                let field = new Field(element);
                element.click(() => this.onClick(field));
                row.push(field)
            }
            this.board.push(row);
        }
    }

    onClick(field: Field) {
        if (field.state === FieldType.Empty && this.winner === undefined && this.currentPlayer !== undefined) {
            field.setState(this.currentPlayer.mark);
            this.nextTurn();
        }
    }

    nextTurn(){
        if(this.hasWinner())
            this.winner = this.currentPlayer;
        else if (this.isDraw())
            this.winner = null;
        else
            this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
        this.render();
    }

    hasWinner(){
        return [0,1,2].some((i) =>
            this.board[i].every((f => f.state == this.currentPlayer.mark))
            || this.board.every((f => f[i].state == this.currentPlayer.mark))
            || [0,1,2].every((i) => this.board[i][i].state == this.currentPlayer.mark)
            || [0,1,2].every((i) => this.board[i][2-i].state == this.currentPlayer.mark)
        );
    }

    isDraw(){
        return this.board.every(r => r.every(f => f.state !== FieldType.Empty))
    }

    render(){
        if(this.winner === undefined) {
            $("#start-btn").hide();
            $("#game-state").html(`${this.currentPlayer.name}'s turn...`);
        }
        else if(this.winner === null){
            $("#game-state").html(`Draw`);
            $("#start-btn").html("New game").show();
        } else {
            $("#game-state").html(`${this.currentPlayer.name} is the winner!`);
            $("#start-btn").html("New game").show();
        }

    }

}