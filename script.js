(function(){
  // Ano atual no rodapé (© ano)
  document.getElementById('year').textContent = new Date().getFullYear();

  // Abre/fecha o menu no celular
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Destaca no menu a seção que está sendo vista ao rolar a página
  var sections = document.querySelectorAll('main section');
  var links = document.querySelectorAll('nav.links a');
  var map = {};
  links.forEach(function(l){ map[l.getAttribute('href').slice(1)] = l; });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      var link = map[entry.target.id];
      if(!link) return;
      if(entry.isIntersecting){
        links.forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(function(s){ observer.observe(s); });

  // Copia e-mail/telefone para a área de transferência e mostra um aviso rápido
  function showToast(msg){
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function(){ t.classList.remove('show'); }, 1800);
  }
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ showToast('Copiado: ' + text); });
      } else {
        showToast(text);
      }
    });
  });

  document.querySelector('.big-email').addEventListener('click', function(){
    if(navigator.clipboard){ navigator.clipboard.writeText('georgelucasluz@gmail.com'); }
  });

  // Lightbox: amplia a foto clicada na galeria
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt){
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt || '');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.setAttribute('src', '');
  }
  document.querySelectorAll('.gallery-item').forEach(function(btn){
    btn.addEventListener('click', function(){
      var img = btn.querySelector('img');
      openLightbox(btn.getAttribute('data-full'), img ? img.getAttribute('alt') : '');
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox){ closeLightbox(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeLightbox(); }
  });
})();
