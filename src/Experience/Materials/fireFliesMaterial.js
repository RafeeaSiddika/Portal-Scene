import * as THREE from 'three'; 
import fireFliesVertexShader from '/Shaders/FireFlies/vertex.glsl'; 
import fireFliesFragmentShader from '/Shaders/FireFlies/fragment.glsl'; 
import Experience from '../Experience';


export default function()
{
    //Use the experience to get the debug
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.sizes = this.experience.sizes;  
    this.debug = this.experience.debug; 

    this.debugObject = {}
    this.debugObject.size = 100; 


    let material = new THREE.ShaderMaterial(
        {
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            uniforms:
            {
                uTime: {value: 0},
                uPixelRatio: {value: this.sizes.pixelRatio},
                uSize: {value: this.debugObject.size}
            },
            vertexShader: fireFliesVertexShader,
            fragmentShader: fireFliesFragmentShader
        }
    )

    
    if(this.debug.active)
    {
        this.debugFolder = this.debug.ui.addFolder('FireFlies Material')
        this.debugFolder.add(material.uniforms.uSize, 'value').min(1).max(100).step(0.001).name('FireFlies Size')
    }

    return material; 
}