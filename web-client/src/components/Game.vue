<template>
    <div class="game-screen">
        <div>WASD to move</div>
        <div>space to shoot (proper physics to come)</div>
        <div id="fps-display"></div>
        <canvas id="background-canvas" width="1200" height="720" z-index='3'/>
        <canvas id="game-canvas" width="1200" height="720" tabindex='1'/>
        <canvas id="ui-canvas" width="1200" height="720" tabindex='2'/>
    </div>
</template>

<script>
    import { main } from '../../../game/dst/main.js'

    export default {
        name: 'Game',
        mounted() {
            main()
        }
    }    
</script>

<style scoped>
    canvas {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
</style>