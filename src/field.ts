import Game from "./game";

export enum FieldType { Empty = 0, X = 1, O = 2 }

export class Field{
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

    render(){
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