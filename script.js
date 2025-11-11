const list = document.getElementById('list');
const addBtn = document.getElementById('add');
const nameInput = document.getElementById('name');
const cityInput = document.getElementById('city');

let friends = JSON.parse(localStorage.getItem('tzbuddies')) || [];

function render() {
  list.innerHTML = '';
  friends.forEach(f => {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString('en-US', { timeZone: f.city });
    li.innerHTML = `<strong>${f.name}</strong> — ${f.city} 🕒 <span>${time}</span>`;
    list.appendChild(li);
  });
}

function updateTimes() {
  document.querySelectorAll('li').forEach((li, i) => {
    const time = new Date().toLocaleTimeString('en-US', { timeZone: friends[i].city });
    li.querySelector('span').textContent = time;
  });
}

addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const city = cityInput.value.trim();
  if (!name || !city) return alert('Please enter both name and city');
  friends.push({ name, city });
  localStorage.setItem('tzbuddies', JSON.stringify(friends));
  render();
  nameInput.value = cityInput.value = '';
});

setInterval(updateTimes, 60000);
render();
