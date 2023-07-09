import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Resources class which sets up all the loaders for the resources used in the scene 
 */
export default class Resources extends EventEmitter{

    /**
     * Initialises the resources objects and setup all the items and sources to load 
     * @param {array} sources - An array of source objects where each objects holds info on the name, type and path of the source
     */
    constructor(sources)
    {
        super()

        //Options
        this.sources = sources
        
        //Setup 
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.progressItemsLoaded = 0; 
        this.progressItemsTotal = 0; 
        this.progressRatio = 0.0; 

        //Sets up the loaders and starts loading the sources 
        this.setLoaders()
        this.startLoading()
    }

    /**
     * Sets up all the loaders in an object 
     */
    setLoaders()
    {
        this.loadingManager = new THREE.LoadingManager(
            //Loaded
            () =>
            {
                this.trigger('loaded')
                
        
            },
            //Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                
                this.progressRatio = itemsLoaded / itemsTotal
                this.trigger('progress')
                
            }
        )
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    /**
     * Begins loading all the sources in the scene 
     */
    startLoading()
    {
        //Load each source
        for(const source of this.sources)
        {
            //If the source is a 3D model 
            if(source.type == 'gltfModel')
            {
                //Loads the 3D model 
                this.loaders.gltfLoader.load(
                    source.path, 
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            //If the source is a texture  
            else if(source.type == 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path, 
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            //If the source is a cube texture (for environment maps)
            else if(source.type == 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path, 
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    /**
     * Loads the source and increases the items loaded count
     * @param {object} source - the source being loaded
     * @param {path} file - The file path of the source
     */
    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++
        if(this.loaded == this.toLoad)
        {
            this.trigger('ready')
        }
    }
}