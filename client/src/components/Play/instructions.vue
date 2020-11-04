<template>
    <article id="instructions">
        <p><b>How to play:</b></p>
        <p>You’ll see a flag in the top left of your screen.</p>
            <ul>
                <li>Click a country on the map to make your guess</li>
                <li>Correct answers will turn green!</li>
                <li>Click 'next flag' to continue playing</li>
            </ul>
        <p>Keep going until you paint the whole globe green!</p>        
    </article>
</template>

<script>
export default {
    name: 'instructions',
}
</script>

<style scoped>
#instructions {
    border: solid;
    padding: 10px 20px;
    margin: 30px;
    width: 500px;
}

</style>