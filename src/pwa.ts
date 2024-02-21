import * as $ from 'jquery';

export function registerServiceWorker(){
    if ('serviceWorker' in navigator) {
        $(function(){
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
}

export function registerInstallButton(button:JQuery){
    let installPrompt : BeforeInstallPromptEvent = null;

    window.addEventListener("beforeinstallprompt", function(event){
        event.preventDefault();
        installPrompt = event;
        button.removeClass('invisible');
    })

    button.on("click", async () => {
        if (!installPrompt) {
            return;
        }
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        disableInAppInstallPrompt();
    });

    function disableInAppInstallPrompt() {
        installPrompt = null;
        button.addClass('visible');
    }

}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<UserChoice>;
    prompt(): Promise<UserChoice>;
}

type UserChoice = Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
}>;

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}