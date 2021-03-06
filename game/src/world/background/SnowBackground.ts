import {
    Particle,
    Renderable
} from "../../Types"

/**
 * Implementation of a background. I have not made a base background yet, so this should be extracted at some point.
 */
class SnowBackground {
    //opacity: number = 0.5
    particleDensity: number = 0.20
    maxParticles: number = 500

    startingYPos: number = -5
    maxXSpeed: number = 1

    backgroundContext: CanvasRenderingContext2D
    canvasProps: {height: number, width: number}

    particles: Particle[] = []

    constructor(backgroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        this.backgroundContext = backgroundContext
        this.canvasProps = canvasProps
    }

    getRenderables = (): Renderable[] => {
        return this.particles.map((particle) => {
            return {
                xPos: particle.xPos,
                yPos: particle.yPos,
                width: particle.width,
                height: particle.height,
                colour: particle.colour
            }
        })
    } 

    createNewParticles = (): void => {
        for (let i: number = 0; i < 2; i++) {
            // Create 2 particles per row
            // randomize these properties to a certain extent later
            let particle: Particle = {
                colour: "rgba(255, 255, 255, 0.5)",
                width: Math.random() * 2,
                height: Math.random() * 2,
                xPos: Math.random() * this.canvasProps.width,
                yPos: this.startingYPos,
                xDirection: 0.1,
                xSpeed: 0,
                ySpeed: 0.2 + Math.random() * 1.25,
                opacity: 0.5
            }
            this.particles.push(particle)
        }
    }

    update = (delta: number): void => {
        if (this.particles.length < this.maxParticles) {
            this.createNewParticles()
        }
        
        this.particles.forEach((particle) => {
            particle.yPos += particle.ySpeed;

            // how frequent direction changes are
            if (Math.random() < 0.95) {
                particle.xDirection = particle.xDirection * -1
            }
            if (!((particle.xSpeed) > 1)) {
                let windVariability = Math.random() * 0.075 //higher == more random 
                particle.xSpeed += particle.xDirection * windVariability
            }

            particle.xPos += particle.xSpeed
            
            // return from whence you came
            if (particle.yPos > this.canvasProps.height) {
                particle.yPos = this.startingYPos
                particle.xPos = Math.random() * this.canvasProps.width           
            }
        })
    }
}

export default SnowBackground