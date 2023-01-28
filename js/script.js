
function goToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}






$(document).on("ready", function () {
  $(".center").slick({
    arrows: true,
    dots: false,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 998,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});



// jquery
$(document).ready(function () {
  // loader
  $(window).on("load", function () {
    setTimeout(function () {
      $("#loaders").css("display", "none");
    }, 500);
  });

  // scroll button to top
  $(window).scroll(function () {
    $("#btn-top").css("display", "none");
    if ($(window).scrollTop() <= 550) {
      $("#btn-top").css("display", "none");
    } else {
      $("#btn-top").css("display", "block");
    }
  });

  // stiky navbar
  var navbar = $("header");
  $(window).scroll(function () {
    if ($(window).scrollTop() <= 750) {
      navbar.removeClass("navbar-sticky animate__slideInDown");
    } else {
      navbar.addClass("navbar-sticky animate__slideInDown");
    }
  });

  
});