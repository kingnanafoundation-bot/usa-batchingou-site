// ===================== USA Batchingou Community — shared script =====================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initYear();
  initForms();
  initCalendar();
  initStates();
});

/* ---------------- Mobile nav ---------------- */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

function initYear(){
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------------- Forms (contact / membership / newsletter) ----------------
   No backend is wired up in this static build. Submissions are confirmed
   in-page only. To go live, point each <form> at a service such as
   Formspree, Basin, or a custom API endpoint and remove preventDefault(). */
function initForms(){
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      const msg = form.querySelector('.form-msg');
      if(msg){
        msg.classList.add('show');
        msg.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
      form.reset();
    });
  });
}

/* ---------------- Calendar ---------------- */
const SAMPLE_EVENTS = [
  { date: '2026-07-11', title: 'State Coordinators Call' },
  { date: '2026-07-18', title: 'Youth Heritage Workshop' },
  { date: '2026-07-25', title: 'Kougang Dance Rehearsal' },
  { date: '2026-08-01', title: 'Back-to-School Drive Kickoff' },
  { date: '2026-08-15', title: 'Annual General Assembly' },
  { date: '2026-08-29', title: 'Regional Picnic — East Coast' },
  { date: '2026-09-05', title: 'Village Fund Gala' },
  { date: '2026-09-19', title: 'Cultural Night' },
];

function initCalendar(){
  const grid = document.getElementById('calGrid');
  if(!grid) return;

  let current = new Date();
  current.setDate(1);

  const monthLabel = document.getElementById('calMonthLabel');
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');

  function render(){
    grid.innerHTML = '';
    const year = current.getFullYear();
    const month = current.getMonth();
    monthLabel.textContent = current.toLocaleDateString('en-US', { month:'long', year:'numeric' });

    const dows = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dows.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-dow';
      el.textContent = d;
      grid.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const todayStr = new Date().toISOString().slice(0,10);

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    for(let i = 0; i < totalCells; i++){
      const cell = document.createElement('div');
      let dayNum, cellMonth = month, cellYear = year, otherMonth = false;

      if(i < firstDay){
        dayNum = daysInPrevMonth - firstDay + i + 1;
        cellMonth = month - 1;
        otherMonth = true;
      } else if(i >= firstDay + daysInMonth){
        dayNum = i - firstDay - daysInMonth + 1;
        cellMonth = month + 1;
        otherMonth = true;
      } else {
        dayNum = i - firstDay + 1;
      }

      const cellDate = new Date(cellYear, cellMonth, dayNum);
      const iso = cellDate.toISOString().slice(0,10);

      cell.className = 'cal-cell' + (otherMonth ? ' other-month' : '') + (iso === todayStr ? ' today' : '');
      cell.innerHTML = `<span class="d-num">${dayNum}</span>`;

      SAMPLE_EVENTS.filter(ev => ev.date === iso).forEach(ev => {
        const tag = document.createElement('span');
        tag.className = 'cal-event';
        tag.textContent = ev.title;
        tag.title = ev.title;
        cell.appendChild(tag);
      });

      grid.appendChild(cell);
    }
  }

  prevBtn.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); render(); });
  nextBtn.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); render(); });

  render();
}

/* ---------------- States directory ---------------- */
const STATES = [
  ['AL','Alabama','South'],['AK','Alaska','West'],['AZ','Arizona','West'],['AR','Arkansas','South'],
  ['CA','California','West'],['CO','Colorado','West'],['CT','Connecticut','Northeast'],['DE','Delaware','Northeast'],
  ['FL','Florida','South'],['GA','Georgia','South'],['HI','Hawaii','West'],['ID','Idaho','West'],
  ['IL','Illinois','Midwest'],['IN','Indiana','Midwest'],['IA','Iowa','Midwest'],['KS','Kansas','Midwest'],
  ['KY','Kentucky','South'],['LA','Louisiana','South'],['ME','Maine','Northeast'],['MD','Maryland','Northeast'],
  ['MA','Massachusetts','Northeast'],['MI','Michigan','Midwest'],['MN','Minnesota','Midwest'],['MS','Mississippi','South'],
  ['MO','Missouri','Midwest'],['MT','Montana','West'],['NE','Nebraska','Midwest'],['NV','Nevada','West'],
  ['NH','New Hampshire','Northeast'],['NJ','New Jersey','Northeast'],['NM','New Mexico','West'],['NY','New York','Northeast'],
  ['NC','North Carolina','South'],['ND','North Dakota','Midwest'],['OH','Ohio','Midwest'],['OK','Oklahoma','South'],
  ['OR','Oregon','West'],['PA','Pennsylvania','Northeast'],['RI','Rhode Island','Northeast'],['SC','South Carolina','South'],
  ['SD','South Dakota','Midwest'],['TN','Tennessee','South'],['TX','Texas','South'],['UT','Utah','West'],
  ['VT','Vermont','Northeast'],['VA','Virginia','South'],['WA','Washington','West'],['WV','West Virginia','South'],
  ['WI','Wisconsin','Midwest'],['WY','Wyoming','West'],['DC','District of Columbia','Northeast'],
];

// A handful of states are marked "active" to demonstrate the directory.
// Replace with your real chapter roster.
const ACTIVE_STATES = new Set(['MD','VA','DC','TX','GA','CA','NY','NC']);

function initStates(){
  const grid = document.getElementById('stateGrid');
  if(!grid) return;

  const searchInput = document.getElementById('stateSearch');
  const tabs = document.querySelectorAll('.region-tabs button');
  let activeRegion = 'All';

  function render(){
    const query = (searchInput.value || '').trim().toLowerCase();
    grid.innerHTML = '';
    const filtered = STATES.filter(([abbr, name, region]) => {
      const matchesRegion = activeRegion === 'All' || region === activeRegion;
      const matchesQuery = !query || name.toLowerCase().includes(query) || abbr.toLowerCase().includes(query);
      return matchesRegion && matchesQuery;
    });

    if(filtered.length === 0){
      grid.innerHTML = '<div class="state-empty">No states match your search. Try another name.</div>';
      return;
    }

    filtered.forEach(([abbr, name, region]) => {
      const isActive = ACTIVE_STATES.has(abbr);
      const card = document.createElement('div');
      card.className = 'state-card';
      card.innerHTML = `
        <span class="abbr">${abbr} · ${region}</span>
        <h4>${name}</h4>
        <p>${isActive ? 'Chapter coordinator in place' : 'No coordinator yet — be the first'}</p>
        <span class="status ${isActive ? 'active' : 'open'}">${isActive ? '● Active chapter' : '○ Open — start one'}</span>
      `;
      grid.appendChild(card);
    });
  }

  searchInput.addEventListener('input', render);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRegion = tab.dataset.region;
      render();
    });
  });

  render();
}
