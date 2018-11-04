(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });
    var url = $("#cartoonVideo").attr('src');

  $.getJSON("/json/videos.json", function(json) {
        console.log(json); // this will show the info it in firebug console
        var divGallery = document.getElementById('gallery');
        for (var i = 0; i < json.length; i++) {
            var col = document.createElement('div');
            col.classList.add('col-lg-4');
            col.classList.add('col-sm-6');

            var a = document.createElement('a');
            a.classList.add('portfolio-box');

            var img = document.createElement('img');
            img.classList.add('img-fluid');
            img.src = json[i].imgSrc;

            var divPortfolio = document.createElement('div');
            divPortfolio.classList.add('portfolio-box-caption');

            var divPortfolioContent = document.createElement('div');
            divPortfolioContent.classList.add('portfolio-box-caption-content');

            var projectCategory = document.createElement('div');
            projectCategory.classList.add('project-category');
            projectCategory.classList.add('text-faded');
            projectCategory.textContent = json[i].description;

            var projectName = document.createElement('div');
            projectName.classList.add('project-name');
            projectName.textContent = json[i].title;

            var btn = document.createElement('button');
            btn.textContent = 'Regarder';
            btn.classList.add('btn');
            btn.classList.add('btn-light');
            btn['href'] = json[i].videoURL;
            btn['title'] = json[i].title;
            btn.setAttribute('data-toggle', 'modal');
            btn.setAttribute('data-target', '#myModal');
            btn.addEventListener('click', function(e) {
                url = e.target.href;
                document.getElementById('modal-title').textContent = e.target.title;
            });
            divPortfolioContent.appendChild(projectCategory);
            divPortfolioContent.appendChild(projectName);
            divPortfolioContent.appendChild(btn);

            divPortfolio.appendChild(divPortfolioContent);

            a.appendChild(img);
            a.appendChild(divPortfolio);


            col.appendChild(a);

            divGallery.appendChild(col);
        }
    });


    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });

})(jQuery); // End of use strict
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}