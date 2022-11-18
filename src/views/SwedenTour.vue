<script>
import BarChart from '../components/BarChart.vue'

export default {
  name: 'SwedenTour',
  components: {
    BarChart
  },
  methods: {
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
  data() {
    return {
      chartData: {
        labels: ['Halmstad', 'Rekordspelen', 'Ängby', 'Flyman', 'Söderspelen', 'Eslövsspelen', 'Safir', 'Spårvägsspelen'],
        datasets: [{
          data: [9, 16, 9, 0, 0, 0, 0, 0],
          backgroundColor: '#33BBFF',
          label: "Jane Doe"
        },
        {
          data: [9, 5, 14, 0, 0, 0, 0, 0],
          backgroundColor: 'red',
          label: "John Doe"
        }],
        chartId: "bar-chart"
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      }
    }
  }
}
</script>
<template>
  <div class="info">
    <h2>Sweden Tour</h2>
    <p>Information om Sweden Tour kan du hitta på <a
        href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
        länk</a>. Nedan finns statisk om de olika spelarna på touren.</p>
  </div>
  <div class="tabcontainer">
    <div class="tab">
      <button class="tablinks" @click="openTab($event, 'bar')">Poäng</button>
      <button class="tablinks" @click="openTab($event, 'line')">Summering</button>
      <button class="tablinks" @click="openTab($event, 'trend')">Trend</button>
    </div>

    <BarChart :chart-data="chartData" :chart-options="chartOptions" />

    <div id="line" class="tabcontent">
      <p>Line graph of points coming here...</p>
    </div>

    <div id="trend" class="tabcontent">
      <p>Trending players...</p>
    </div>
  </div>

</template>

<style>
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