// DOM Elements
const profileBtn = document.querySelector(".profileBtn");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const profileMenu = document.querySelector(".profileMenu");
const nav = document.querySelector("nav");
const navScroll = document.querySelector(".nav__onScroll");
const navDropdown = document.querySelector(".nav__dropdown");
const projectForm = document.querySelector(".projectForm");
const projectCards = Array.from(document.getElementsByClassName("section__projectCard"));

// scroll events
const scrollToTop = () => {
    window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
    // scroll to top button
    if (window.scrollY > 2) {
        // nav
        nav.style.display = "none";
        navScroll.style.display = "flex";
        navDropdown.classList.add("nav__dropdownOnScroll");
        // scroll to top button
        scrollToTopBtn.style.transform = "scale(1)";
        profileBtn.style.transform = "scale(1)";
        profileMenu.style.transform = "scale(1)";
        // footer-nav
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
            setTimeout(() => navScroll.style.display = "none", 500);
            navScroll.style.animation = "nav__disappear 0.5s ease-out 1";
            scrollToTopBtn.style.transform = "scale(0)";
            profileBtn.style.transform = "scale(0)";
            profileMenu.style.transform = "scale(0)";
        }
        else {
            navScroll.style.display = "flex";
            navScroll.style.animation = "nav__appear 0.5s ease-out 1";
            scrollToTopBtn.style.transform = "scale(1)";
            profileBtn.style.transform = "scale(1)";
            profileMenu.style.transform = "scale(1)";
        }
    }
    else {
        // nav
        nav.style.display = "flex";
        navScroll.style.display = "none";
        navDropdown.classList.remove("nav__dropdownOnScroll");
        // scroll to top button
        scrollToTopBtn.style.transform = "scale(0)";
        profileBtn.style.transform = "scale(0)";
        profileMenu.style.transform = "scale(0)";
    }
    // card transitions
    projectCards.map(projectCard => {
        if (projectCard.getBoundingClientRect().y < projectCard.clientHeight + 150) {
            projectCard.style.animation = "projectCard__appear 0.5s ease-out 1 forwards";
        }
        else {
            projectCard.style.animation = "projectCard__disappear 0.5s ease-out 1 forwards";
        }
    });
});
// cards transitions fix on page reload
window.scrollBy(0, 1);

// Drop down menu
const dropdownHandler = () => {
    const display = navDropdown.style.display;
    if (!display || display === "none") {
        navDropdown.style.display = "flex";
        navDropdown.style.animation = "dropdown__appear 0.5s ease-out 1 forwards";
        navDropdown.focus();
    }
    else {
        setTimeout(() => navDropdown.style.display = "none", 500);
        navDropdown.style.animation = "dropdown__disappear 0.5s ease-out 1 forwards";
    }
};

// // grid
var $cell = $('.section__projectCard');

//open and close card when clicked on card
$cell.find('.js-expander').on("click", function () {
    var $thisCell = $(this).closest('.section__projectCard');
    if ($thisCell.hasClass('is-collapsed')) {
        $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
        $thisCell.removeClass('is-collapsed').addClass('is-expanded');
        window.scrollBy(0, 300);

        if ($cell.not($thisCell).hasClass('is-inactive')) {
            //do nothing
        } else {
            $cell.not($thisCell).addClass('is-inactive');
        }
    } else {
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.not($thisCell).removeClass('is-inactive');
    }
});

//close card when click on cross
$cell.find('.js-collapser').on("click", function () {
    window.scrollBy(0, -300);
    var $thisCell = $(this).closest('.section__projectCard');
    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    $cell.not($thisCell).removeClass('is-inactive');
});

// form handling
const openForm = () => {
    projectForm.style.display = "flex";
    projectForm.parentElement.style.display = "grid";
    projectForm.style.animation = "form__appear 0.3s ease-out 1 forwards";
    projectForm.parentElement.style.opacity = "1";
};

const closeForm = () => {
    projectForm.style.animation = "form__disappear 0.3s ease-out 1 forwards";
    setTimeout(() => {
        projectForm.style.display = "none";
        projectForm.parentElement.style.display = "none";
    }, 300);
};

const projectFormCheck = (e) => {
    const textArea = e.target;
    const submitBtn = e.target.parentElement.lastElementChild;
    if (textArea.value.split(" ").length >= 250) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("projectForm__disabledBtn");
    }
    else {
        submitBtn.disabled = true;
        submitBtn.classList.add("projectForm__disabledBtn");
    }
};

// profile menu handling
const openProfileMenu = () => {
    profileMenu.classList.remove("profileMenuInactive");
    profileBtn.removeEventListener("click", openProfileMenu);
    profileBtn.addEventListener("click", closeProfileMenu);
};
const closeProfileMenu = () => {
    profileMenu.classList.add("profileMenuInactive");
    profileBtn.removeEventListener("click", closeProfileMenu);
    profileBtn.addEventListener("click", openProfileMenu);
};
profileMenu.addEventListener("click", closeProfileMenu);

// upload file
const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 1) + "..." : str;
};

const uploadFile = (e) => {
    e.preventDefault();
    e.target.previousElementSibling.click();
};
const changedFile = (e) => {
    e.target.nextElementSibling.innerText = "Uploaded: \"" + truncate(e.target.files[0].name, 20) + "\"";
};

// Bookmark handling
const bookmarkHandler = (e) => {
    if (e.target.classList.contains("fas")) {
        e.target.classList.remove("fas");
        e.target.classList.add("far");
    }
    else {
        e.target.classList.remove("far");
        e.target.classList.add("fas");
    }
};