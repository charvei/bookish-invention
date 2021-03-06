import CharacterManager from './managers/CharacterManager'
import PlatformManager from './managers/PlatformManager.js'
import Character from './objects/character/Character'
import Entity from './objects/base/Entity'
import BackgroundManager from './background/BackgroundManager.js'
import ProjectileManager from './managers/ProjectileManager'
import WorldPhysics from './WorldPhysics'

import {
    BoxCoords,
    CollisionVectors,
    CollisionResult,
    PhysicsEntity
} from "../Types"
import Projectile from './objects/projectiles/Projectile'

/**
 * Store world elements / managers
 */
class WorldManager {
    characterManager: CharacterManager
    platformManager: PlatformManager
    backgroundManager: BackgroundManager
    projectileManager: ProjectileManager
    context: CanvasRenderingContext2D
    worldPhysics: WorldPhysics

    constructor(context: CanvasRenderingContext2D, backgroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number}) {
        this.platformManager = new PlatformManager()
        this.characterManager = new CharacterManager()
        this.projectileManager = new ProjectileManager()
        this.worldPhysics = new WorldPhysics(this.platformManager)
        
        this.backgroundManager = new BackgroundManager(backgroundContext, canvasProps)
        this.context = context  
    }

    getPlatformManager = () => {
        return this.platformManager
    }

    getBackgroundManager = () => {
        return this.backgroundManager
    }

    getProjectileManager = () => {
        return this.projectileManager
    }


    /* A potential idea may be to on-board tickable managers somewhere in worldmanager,
    then since they all implement tickable or whatever just iterate through an array of them
    their .tick function */
    updateWorld = (delta: number) => {
        this.characterManager.tick(delta, this)
        this.getProjectileManager().tick(delta, this)
        this.getPlatformManager().tick(delta, this)
        // If we have multiple types of characters then we can create different managers for them and put them under characterManager
        // e.g. PlayerCharacter, Enemies, 
        // Potentially (and very possibly the correct choice) create a higher level class called entities, then fit Characters under that even, then we can put in 'Boundaries', 'missiles', etc under entities in the world too.  
    }

    updateBackground = (delta: number) => {
        this.backgroundManager.updateBackground(delta)
    }

}

/**
 * TODO:
 *  - Better jump. Want character to jump once and maybe a little higher if jump button held
 */

export default WorldManager