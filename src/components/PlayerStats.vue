<template>

    <select v-model="playerClass" id="playerClassOptions">
        <option>F12</option>
        <option>P12</option>
        <option>F14</option>
        <option>P14</option>
        <option>F16</option>
        <option>P16</option>
        <option>D18</option>
        <option>H18</option>
        <option>D20</option>
        <option>H20</option>
        <option>DE</option>
        <option>HE</option>
    </select>

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
            <button class="tablinks" @click="openTab($event, 'top12')">Top 20</button>
            <button class="tablinks" @click="openTab($event, 'trend')">Trend</button>
        </div>
        <BarChart :chart-data="barChartData" :chart-options="chartOptions" />
        <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />

        <div id="top12" class="tabcontent">
            <div class="item player" v-for="(player, index) in top20" :key="player">
                {{ ++index }}. {{ Object.values(player)[0] }} {{ player.total }} poäng.
            </div>
        </div>

        <div id="trend" class="tabcontent">
            Trending player data to come...
        </div>
    </div>
</template>

<script>

import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'

import p12Data from '../data/p12.csv'
import p14Data from '../data/p14.csv'
import p16Data from '../data/p16.csv'
import h18Data from '../data/h18.csv'
import h20Data from '../data/h20.csv'
import heData from '../data/he.csv'

import f12Data from '../data/f12.csv'
import f14Data from '../data/f14.csv'
import f16Data from '../data/f16.csv'
import d18Data from '../data/d18.csv'
import d20Data from '../data/d20.csv'
import deData from '../data/de.csv'

export default {
    name: "SearchPlayer",
    components: {
        BarChart,
        LineChart
    },
    data() {
        const tourLables = ['Halmstad', 'Rekordspelen', 'Ängby', 'Flyman', 'Söderspelen', 'Eslövsspelen', 'Safir', 'Spårvägsspelen'];
        const playerOneColor = '#33BBFF'
        const playerTwoColor = 'red';
        return {
            playerClass: 'F12',
            selectedPlayers: [],
            searchInput: '',
            barChartData: {
                labels: tourLables,
                datasets: [{
                    backgroundColor: playerOneColor
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'red',
                    label: ''
                }],
                chartId: "bar-chart"
            },
            lineChartData: {
                labels: tourLables,
                datasets: [{
                    backgroundColor: playerOneColor,
                    borderColor: playerOneColor
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: playerTwoColor,
                    borderColor: playerTwoColor,
                    label: ''
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
            this.searchInput = '';

            this.barChartData.datasets[0].data.length = 0;
            this.barChartData.datasets[0].label = '';
            this.lineChartData.datasets[0].data.length = 0;
            this.lineChartData.datasets[0].label = '';

            if (this.selectedPlayers.length > 1) {
                this.barChartData.datasets[1].data.length = 0;
                this.barChartData.datasets[1].label = '';
                this.lineChartData.datasets[1].data.length = 0;
                this.lineChartData.datasets[1].label = '';
            }
            this.selectedPlayers.length = 0;
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
            this.lineChartData.datasets[0].label = Object.values(playerOne)[0];
            this.lineChartData.datasets[0].data = [playerOne.p1, playerOne.p2, playerOne.p3, playerOne.p4, playerOne.p5, playerOne.p6, playerOne.p7, playerOne.p8];
            if (this.selectedPlayers.length > 1) {
                const playerTwo = this.selectedPlayers[1];
                this.barChartData.datasets[1].label = Object.values(playerTwo)[0]
                this.barChartData.datasets[1].data = [playerTwo.p1, playerTwo.p2, playerTwo.p3, playerTwo.p4, playerTwo.p5, playerTwo.p6, playerTwo.p7, playerTwo.p8];
                this.lineChartData.datasets[1].label = Object.values(playerTwo)[0]
                this.lineChartData.datasets[1].data = [playerTwo.p1, playerTwo.p2, playerTwo.p3, playerTwo.p4, playerTwo.p5, playerTwo.p6, playerTwo.p7, playerTwo.p8];
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
        },
        getDataFromSelectedClass: function (playerClass) {
            switch (playerClass) {
                case 'F12':
                    return f12Data;
                case 'F14':
                    return f14Data;
                case 'F16':
                    return f16Data;
                case 'D18':
                    return d18Data;
                case 'D20':
                    return d20Data;
                case 'DE':
                    return deData;
                case 'P12':
                    return p12Data;
                case 'P14':
                    return p14Data;
                case 'P16':
                    return p16Data;
                case 'H18':
                    return h18Data;
                case 'H20':
                    return h20Data;
                default:
                    return heData;
            }
        }
    },
    computed: {
        filteredList() {
            if (!this.searchInput)
                return "";
            return this.getDataFromSelectedClass(this.playerClass).filter((player) =>
                Object.values(player)[0].toLowerCase().includes(this.searchInput.toLowerCase()));
        },
        top20() {
            const sorted = [...this.getDataFromSelectedClass(this.playerClass)];
            return sorted.sort((p1, p2) => p2.total - p1.total).slice(0, 20);
        }
    }
}
</script>

<style scoped>
.tabcontainer {
    visibility: hidden;
}

#playerClassOptions {
    margin-left: 5px;
}

#searchPlayer {
    margin-left: 5px;
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
    background-color: var(--vt-c-white-mute);
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: var(--vt-c-white-mute);
}

@media (prefers-color-scheme: dark) {
    .tab button:hover {
        background-color: var(--vt-c-black-soft);
    }

    /* Create an active/current tablink class */
    .tab button.active {
        background-color: var(--vt-c-black-soft);
    }
}
</style>