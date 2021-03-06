import PlatformManager from './managers/PlatformManager.js'

import Entity from './objects/base/Entity'

import {
    BoxCoords,
    CollisionVectors,
    CollisionResult,
    PhysicsEntity
} from "../Types"

class WorldPhysics {
    platformManager: PlatformManager    // ONLY COLLISIONS WITH PLATFORMS ARE BEING CHECKED... THIS NEEDS TO BE EXPANDED FOR OTHER TYPES OF COLLISIONS

    constructor(platformManager: PlatformManager) {
        this.platformManager = platformManager
    }

    getTouchRelationship = (thisEntity: Entity, otherEntity: Entity): CollisionResult => {
        let touchResult: CollisionResult = {
            didCollide: false,
            vectors: {
                top: 0, 
                bottom: 0, 
                left: 0, 
                right: 0
            }
        }

        let thisBox: BoxCoords = thisEntity.getBoxCoords(-1, 1, -1, 1)
        let otherBox: BoxCoords = otherEntity.getBoxCoords()

        touchResult.vectors = this.getCollisionVectors(thisBox, otherBox)
        
        if (this.isCollision(thisBox, otherBox)) {
            touchResult.didCollide = true
        }

        return touchResult
    }

    getCollisions = (characterTrajectory: BoxCoords): CollisionVectors[] => {
        let collisions: CollisionVectors[] = []

        this.platformManager.getEntityList().forEach((entity: Entity) => {
            // entityBox i.e. the OTHER entity, the platform
            let entityBox: BoxCoords = entity.getBoxCoords()

            if (this.isCollision(characterTrajectory, entityBox)) {
                collisions.push(this.getCollisionVectors(characterTrajectory, entityBox))
            }
        })

        return collisions
    }


    isCollision = (subjectBox: BoxCoords, otherBox: BoxCoords): boolean => {
        if (subjectBox.bottom <= otherBox.top) {
            return false
        }
        if (subjectBox.top >= otherBox.bottom) {
            return false
        }
        if (subjectBox.right <= otherBox.left) {
            return false
        }
        if (subjectBox.left >= otherBox.right) {
            return false
        }
        return true
    }

    getCollisionVectors = (subjectBox: BoxCoords, otherBox: BoxCoords): CollisionVectors => {
        let collisionVectors: CollisionVectors = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }

        if (subjectBox.top <= otherBox.bottom && subjectBox.top >= otherBox.top) {
            collisionVectors.top = subjectBox.top - otherBox.bottom
        }
        if (subjectBox.bottom >= otherBox.top && subjectBox.bottom <= otherBox.bottom) {
            collisionVectors.bottom = subjectBox.bottom - otherBox.top
        }
        if (subjectBox.left <= otherBox.right && subjectBox.left >= otherBox.left) {
            collisionVectors.left = subjectBox.left - otherBox.right
        }
        if (subjectBox.right >= otherBox.left && subjectBox.right <= otherBox.right) {
            collisionVectors.right = subjectBox.right - otherBox.left
        }

        return collisionVectors
    }

}

export default WorldPhysics