import Experience from "./Experience";
import * as THREE from "three"
import {gsap} from 'gsap'

/**
 * Overlay Class: 
 * Creates the overlay helmet model to be added to the scene and controls all corresponding attributes
 */
export default class Overlay{

    /**
     * Creates an instance of the overlay 
     */
    constructor()
    {
        //Gets the necessary variables and method through the experience
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.resources = this.experience.resources
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.loadingPercentElement = document.querySelector('.loading-percent')

        this.setGeometry(); 
        this.setMaterial(); 
        this.setMesh(); 

        this.resources.on('progress', () => 
        {
            let progressPercent = Math.round(this.resources.progressRatio * 100)
            console.log(progressPercent)
            this.loadingPercentElement.innerHTML = `${progressPercent}%`
            this.loadingBarElement.style.transform = `scaleX(${this.resources.progressRatio})`;
            console.log(this.resources.progressRatio)
        })

        this.resources.on('loaded', () => 
        {

            gsap.to(this.material.uniforms.uPositionZ, {duration: 1.0, value: 1.0, onComplete: this.removeGeometry})
            // gsap.to(this.material.uniforms.uAlpha, {duration: 2.5, value: 0.5, onComplete: this.removeGeometry})
            console.log('loaded')
            this.loadingBarElement.style.transform = '';
            this.loadingBarElement.classList.add('ended')
            // this.loadingPercentElement.style.display = 'none';
            console.log(this.loadingBarElement)


            this.loadingPercentElement.classList.add('fade-out')
            
        })

    }
    
    removeGeometry = () =>
    {
        this.scene.remove(this.mesh)
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(2,2,1,1); 
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
                uniforms: {
                    uPositionZ: {value: 0.0},
                    uAlpha: {value: 1.0}
                },
                transparent: true,
                wireframe:false,
                vertexShader: `
                    uniform float uPositionZ; 
                    void main()
                    {
                        vec3 newPosition = vec3(position.x, position.y, uPositionZ);
                        gl_Position = vec4(newPosition, 1.0); 
                    }
                `,
                fragmentShader: `
                    uniform float uAlpha; 
                    void main()
                    {
                        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha); 
                    }
                
                `
        })

    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh)
    }

}