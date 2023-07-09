import Experience from "../Experience";
import * as THREE from "three"
import portalLightMaterial from "../Materials/portalLightMaterial";

/**
 * Portal Class: 
 * Creates the portal to be added to the scene and controls all corresponding attributes
 */
export default class Portal{

    /**
     * Creates an instance of the fox model 
     */
    constructor()
    {
        //Gets the necessary variables and method through the experience
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.environment = this.experience.world.environment; 
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        
        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Portal')
        }

        //Setup 
        this.resource = this.resources.items.portalModel 
        this.bakedTexture = this.resources.items.portalTexture
        this.bakedTexture.flipY = false

        this.bakedTexture.colorSpace = THREE.SRGBColorSpace
        this.texture = new THREE.MeshBasicMaterial({map: this.bakedTexture})
        this.catTexture = new THREE.MeshBasicMaterial({map: this.catBakedTexture})

        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.portalLightMaterial = new portalLightMaterial(); 

        this.setModel()
        this.setAnimation()


    }

    /**
     * Sets up the helmet model for the scene
     */
    setModel()
    {
        this.model = this.resource.scene;
        this.model.position.set(0, 0, 0); 
        this.scene.add(this.model);
        this.updateMaterials();

        
    }

    updateMaterials()
    {
        
        this.bakedMesh =  this.model.children.find((child) => child.name === 'Cube088')
        this.portalLightMesh =  this.model.children.find((child) => child.name === 'portalLight')
        this.poleLightAMesh =  this.model.children.find((child) => child.name === 'poleLightA')
        this.poleLightBMesh =  this.model.children.find((child) => child.name === 'poleLightB')

        this.bakedMesh.material = this.texture
        this.poleLightAMesh.material = this.poleLightMaterial
        this.poleLightBMesh.material = this.poleLightMaterial
        this.portalLightMesh.material = this.portalLightMaterial

        


    }

    /**
     * Sets the animation for the helmet 
     */
    setAnimation()
    {
                
    }

    //Updates the animation 
    update()
    {
        // let envMapIntensity = this.environment.environmentMap.intensity; 
        // if(this.intensity !== envMapIntensity){
        //     this.updateMaterials(); 
        // }

        this.portalLightMaterial.uniforms.uTime.value = this.time.elapsedTime; 

    }

}

