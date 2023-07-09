import Experience from "../Experience.js"
import FireFlies from "./FireFlies.js"
import Portal from "./Portal.js"
import * as THREE from 'three'
/**
 * Creates the THREE js world for this project
 */
export default class World
{
    /**
     * Initialises the world object by setting up the resources needed
     */
    constructor()
    {
        //Sets up the experience, resources and scene for the world 
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.resources = this.experience.resources


        //Once the reources are loaded, sets up the floor, fox and environment 
        this.resources.on('ready', () => 
        {
            //Setup
            this.portal = new Portal()
            window.setTimeout(() => {
                this.fireFlies = new FireFlies(); 
            }, 500)

        })
    }

    //Updates the flight helmet animation 
    update()
    {
        //If the flight helmet exists
        if(this.portal)
        {
            this.portal.update()
        }

        if(this.fireFlies)
        {
            this.fireFlies.update()
        }
    }
}