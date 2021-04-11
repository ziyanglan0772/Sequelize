window.onload = function () {
  const host = 'http://localhost:3000';

  async function get(url) {
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

  async function init() {
    const data = await getDinningList();
    appendTable(data);
  }

  init();
};
