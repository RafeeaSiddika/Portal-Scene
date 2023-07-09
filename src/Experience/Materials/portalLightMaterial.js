import * as THREE from 'three'; 
import portalVertexShader from '/Shaders/Portal/vertex.glsl'; 
import portalFragmentShader from '/Shaders/Portal/fragment.glsl'; 
import Experience from '../Experience';


export default function()
{
    //Use the experience to get the debug
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.sizes = this.experience.sizes;  
    this.debug = this.experience.debug; 

    this.debugObject = {}
    this.debugObject.colorStart = new THREE.Color(0xd093e1)
    this.debugObject.colorEnd = new THREE.Color(0xffffff)


    let material = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                uTime: {value: 0},
                uColorStart: {value: this.debugObject.colorStart},
                uColorEnd: {value: this.debugObject.colorEnd}
            },
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader
        }
    )

    
    if(this.debug.active)
    {
        this.debugFolder = this.debug.ui.addFolder('Portal Light Material')
        this.debugFolder.addColor(this.debugObject, 'colorStart').onChange(() =>
        {
            material.uniforms.uColorStart.value =  this.debugObject.colorStart; 
        })

        this.debugFolder.addColor(this.debugObject, 'colorEnd').onChange(() =>
        {
            material.uniforms.uColorEnd.value =  this.debugObject.colorEnd; 
        })
    }

    return material; 
}