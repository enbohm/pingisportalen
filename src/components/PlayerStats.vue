<template>
    <input type="text" v-model="searchInput" placeholder="Efternamn förnamn..." id="searchPlayer" />
    <button @click="clearSearch">Rensa</button>
    <div class="item player" v-for="player in filteredList" :key="player">
        <a href="#" @click="selectPlayer($event, player)">{{ Object.values(player)[0] }}</a>
    </div>
    <div class="item error" v-if="searchInput && !filteredList.length">
        <p>Hittar ingen spelare med namn {{ searchInput }}!</p>
    </div>

    <div class="tabcontainer">
        <div class="tab">
            <button class="tablinks" @click="openTab($event, 'bar')">Poäng</button>
            <button class="tablinks" @click="openTab($event, 'line')">Summering</button>
            <button class="tablinks" @click="openTab($event, 'trend')">Trend</button>
        </div>
        <BarChart :chart-data="barChartData" :chart-options="chartOptions" />
        <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />
        <div id="trend" class="tabcontent">
            <p>Trending players...</p>
        </div>
    </div>
</template>

<script>
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'

import csv from '../data/p14.csv';
export default {
    name: "SearchPlayer",
    components: {
        BarChart,
        LineChart
    },
    data() {
        const tourLables = ['Halmstad', 'Rekordspelen', 'Ängby', 'Flyman', 'Söderspelen', 'Eslövsspelen', 'Safir', 'Spårvägsspelen'];
        return {
            selectedPlayers: [],
            searchInput: '',
            barChartData: {
                labels: tourLables,
                datasets: [{
                    backgroundColor: '#33BBFF'
                }, {
                    backgroundColor: 'red',
                    label: ""
                }],
                chartId: "bar-chart"
            },
            lineChartData: {
                labels: tourLables,
                datasets: [{
                    data: [9, 16, 9, 0, 0, 0, 0, 0],
                    backgroundColor: '#33BBFF',
                    borderColor: '#33BBFF',
                    label: "Noah af E"
                },
                {
                    data: [9, 5, 16, 0, 0, 0, 0, 0],
                    backgroundColor: 'red',
                    borderColor: 'red',
                    label: "Axel von G"
                }],
                chartId: "bar-chart"
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                tooltips: {
                    mode: 'index',
                    callbacks: {
                        label(tooltipItem, data) {
                            const label = data.datasets[tooltipItem.datasetIndex].label;
                            const value = numeral(tooltipItem.yLabel).format('0,0');
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    },
    methods: {
        clearSearch: function (evt) {
            document.getElementById("searchPlayer").value = "";
            document.getElementsByClassName("tabcontainer")[0].style.visibility = "hidden";
            this.selectedPlayers.length = 0;
            this.searchInput = '';
            this.barChartData.datasets[0].data.length = 0;
            this.barChartData.datasets[0].label = '';
            if (this.selectedPlayers.length > 1) {
                this.barChartData.datasets[1].data.length = 0;
                this.barChartData.datasets[1].label = '';
            }
        },
        selectPlayer: function (evt, player) {
            if (this.selectedPlayers.length == 0) {
                this.selectedPlayers[0] = player;
            }
            else {
                this.selectedPlayers[1] = player;
            }
            this.searchInput = Object.values(player)[0];
            document.getElementsByClassName("tabcontainer")[0].style.visibility = "visible";
            document.getElementsByClassName("tablinks")[0].className += " active"
            document.getElementById('bar').style.display = "block";
            document.getElementById('bar').className += " active";
            const playerOne = this.selectedPlayers[0];
            this.barChartData.datasets[0].label = Object.values(playerOne)[0];
            this.barChartData.datasets[0].data = [playerOne.p1, playerOne.p2, playerOne.p3, playerOne.p4, playerOne.p5, playerOne.p6, playerOne.p7, playerOne.p8];
            if (this.selectedPlayers.length > 1) {
                const playerTwo = this.selectedPlayers[1];
                this.barChartData.datasets[1].label = Object.values(playerTwo)[0]
                this.barChartData.datasets[1].data = [playerTwo.p1, playerTwo.p2, playerTwo.p3, playerTwo.p4, playerTwo.p5, playerTwo.p6, playerTwo.p7, playerTwo.p8];
            }
        },
        openTab: function (evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace("active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    },
    computed: {
        filteredList() {
            if (!this.searchInput)
                return "";
            return csv.filter((player) =>
                Object.values(player)[0].toLowerCase().includes(this.searchInput.toLowerCase()));
        }
    }
};
</script>

<style scoped>
.tabcontainer {
    visibility: hidden;
}

.tab {
    overflow: hidden;
    border-bottom: 1px solid #ccc;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
    color: var(--color-text);
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: var(--vt-c-black-soft);
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: var(--vt-c-black-soft);
}
</style>