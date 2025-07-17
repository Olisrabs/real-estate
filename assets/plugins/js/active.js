// =========================================================================================
// * Project Name    :  BuildUp Homes - Real Estate & Property Selling HTML5 Template.
// * File            :  JS Base
// * Version         :  1.0.0
// * Author          :  GetUpDigital (https://wrapbootstrap.com/user/getupdigital)
// * Product Designer:  Jahedul Islam
// * Developer       :  Meheraj Hossain Sagar
// =========================================================================================

(function ($) {
  "use strict";
  $(document).on("ready", function () {
    /*======================================================================================
		  Header Sticky JS
	  =======================================================================================*/
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 100) {
        $(".header").removeClass("sticky");
      } else {
        $(".header").addClass("sticky");
      }
    });

    /*======================================================================================
		 	Mobile Menu JS
	  =======================================================================================*/
    var $offcanvasNav = $("#offcanvas-menu a");
    $offcanvasNav.on("click", function () {
      var link = $(this);
      var closestUl = link.closest("ul");
      var activeLinks = closestUl.find(".active");
      var closestLi = link.closest("li");
      var linkStatus = closestLi.hasClass("active");
      var count = 0;

      closestUl.find("ul").slideUp(function () {
        if (++count == closestUl.find("ul").length)
          activeLinks.removeClass("active");
      });
      if (!linkStatus) {
        closestLi.children("ul").slideDown();
        closestLi.addClass("active");
      }
    });

    /*======================================================================================
		  Wow JS
	  ========================================================================================*/
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }

    /*======================================================================================
			CounterUp JS
		========================================================================================*/
    $(".counter").counterUp({
      time: 1500,
    });
    /*=====================================================================================
			Nice Select JS
  	=======================================================================================*/
    $("select").niceSelect();

    /*=====================================================================================
      Video Popup JS
    =======================================================================================*/
    $(".popup-video").magnificPopup({
      type: "iframe",
    });

    /*=====================================================================================
      Sidebar Filter Open JS
    =======================================================================================*/
    // Filter Bar
    function toggleFilterBar() {
      if ($(".properties-sidebar").hasClass("filter-open")) {
        // Filter is open, so close it
        $(".properties-sidebar").removeClass("filter-open");
        // Re-enable body scrolling
        $("body").css("overflow", "auto");
        // Remove overlay if it exists
        $(".filter-overlay").remove();
      } else {
        // Filter is closed, so open it
        $(".properties-sidebar").addClass("filter-open");
        // Disable body scrolling and add overlay
        $("body").css("overflow", "hidden");
        $("body").append('<div class="filter-overlay"></div>');
      }
    }

    // Click event for the filter open button
    $(".filter-open-btn").click(toggleFilterBar);

    // Click event for the close button
    $(".close-btn").click(toggleFilterBar);

    /*======================================================================================
		  Team Action JS
	  ========================================================================================*/
    const plusCrossButtons = document.querySelectorAll(".team-card-action-btn");
    plusCrossButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const teamInfo = button.parentElement.nextElementSibling;
        teamInfo.classList.toggle("team-info-hidden");
        button.querySelector("i").classList.toggle("fi-rr-plus");
        button.querySelector("i").classList.toggle("fi-rr-cross");
        button.classList.toggle("active"); // Add or remove "active" class to the button
        button.parentElement.classList.toggle("active"); // Add or remove "active" class to the parent element
      });
    });

    /*======================================================================================
		  Search Area Filter Data JS
	  ========================================================================================*/
    var searchInputOne = document.getElementById("searchInputOne");
    if (searchInputOne) {
      searchInputOne.addEventListener("input", function () {
        filterOptions(
          this,
          document.querySelectorAll(
            "#panelsStayOpen-collapseTwo .options label"
          )
        );
      });
    }

    var searchInputTwo = document.getElementById("searchInputTwo");
    if (searchInputTwo) {
      searchInputTwo.addEventListener("input", function () {
        filterOptions(
          this,
          document.querySelectorAll(
            "#panelsStayOpen-collapseThree .options label"
          )
        );
      });
    }

    function filterOptions(inputElement, options) {
      let filter = inputElement.value.toLowerCase();

      options.forEach((option) => {
        let text = option.textContent || option.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
          option.style.display = "";
        } else {
          option.style.display = "none";
        }
      });
    }

    /*======================================================================================
		  Range Slider JS 
	  ========================================================================================*/
    function updateRangeInputs(container) {
      const minRange = container.querySelector(".minRange");
      const maxRange = container.querySelector(".maxRange");
      const minPrice = container.querySelector(".minPrice");
      const maxPrice = container.querySelector(".maxPrice");

      minRange.addEventListener("input", () => {
        let minValue = parseInt(minRange.value);
        let maxValue = parseInt(maxRange.value);

        if (minValue >= maxValue) {
          minRange.value = maxValue - 100;
        }
        minPrice.value = minRange.value;
      });

      maxRange.addEventListener("input", () => {
        let minValue = parseInt(minRange.value);
        let maxValue = parseInt(maxRange.value);

        if (maxValue <= minValue) {
          maxRange.value = minValue + 100;
        }
        maxPrice.value = maxRange.value;
      });

      minPrice.addEventListener("input", () => {
        let value = Math.min(
          parseInt(minPrice.value),
          parseInt(maxPrice.value) - 100
        );
        minRange.value = value;
        minPrice.value = value;
      });

      maxPrice.addEventListener("input", () => {
        let value = Math.max(
          parseInt(maxPrice.value),
          parseInt(minPrice.value) + 100
        );
        maxRange.value = value;
        maxPrice.value = value;
      });
    }

    document.querySelectorAll(".price-range-container").forEach((container) => {
      updateRangeInputs(container);
    });

    /*======================================================================================
		  Hero Slider JS
	  ========================================================================================*/
    $(".hero-slider-nav").slick({
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true,
      fade: true,
      infinite: true,
      cssEase: "ease-in-out",
      dots: true,
      arrows: false,
      appendDots: $(".slider-dots-box"),
      dotsClass: "slider-dots",
    });

    // On before slide change
    $(".hero-slider-nav")
      .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        $(".slider-dots-box button").html("");
      })
      .trigger("beforeChange");

    // On before slide change
    $(".hero-slider-nav")
      .on("afterChange", function (event, slick, currentSlide) {
        $(".slider-dots-box button").html("");
        $(
          ".slider-dots-box .slick-active button"
        ).html(`<svg class="progress-svg" width="16" height="16">
        <g transform="translate(8,8)">
          <circle class="circle-go" r="7" cx="0" cy="0"></circle>
        >
          ${(currentSlide || 0) + 1}
        </text>
      </g>
    </svg>`);
      })
      .trigger("afterChange");

    /*======================================================================================
		  Ongoing Project Slider
	  ========================================================================================*/
    var swiper = new Swiper(".ongoing-project-slider", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        clickable: true,
      },
      autoplay: true,
      loop: false,
      spaceBetween: 24,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        580: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1320: {
          slidesPerView: 3,
        },
      },
    });

    /*======================================================================================
		 Service Slider JS
	  ========================================================================================*/
    $(".service-slider").owlCarousel({
      items: 4,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: false,
      nav: true,
      margin: 24,
      navText: [
        "<i class='fi fi-rs-arrow-alt-left'></i>",
        "<i class='fi fi-rs-arrow-alt-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        580: {
          items: 2,
        },

        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1320: {
          items: 4,
        },
      },
    });

    /*======================================================================================
		 Propertise Card Image Slider
	  ========================================================================================*/
    $(".p-card-image-slider").owlCarousel({
      items: 1,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      nav: false,
      dots: true,
      margin: 16,
    });

    /*======================================================================================
		  Testimonial Slider JS
	  ========================================================================================*/
    $(".testimonial-slider-nav").slick({
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true,
      fade: true,
      infinite: true,
      cssEase: "ease-in-out",
      dots: true,
      arrows: true,
      appendDots: $(".slider-dots-box-2"),
      dotsClass: "slider-dots",
    });

    // On before slide change
    $(".testimonial-slider-nav")
      .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        $(".slider-dots-box-2 button").html("");
      })
      .trigger("beforeChange");

    // On before slide change
    $(".testimonial-slider-nav")
      .on("afterChange", function (event, slick, currentSlide) {
        $(".slider-dots-box-2 button").html("");
        $(
          ".slider-dots-box-2 .slick-active button"
        ).html(`<svg class="progress-svg" width="16" height="16">
        <g transform="translate(8,8)">
          <circle class="circle-go" r="7" cx="0" cy="0"></circle>
        >
          ${(currentSlide || 0) + 1}
        </text>s
      </g>
    </svg>`);
      })
      .trigger("afterChange");

    /*======================================================================================
		  Client Slider JS
	  ========================================================================================*/
    const clientSlider = new Swiper(".client-slider", {
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        360: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 8,
        },
      },
    });

    const clientSliderTwo = new Swiper(".client-slider-reverse", {
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      breakpoints: {
        360: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 8,
        },
      },
    });

    /*======================================================================================
		  Team Slider JS
	  ========================================================================================*/
    $(".team-slider").owlCarousel({
      items: 4,
      autoplay: false,
      loop: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      touchDrag: true,
      mouseDrag: true,
      merge: true,
      nav: true,
      dots: false,
      margin: 24,
      navText: [
        "<i class='fi fi-rs-arrow-alt-left'></i>",
        "<i class='fi fi-rs-arrow-alt-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        580: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });

    /*=======================================================================================
		 Service Testimonial Slider JS
	  =========================================================================================*/
    $(".s-testimonial-slider").owlCarousel({
      items: 2,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      nav: true,
      dots: true,
      margin: 24,
      navText: [
        "<i class='fi fi-rs-arrow-alt-left'></i>",
        "<i class='fi fi-rs-arrow-alt-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 2,
        },
        1320: {
          items: 2,
        },
      },
    });
    /*======================================================================================
      Pricing Slider JS
    ========================================================================================*/
    $(".pricing-slider").owlCarousel({
      items: 3,
      autoplay: true,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      nav: false,
      dots: true,
      margin: 24,
      responsive: {
        300: {
          items: 1,
        },
        580: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1320: {
          items: 3,
        },
      },
    });
    /*======================================================================================
      Portfolio Slider JS
    ========================================================================================*/
    $(".portfolio-slider").owlCarousel({
      items: 1,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      nav: true,
      dots: false,
      margin: 24,
      navText: [
        "<i class='fi fi-rs-arrow-alt-left'></i> Previous",
        "Next <i class='fi fi-rs-arrow-alt-right'></i>",
      ],
    });

    /*======================================================================================
      Property Slider JS
    ========================================================================================*/
    var swiper = new Swiper(".property-slider-active", {
      slidesPerView: "auto",
      spaceBetween: 24,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    /*======================================================================================
      Property Details Slider JS
    ========================================================================================*/
    var swiper = new Swiper(".pd-slider-thumb", {
      spaceBetween: 10,
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      freeMode: false,
      watchSlidesProgress: false,

      breakpoints: {
        320: {
          slidesPerView: 3,
          grid: {
            rows: 0,
          },
        },
        580: {
          slidesPerView: 5,
          grid: {
            rows: 0,
          },
        },
        768: {
          slidesPerView: 6,
          grid: {
            rows: 0,
          },
        },
        1024: {
          slidesPerView: 8,
          grid: {
            rows: 0,
          },
        },
        1200: {
          slidesPerView: 3,
          grid: {
            rows: 4,
          },
        },
      },
    });
    var swiper2 = new Swiper(".pd-slider", {
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: swiper,
      },
    });
  });

  /*==========================================================================================
		Preloader JS
	============================================================================================*/
  var prealoaderOption = $(window);
  prealoaderOption.on("load", function () {
    var preloader = jQuery(".preloader");
    var preloaderArea = jQuery(".preloader");
    preloader.fadeOut();
    preloaderArea.delay(350).fadeOut("slow");
  });
})(jQuery);
