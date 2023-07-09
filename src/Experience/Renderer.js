import Experience from "./Experience.js"
import * as THREE from 'three'

/**
 * Renderer Class: 
 * Class which controls the THREE js renderer for the project's scene 
 */
export default class Renderer
{
    /**
     * Initialises a renderer for the scene 
     */
    constructor()
    {
        //Gets the first instance of the experience 
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.debugObject = {}
        this.debugObject.clearColor = 0x000000

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Renderer');
        }
        
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene 
        this.camera = this.experience.camera
        this.setInstance() //Sets the instance of the renderer

        

    }

    /**
     * Sets up the instance of the renderer 
     */
    setInstance()
    {
        //Create the isntance of the WebGL Renderer for THREE js
        this.instance = new THREE.WebGLRenderer(
            {
                canvas: this.canvas, 
                antialias: true
            }
        )
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.setClearColor(this.debugObject.clearColor)

        if(this.debug.active)
        {
            this.debugFolder.addColor(this.debugObject, 'clearColor').onChange( () => 
            {
                this.instance.setClearColor(this.debugObject.clearColor)
            })
        }

    }

    /**
     * Resizes the renderer active window size 
     */
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    
    /**
     * Updates the renderer
     */
    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}