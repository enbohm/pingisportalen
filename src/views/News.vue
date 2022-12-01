<template>

    <rss-widget
        feed="https://api.rss2json.com/v1/api.json?rss_url=https://www.svenskbordtennis.com/Nyheter/Pingisnytt/?rss=True">

        <template v-slot:feed_header="slotProps">
            <h2 slot="title" v-html="slotProps.rssfeed.title"></h2>
        </template>

        <template v-slot:feed_body="slotProps">
            <ul>
                <li v-for="(item, i) in slotProps.items" :key="i">
                    <div class="card">
                        <div class="card-header">
                            <h4><a :href="item.link" target="_blank">{{ item.title }}</a></h4>
                        </div>
                        <div class="card-body">
                            <span slot="body" v-html="item.description"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
    </rss-widget>

</template>
  
<script>
import RssWidget from '../components/RssWidget.vue'
export default {
    name: 'app',
    components: {
        RssWidget
    }
}
</script>
  
<style scoped>
h4 {
    margin: 0px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

</style>