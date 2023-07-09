import EventEmitter from './EventEmitter.js'

/**
 * Sizes Class:
 * Reszies the canvas window on resize events
 */
export default class Sizes extends EventEmitter{

    /**
     * Initialises a sizes object which controls the sizes resize event
     */
    constructor()
    {
        super() //For the event emitter class 

        //Setup 
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event
        window.addEventListener('resize', () => 
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) //Only requires a maximum of 2 pixel ratio if the device is capable of more 

            this.trigger('resize') //Triggers a resize event 
        })
    }
} 
