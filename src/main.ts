import '../resources/css/app.css'
import * as $ from 'jquery'
import Game from './game';
import {registerInstallButton, registerServiceWorker} from "./pwa";

registerServiceWorker();
registerInstallButton($('#game-header>button').hide());

$(function(){
    new Game();
});


