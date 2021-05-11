window.onload = function () {
  const host = '';
    
  async function get(url) {
    console.log(`${host}${url}`);
    const res = await fetch(`${host}${url}`);
    const data = await res.json();
    return data;
  }

  function getTrDom(data) {
    const { hall_id, hall_name, hall_address } = data;
    const tr = document.createElement('tr');
    const id = getThDom(hall_id);
    tr.appendChild(id);
    const name = getTdDom(hall_name);
    tr.appendChild(name);
    const address = getTdDom(hall_address);
    tr.appendChild(address);
    return tr;
  }

  function getThDom(data) {
    const th = document.createElement('th');
    th.innerHTML = data;
    return th;
  }

  function getTdDom(data) {
    const td = document.createElement('td');
    td.innerHTML = data;
    return td;
  }

  async function getDinningList() {
    const res = await get('/api/dining');
    return res.data;
  }

  function appendTable(data) {
    const tbody = document.getElementById('dininghalltable');
    data.forEach((element) => {
      const tdDom = getTrDom(element);
      tbody.appendChild(tdDom);
    });
  }

  function getRandomArray(max, length) {
    const arr = [];
    for (let index = 0; index < length; index++) {
      arr.push(Math.floor(Math.random() * max));
    }
    return arr;
  }

  async function getData() {
    const mealList = await get('/api/meals/');
    const randomArray = getRandomArray(mealList.length, 10);
    const data = await Promise.all(randomArray.map(async (item) => {
      const meal = mealList[item];
      const res = await get(`/api/macros/${meal.meal_id}`);
      const macros = res[0];
      const obj = {
        type: 'stackedBar',
        name: meal.meal_name,
        showInLegend: 'true',
        dataPoints: [
          { label: 'calories', x: 1, y: macros.calories },
          { label: 'carbs', x: 2, y: macros.carbs },
          { label: 'cholesterol', x: 3, y: macros.cholesterol },
          { label: 'fat', x: 4, y: macros.fat },
          { label: 'protein', x: 5, y: macros.protein },
          { label: 'serving_size', x: 6, y: macros.serving_size },
          { label: 'sodium', x: 7, y: macros.sodium }
        ]
      };
      return obj;
    }));
    return data;
  }

  function initChart(data) {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Meal Macros'
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: data
    });

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    chart.render();
  }

  async function init() {
    const data = await getData();
    initChart(data);
    const dinningData = await getDinningList();
    appendTable(dinningData);
  }

  init();
};
