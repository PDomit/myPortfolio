// USTAWIANIE POCZĄTKU STRONY PO ODSWIEŻENIU
 window.onload = function(){
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  document.getElementById('Start').scrollIntoView({ behavior: 'smooth' });
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const box3 = document.getElementById('box3');
  const box4 = document.getElementById('box4');
  const box5 = document.getElementById('box5');
  box1.classList.add('StartTextAnimation1');
  box2.classList.add('StartTextAnimation2');
  box3.classList.add('StartTextAnimation2');
  box4.classList.add('StartTextAnimation2');
  box5.classList.add('ArrowDownImgAnim');
  window.scrollTo(0,0);
  //  USUNIĘCIE POCZATKOWEGO DIVA Z NAPISEM "HELOLO WORLD" PO 2.25 ms
  setTimeout(function () {
      var naglowek = document.getElementById("ToDelete");
      naglowek.remove();
    }, 2250);


  // AKTUALIZACJA AKTUALNEJ POPZYCJI NA  STRONIE DLA INFORMACJI JUMP SCROLLA - BEZ TEGO PO UZYCIU STRZALKI W DOL JEDEN SCROLL W DOL BYLBY PUSTY BO MYŚŁAŁBY ZE JEST W KONTENERZE 0 I PRZEWIJAŁBY DO KONTENERA1
  //W KTÓRYM SIĘ ZNAJDUJE
  const ArrowDown = document.getElementById('ArrowDown');
  ArrowDown.addEventListener("click", function(e) {
      currentSection = 1;
  });


  // PRZENOSCI DO POCZĄTKU SEKCJI PROJEKTÓW PO KLIKNIĘCIU W STRZAŁKĘ
  const ArrowUp = document.getElementById('ArrowUp');
  const myDiv = document.getElementById("ProjectsCont");
  ArrowUp.addEventListener("click", function(e) {
      console.log('A');
      myDiv.scrollTo({
          top: 0,
          behavior: "smooth"
        });
  });


  // NAWIGACJA PROJEKTÓW - PRZYCISKI ZMIANA WIZUALNA, PRZEŁĄCZANIE SLAJDÓW
  var Slides = document.querySelectorAll('.ProjectsCont_Slide');
  var Buttons = document.querySelectorAll('.ProjectsText_Navigation');
  let CurrentSlide = 0;
  var SlidesBlocks = document.querySelectorAll('.ProjectsCont_Right');
  var maxScroll = SlidesBlocks[0].clientHeight + 60 - window.innerHeight;
  var ManualNavigation = function(manual) {
      myDiv.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      Slides.forEach((Slide) => {
          Slide.classList.remove('ProjectsCont_Slide_Activated');
      });
      Buttons.forEach((Button) => {
          Button.classList.remove('ProjectsText_Navigation_Activated');
      });
      Slides[manual].classList.add('ProjectsCont_Slide_Activated');
      Buttons[manual].classList.add('ProjectsText_Navigation_Activated');
      console.log('A');
      maxScroll = SlidesBlocks[manual].clientHeight + 60 - (window.innerHeight); // maksymalna dozwolona wysokość scrolla
  }
  Buttons.forEach((Button, i) => {
      Button.addEventListener("click", () => {
          ManualNavigation(i);
          CurrentSlide = i;
      })
  });


  // SCROLL JUMP - SCROLOWNANIE MIEDZY SEKCJAMI, WYKRYWANIE CZESCI PROJEKTOW DO SCROLLOWANIA PŁYNNEGO
  const sections = document.querySelectorAll('.ScrollClass');
  let currentSection = 0;
  let isThrottled = false;
  window.addEventListener('wheel', (e) => {
    console.log('Przesunięcie kółka myszy (deltaY):', e.deltaY);
    if (isThrottled) return;
    //Potencjalnie Jump Scroll w góre od projektów
    const scrollableSection = sections[currentSection].classList.contains('ProjectsCont');
    if (scrollableSection) {
      const el = sections[currentSection];
      const atTop = el.scrollTop === 0;
      if (e.deltaY < 0 && atTop) {
        goToSection(currentSection - 1);
        isThrottled = true;
        setTimeout(() => (isThrottled = false), 200);
      }

      return;
    }
    // SCROLL JUMP DLA INNYCH SEKCJI
    if (e.deltaY > 0) {
      goToSection(currentSection + 1);
    } else {
      goToSection(currentSection - 1);
    }
    isThrottled = true;
    setTimeout(() => (isThrottled = false),200);
  }, { passive: false });
  function goToSection(index) {
      if (index < 0 || index >= sections.length) return;
      currentSection = index;
      sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }


    // SCROLL STRZAŁKAMI
    window.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowUp'){
        if (isThrottled) return;
        //Potencjalnie Jump Scroll w góre od projektów
        const scrollableSection = sections[currentSection].classList.contains('ProjectsCont');
        if (scrollableSection) {
          const el = sections[currentSection];
          const atTop = el.scrollTop === 0;
          if (atTop) {
            goToSection(currentSection - 1);
            isThrottled = true;
            setTimeout(() => (isThrottled = false), 200);
                return;
          }
        }
        // Normalne Jump Scroll dla innych sekcji    
        else{
          goToSection(currentSection - 1);
          isThrottled = true;
          setTimeout(() => (isThrottled = false),200);
        }   
      }

      if(e.key === 'ArrowDown'){
        if (isThrottled) return;
        //Potencjalnie Jump Scroll w góre od projektów
        const scrollableSection = sections[currentSection].classList.contains('ProjectsCont');
        if (scrollableSection) {
          scrollableDiv.setAttribute('tabindex', '0'); // najpierw upewnij się, że div jest focusowalny
          scrollableDiv.focus();
          return; 
        }
        // Normalne Jump Scroll dla innych sekcji    
        else{
          goToSection(currentSection + 1);
          isThrottled = true;
          setTimeout(() => (isThrottled = false),200);
        }   
      }

    }, { passive: false });

    //    BLOKOWANIE SCROLLOWANIA W SEKCJI Z PROJEKTAMI W ZALEZNOSCI OD DŁUGOŚCI AKTUALNIE WYBRANEGO SLAJDU 
    const scrollableDiv = document.getElementById('ProjectsCont');
    let lastScrollTop = 0;
    scrollableDiv.addEventListener('scroll', () => {
      var currentScroll = scrollableDiv.scrollTop;
      var scrollingDown = currentScroll > lastScrollTop;
      if (scrollingDown && (scrollableDiv.scrollTop > maxScroll) ) {
        scrollableDiv.scrollTop = maxScroll;
      }
      lastScrollTop = currentScroll;
    });
};  





