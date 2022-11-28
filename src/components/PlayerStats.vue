<template>

    <select v-model="playerClass" @change="clearSelectedPlayers" id="playerClassOptions">
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
        <p>Hittar ingen spelare med namn {{ searchInput }} i klassen {{ playerClass }}!</p>
    </div>

    <div class="tabcontainer">
        <div class="tab">
            <button class="tablinks" @click="openTab($event, 'bar')">Poäng</button>
            <button class="tablinks" @click="openTab($event, 'line')">Summering</button>
            <button class="tablinks" @click="openTab($event, 'top12')">Top 20</button>
            <button class="tablinks" @click="openTab($event, 'trend')">Trend</button>
        </div>
        <div id="bar" class="tabcontent">
            <BarChart :chart-data="barChartData" :chart-options="chartOptions" />
        </div>
        <div id="line" class="tabcontent">
            <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />
        </div>

        <div id="top12" class="tabcontent">
            <div class="item player" v-for="(player, index) in top20">
                {{ ++index }}. {{ Object.values(player)[0] }} {{ player.total }} poäng.
            </div>
        </div>

        <div id="trend" class="tabcontent">
           Poängtrend (differens) från de två senaste tävlingarna.
            <div class="item player" v-for="player in selectedPlayers">
                {{ Object.values(player)[0] }}
                <i :class="this.trendIconClass(player)" aria-hidden="true"></i>
                {{ this.trendValue(player) }}
            </div>
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

import currentRound from '../data/currentRound.csv'

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
        const noPlayerSelected = 'Ingen spelare vald'
        return {
            playerClass: 'F12',
            selectedPlayers: [],
            searchInput: '',
            noPlayerSelectedLabel: noPlayerSelected,
            barChartData: {
                labels: tourLables,
                datasets: [{
                    data: [],
                    backgroundColor: playerOneColor,
                    label: noPlayerSelected
                },
                {
                    data: [],
                    backgroundColor: 'red',
                    label: noPlayerSelected
                }],
                chartId: "bar-chart"
            },
            lineChartData: {
                labels: tourLables,
                datasets: [{
                    backgroundColor: playerOneColor,
                    borderColor: playerOneColor,
                    label: noPlayerSelected
                },
                {
                    data: [],
                    backgroundColor: playerTwoColor,
                    borderColor: playerTwoColor,
                    label: noPlayerSelected
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
            var i, tablinks;
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replaceAll("active", "");
            }
            this.searchInput = '';
            this.clearSelectedPlayers();
        },
        clearSelectedPlayers: function () {
            for (let i = 0; i < this.selectedPlayers.length; i++) {
                this.barChartData.datasets[i].data.length = 0;
                this.barChartData.datasets[i].label = this.noPlayerSelectedLabel;
                this.lineChartData.datasets[i].data.length = 0;
                this.lineChartData.datasets[i].label = this.noPlayerSelectedLabel;
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
            var i, tablinks;
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replaceAll("active", "");
            }
            document.getElementsByClassName("tablinks")[0].className = "tablinks active"
            document.getElementById('bar').style.display = "block";

            var currentPlayer;
            for (let i = 0; i < this.selectedPlayers.length; i++) {
                currentPlayer = this.selectedPlayers[i];
                this.barChartData.datasets[i].label = Object.values(currentPlayer)[0];
                this.barChartData.datasets[i].data = [currentPlayer.p1, currentPlayer.p2, currentPlayer.p3, currentPlayer.p4, currentPlayer.p5, currentPlayer.p6, currentPlayer.p7, currentPlayer.p8];
                this.lineChartData.datasets[i].label = Object.values(currentPlayer)[0];
                this.lineChartData.datasets[i].data = this.sum([currentPlayer.p1, currentPlayer.p2, currentPlayer.p3, currentPlayer.p4, currentPlayer.p5, currentPlayer.p6, currentPlayer.p7, currentPlayer.p8], 0, []);
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
                tablinks[i].className = tablinks[i].className.replaceAll("active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className = "tablinks active";
        },
        sum: function (array, index, result) {
            if (index == 7) {
                return result;
            }
            if (index == 0) {
                result.push(array[index]);
                return this.sum(array, index + 1, result);
            }
            result.push((+result[index - 1] + +array[index]).toString())
            return this.sum(array, index + 1, result);
        },
        trendValue: function (player) {
            const offset = 2;
            const index = offset + +Object.values(currentRound[0]);
            //compare last two points from the competitions
            let val1 = Object.values(player)[index - 1];
            let val2 = Object.values(player)[index - 2];
            return val1 - val2;
        },
        trendIconClass: function (player) {
            let diff = this.trendValue(player);
            if (diff > 0)
                return "fa fa-arrow-up green-color"
            if (diff == 0)
                return "fa fa-arrow-right yellow-color"
            return "fa fa-arrow-down red-color"
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
#playerClassOptions {
    margin-left: 5px;
}

#searchPlayer {
    margin: 5px;
}

.tab {
    overflow: hidden;
    border-bottom: 1px solid #ccc;
}

.tabcontent {
    display: none;
    padding: 6px 12px;
    border-top: none;
    position: relative;
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

.green-color {
    color: green;
}

.yellow-color {
    color: yellow;
}

.red-color {
    color: red;
}
</style>