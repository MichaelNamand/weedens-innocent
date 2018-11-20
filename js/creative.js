(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 57
    });

    // Collapse Navbar
    var navbarCollapse = function () {
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
    var videos;

    $.getJSON("./json/videos.json", function (json) {
        console.log(json); // this will show the info it in firebug console
        videos = json;

        for (var i = 0; i < videos.length; i++) {
            setVideo(false, i);
        }
    });

    function setVideo(fromModal, i) {
        var divGallery;
        if (fromModal) {
            divGallery = document.getElementById('next-videos');
        } else {
            divGallery = document.getElementById('gallery');
        }

        var a = document.createElement('a');
        a.classList.add('portfolio-box');

        var img = document.createElement('img');
        img.classList.add('img-fluid');
        img.src = videos[i].imgSrc;
        if (fromModal) {
            img.style.height = '200px';
        }

        var divPortfolio = document.createElement('div');
        divPortfolio.classList.add('portfolio-box-caption');

        var divPortfolioContent = document.createElement('div');
        divPortfolioContent.classList.add('portfolio-box-caption-content');

        var projectCategory = document.createElement('div');
        projectCategory.classList.add('project-category');
        projectCategory.classList.add('text-faded');
        projectCategory.textContent = videos[i].description;

        var projectName = document.createElement('div');
        projectName.classList.add('project-name');
        projectName.textContent = videos[i].title;

        var btn = document.createElement('button');
        btn.textContent = 'Regarder';
        btn.classList.add('btn');
        btn.id = 'video-' + i;
        btn.classList.add('btn-light');
        btn['href'] = videos[i].videoURL;
        btn['title'] = videos[i].title;
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#myModal');
        btn.addEventListener('click', function (e) {
            url = e.target.href;
            setTimeout(function () {
                var i = parseInt(e.target.id.charAt(e.target.id.length - 1));
                document.getElementById('next-videos').innerHTML = '';
                setVideo(true,  videos[i].s1 - 1);
                setVideo(true,  videos[i].s2 - 1);
                setVideo(true,  videos[i].s3 - 1);
                document.getElementById('modal-title').textContent = videos[i].title;
                document.getElementById('role-video').textContent = videos[i].role;
                document.getElementById('category-video').textContent = videos[i].category;
                document.getElementById('date-video').textContent = videos[i].date;
                document.getElementById('description-video').textContent = videos[i].description;
                $('#myModal').modal('show');
            }, 500);
        });
        divPortfolioContent.appendChild(projectCategory);
        divPortfolioContent.appendChild(projectName);
        divPortfolioContent.appendChild(btn);

        divPortfolio.appendChild(divPortfolioContent);

        a.appendChild(img);
        a.appendChild(divPortfolio);

        if (fromModal) {
            var col = document.createElement('div');
            col.classList.add('col-12');
            col.classList.add('col-lg-4');
            col.appendChild(a);
            divGallery.appendChild(col);
        } else {
            divGallery.appendChild(a);
        }
    }

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function () {
        $("#cartoonVideo").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function () {
        $("#cartoonVideo").attr('src', url);
    });


    var form = document.getElementById('myform');

    function onSubmit(event) {

        if (event) {
            event.preventDefault();
        }
        // Change to your service ID, or keep using the default service

        var inputs = form.querySelectorAll('input');
        var text = form.querySelector('textarea');
        form.querySelector('button').textContent = 'Envoie...';
        emailjs.send("gmail", "template_r6IvQ2bv", {
            "from_name": inputs[0].value + ' (' + inputs[1].value + ')',
            "to_name": "Weedens",
            "message_html": text.value
        })
            .then(function () {
                alert("Votre message a bien été envoyé !");
                form.querySelector('button').textContent = 'Envoyer';
            }, function (err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                form.querySelector('button').textContent = 'Envoyer';
            });
        return false;
    }

    form.addEventListener('submit', onSubmit, false);
    form.submit = onSubmit;

})(jQuery); // End of use strict

emailjs.init("user_hgvtT0eeK71LJYR8Ny6x4");