<template>
    <h2>Träning och utveckling</h2>
    <p>Nedan hittar du olika material som kan underlätta träning och utveckling, eller kanske inspiration till nya
        övningar?</p>
    <h3>Övningar</h3>
    <ul>
        <li>Klassiska pingisövningar (kontrollövningar, fotarbeter, offensiva, mm) finns i detta material <a
                href="/pingisovningar.pdf" target="blank_">Pingisövningar</a></li>
        <li>"Bordtennis från början" i 20 lektioner från Norrlands BTK finns i materialet <a
                href="/nbtf-pingisskola.pdf" target="blank_">Pingisskola från början</a></li>
        <li>"Pingisskola 10 lektioner" från Svenska bordtennisförbundet finns i materialet <a
                href="/pingisskola-10-lektioner.pdf" target="blank_">Pingisskola tio lektioner</a></li>
    </ul>
    <h3>Serve</h3>
    <p>Kanske ett av de viktigaste slagen men övas inte alltid lika flitigt. Kika in på nedan videor som visar "Snake
        serve" och "Kick serve" hur man kan med samma serverrörelse få varierad skruv.</p>
    <div class="youtube-video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Q1poA30eT84" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/yQ0UVKPK9Ps" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/EuXKHxRcRbQ" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    </div>



</template>

<style scoped>
.youtube-video-container {
    position: relative;
    overflow: hidden;
    width: 90%;
}

@media only screen and (max-width: 600px) {
    .youtube-video-container {
        width: 100%;
    }
}

.youtube-video-container::after {
    display: block;
    content: "";
    padding-top: 56.25%;
}

.youtube-video-container iframe {
    position: relative;
    top: 0;
    left: 0;
    width: 33%;
    height: 33%;
    padding: 2px;
}
</style>
