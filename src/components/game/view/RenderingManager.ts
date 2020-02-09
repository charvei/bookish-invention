import Renderer from './renderer.js'

class RenderingManager {
    renderer: Renderer
    context: CanvasRenderingContext2D

    constructor(worldContext: CanvasRenderingContext2D, foregroundContext: CanvasRenderingContext2D, canvasProps: {height: number, width: number} ) {
        //load grid and colours
        //this.colours = new Colours(context)

        // colours and gamegrid need to be passed to renderer... is this a sign that i need to refactor renderer?
        this.renderer = new Renderer(worldContext, foregroundContext, canvasProps)
    }

    getRenderer = () => {
        return this.renderer
    }

}

export default RenderingManager