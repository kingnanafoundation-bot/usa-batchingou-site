document.addEventListener('DOMContentLoaded', () => {
  const slot = document.getElementById('site-footer-slot');
  if(!slot) return;
  slot.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="color:var(--parchment); margin-bottom:.8rem;">
            <span class="mark">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2 L36 20 L20 38 L4 20 Z" stroke="#B9902E" stroke-width="2"/>
                <path d="M20 10 L28 20 L20 30 L12 20 Z" fill="#8A2E1F"/>
              </svg>
            </span>
            <span style="color:var(--parchment);">USA Batchingou Community</span>
          </div>
          <p class="small" style="color:#c9bfa9; max-width:34ch;">A nonprofit cultural and mutual-aid association of Batchingou natives and friends living in the United States.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="about.html">About us</a></li>
            <li><a href="culture.html">Culture &amp; history</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="news.html">News</a></li>
          </ul>
        </div>
        <div>
          <h4>Get involved</h4>
          <ul>
            <li><a href="chapters.html">Find your chapter</a></li>
            <li><a href="membership.html">Become a member</a></li>
            <li><a href="contact.html">Contact us</a></li>
            <li><a href="contact.html">Volunteer</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>info@usabatchingou.org</li>
            <li>P.O. Box 1819, Silver Spring, MD</li>
            <li>Toll-free: 1 (800) 555-0142</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span class="year"></span> USA Batchingou Community. Sample contact details — replace with your official information.</span>
        <span>Mewaou? Hou Ki'ik kwa'ah Nihou' — "Are you well? We are together."</span>
      </div>
    </div>
  `;
});
