<template>
    <article id="instructions-container">
        <geo-header></geo-header>
        <section id="instructions">
            <p><b>How to play:</b></p>
            <p>You’ll see a flag in the top left of your screen.</p>
                <ul>
                    <li>Click a country on the map to make your guess</li>
                    <li>Correct answers will get coloured in!</li>
                    <li>Click 'next flag' to continue playing</li>
                    <li>If you get stuck use the hints</li>
                    <li>You can zoom in on the map to find small countries</li>
                </ul>
            <p>Keep going until you paint the whole globe!</p>
            <router-link to="/play">
                <button id="back">Back to the game</button>
            </router-link>
        </section>

    </article>
</template>

<script>
import { eventBus } from '@/main';
import geoHeader from '../Header/header';

export default {
    name: 'instructions',
    components: {
        'geo-header': geoHeader
    },
}
</script>

<style scoped>

#instructions-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 95vh;
}

#instructions {
    margin: auto;
    width: 30%;
    padding: 10px;
}
#back {
    display: block;
    margin: 50px auto;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#back:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}


</style>
