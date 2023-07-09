import * as dat from 'lil-gui'

/**
 * Debug Class: 
 * Sets up the debugger UI for the project 
 */
export default class Debug
{
    /**
     * Initialises the debugger on the #debug url 
     */
    constructor()
    {
        //If the url is hashed with debug
        this.active = window.location.hash === '#debug'
        if(this.active)
        {
            //Adds the debugger to the html page
            this.ui= new dat.GUI({
                width: 200
            })
        }
    }
}