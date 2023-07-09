import Experience from "./Experience.js"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Camera class which controls all the camera properties and orbit controls
 */
export default class Camera
{
    /**
     * Initalises the camera object, setting up an experience 
     */
    constructor()
    {
        //Setup 
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene 
        this.canvas = this.experience.canvas

        
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        //Sets the instance of the camera and the orbit controls 
        this.setInstance()
        this.setOrbitControls()

    }

    /**
     * Sets up the instance of the camera (initialising the camera)
     */
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
           75, //Field of view
            this.sizes.width/this.sizes.height, //Aspect ratio
            0.1, //Camera furstum near plane
            100) //Camera furstum far plane
        //Sets up the position of the camera
        this.instance.position.set(4, 2, 4)
        //Adds it to the scene 
        this.scene.add(this.instance)

        
        if(this.debug.active)
        {
            
            this.debugFolder.add(this.instance.position, 'y').min(-5).max(5).step(0.1).name('CameraY')
            this.debugFolder.add(this.instance.position, 'z').min(-5).max(5).step(0.1).name('CameraZ')
            this.debugFolder.add(this.instance.position, 'x').min(-5).max(5).step(0.1).name('CameraX')
        }

    }

    /**
     * Sets up orbit controls for the camera 
     */
    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    /**
     * Reszies the camera aspect ratio on a window resize event 
     */
    resize()
    {
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    /**
     * Updates the camera orbit controls 
     */
    update()
    {
        this.controls.update()
    }
}
