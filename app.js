// Tokenized Wealth Ecosystem — teaser site interactions
(function () {
  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // scrollspy — only active on the single-page build (nav links that are #anchors)
  var anchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (anchors.length && 'IntersectionObserver' in window) {
    var map = {};
    anchors.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = id && document.getElementById(id);
      if (sec) map[id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          anchors.forEach(function (a) { a.classList.remove('active'); });
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }
})();

// AJAX form submit — stay on page, show inline success (Formspree)
(function () {
  var form = document.querySelector('form.form');
  if (!form) return;
  var ok = document.getElementById('form-success');
  var err = document.getElementById('form-error');
  function showErr(msg){ if(err){ err.textContent = msg; err.style.display='block'; } }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (err) err.style.display='none';
    var btn = form.querySelector('button[type="submit"]');
    var original = btn ? btn.innerHTML : '';
    if (btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
    fetch(form.action, { method:'POST', body:new FormData(form), headers:{ 'Accept':'application/json' } })
      .then(function (r) {
        if (r.ok) {
          form.style.display = 'none';
          if (ok) ok.style.display = 'block';
        } else {
          r.json().then(function (d) {
            if (btn){ btn.disabled=false; btn.innerHTML=original; }
            showErr(d && d.errors ? d.errors.map(function(x){return x.message;}).join(', ') : 'Something went wrong — please try again.');
          }).catch(function () {
            if (btn){ btn.disabled=false; btn.innerHTML=original; }
            showErr('Something went wrong — please try again.');
          });
        }
      })
      .catch(function () {
        if (btn){ btn.disabled=false; btn.innerHTML=original; }
        showErr('Network error — please try again.');
      });
  });
})();
