import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'
/**
 * Time Class: 
 * Class which controls the tick functions and triggers tick functions for the Experience to update 
 * all the components making the experience 
 */
export default class Time extends EventEmitter{

    /**
     * Initialises a time object which controls the tick events 
     */
    constructor()
    {
        super() //For the event emitter class

        //Setup 
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.clock = new THREE.Clock();

        //On each animation frame, executes the tick function
        window.requestAnimationFrame(() => 
        {
            this.tick()
        })
        
    }

    /**
     * Tick event gets the time elapsed and triggers a tick event for other classes to listen to
     */
    tick()
    {
        //Calculates the elapsed time 
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.elapsedTime = this.clock.getElapsedTime();

        this.trigger('tick')

        window.requestAnimationFrame(() => 
        {
            this.tick()
        })    
    }
} 
