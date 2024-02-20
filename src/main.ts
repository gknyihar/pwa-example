import '../resources/css/app.css'
import * as $ from 'jquery'
import Game from './game';

$(document).ready(() => {
    let game = new Game($('#game'));
});

