import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js" //Controls the sizes of the screen 
import Time from "./Utils/Time.js" //Controls the time/tick function 
import Camera from "./Camera.js" //Controls the camera of the scene
import Renderer from './Renderer.js' //Controls the renderer of the scene
import World from "./World/World.js" //Stores info and method of the THREE.js world 
import Resources from './Utils/Resources.js' //Stores all the resources for the project
import Debug from './Utils/Debug.js' //Controls the Debug UI for the project 
import sources from './sources.js' //Controls all the sources for the project 
import Overlay from './Overlay.js'

let instance = null //First instance of the experience class

export default class Experience 
{
    /**
     * Initialises a THREE.Js experience for the project
     * @param {Canvas} canvas - the HTML canvas element on which the THREE.Js objects will be drawn  
     * @returns The experience for the project 
     */
    constructor(canvas) 
    {
        //If an instance has been initialised already 
        if(instance){ 
            return instance
        }

        //Stores the first instance 
        instance = this
        console.log('Here starts a great experience')
        //Global access
        window.Experience = this //Makes for easier testing

        //Options 
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.overlay = new Overlay(); 
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        //Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        //Time tick event (updates the scene during each tick)
        this.time.on('tick', () => 
        {
            this.update()
        })

    }

    /**
     * Resizes the camera  and renderer
     */
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    /**
     * Updates the camera, world and renderer 
     */
    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        
    }

    /**
     * Destroys all three.js elements on the canvas 
     */

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        //Traverse the whole scene
        this.scene.traverse((child) => 
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }

    }


}