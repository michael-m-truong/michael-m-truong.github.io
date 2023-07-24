'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const projectsItem = document.querySelectorAll("[data-filter-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to all modal items
/*for (let i = 0; i < projectsItem.length; i++) {
  console.log("hereeee")
  projectsItem[i].addEventListener("click", function () {

    // modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    // modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = "cool"
    modalText.innerHTML = '<p>esfiojsefiosfjiosef fiojsefiosfjiofiojsefiosfjiofiojsefiosfjio \
    awdawd \
    aawddwa \
    </p>'
    testimonialsModalFunc();

  });

}
*/

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function updateURL(pageName) {
  if (pageName == "about") {
    window.location.hash = "";
    // for (let i = 0; i < pages.length; i++) {
    //   if (pages[i].dataset.page == "about") {
    //     navigationLinks[i].classList.add("active");
    //   }
    //   else {
    //     pages[i].classList.remove("active");
    //   }
    // }
    // return
    return
  }

  const newURL = "#" + pageName; // Prepend "#" to the pageName to create the hash
  window.location.hash = newURL;
}

// Function to handle page navigation
function navigateTo(pageName) {

  if (!pageName && !window.location.hash) {
    // If pageName is not provided (undefined or empty), and there is no hash in the URL
    // Automatically set it to "about" and navigate to that page
    updateURL("about");
    return;
  }

  for (let i = 0; i < pages.length; i++) {
    if (pageName === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);

      if (pageName === "portfolio") {
        // Change CSS for the portfolio page
        document.querySelector(".main-content").style.minWidth = "100%";
        document.querySelector(".main-content").style.width = "100%";
        document.querySelector(".main-content").style.margin = "0";
        document.querySelector(".sidebar").style.display = "none";
        document.querySelector("article").style.display = "none";
      } else {
        // Change CSS for other pages
        document.querySelector(".main-content").style.minWidth = "";
        document.querySelector(".main-content").style.width = "";
        document.querySelector(".main-content").style.margin = "";
        document.querySelector(".sidebar").style.display = "";
        document.querySelector("article").style.display = "";
      }

      // Call the updateURL function to update the hash part of the URL

      updateURL(pageName);
      

      
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

// Function to handle the hashchange event (when the hash part of the URL changes)
window.onhashchange = function () {
  // Get the page name from the hash and navigate to the corresponding page
  const pageName = window.location.hash.substring(1); // Remove the "#" from the hash
  navigateTo(pageName);
};

// Add event listeners to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.dataset.navLink; // Get the page name from the data-nav-link attribute
    navigateTo(pageName);
  });
}

// When the page loads, check the hash and navigate to the corresponding page
const pageName = window.location.hash.substring(1); // Get the page name from the hash
navigateTo(pageName);



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-slide", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active-slide";
}