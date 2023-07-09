import Experience from "../Experience";
import * as THREE from "three"
import fireFliesMaterial from "../Materials/fireFliesMaterial";

/**
 * FireFlies Class: 
 * Creates the fireflies to be added to the scene and controls all corresponding attributes
 */
export default class FireFlies
{

    /**
     * Initialises the FireFlies object 
     */
    constructor()
    {
        //Gets the necessary variables and method through the experience
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Parameters
        this.debugObject = {}
        this.debugObject.count = 30; 
        this.debugObject.size = 0.1; 


        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('FireFlies');
            this.debugFolder.add(this.debugObject, 'count').min(30).max(50).step(100).onFinishChange(() => { this.setGeometry() })

        }

        this.setPoints(); 
        this.setGeometry(); 
        this.setMaterial(); 
        
    }

    setPoints()
    {
        this.points = new THREE.Points(); 
        this.scene.add(this.points)
    }

    setGeometry()
    {
        if(this.geometry)
            this.geometry.dispose(); 

        this.geometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(this.debugObject.count * 3) 
        this.scale = new Float32Array(this.debugObject.count)

        for(let i = 0; i < this.debugObject.count; i++)
        {
            this.positions[i * 3 + 0] = (Math.random() -0.5) * 4; 
            this.positions[i * 3 + 1] = Math.random() * 1.5; 
            this.positions[i * 3 + 2] = (Math.random() -0.5) * 4; 

            this.scale[i] = Math.random();

        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3)); 
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(this.scale, 1)); 
        this.points.geometry = this.geometry
    }   

    setMaterial()
    {
    
        this.material = new fireFliesMaterial();
        this.points.material = this.material;
        this.points.material.transparent = true;

    }
    
    update()
    {
        this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio; 
        this.material.uniforms.uTime.value = this.time.elapsedTime; 

    }

}