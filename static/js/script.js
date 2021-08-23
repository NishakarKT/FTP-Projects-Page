// DOM Elements
const profileBtn = document.querySelector(".profileBtn");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const profileMenu = document.querySelector(".profileMenu");
const nav = document.querySelector("nav");
const navScroll = document.querySelector(".nav__onScroll");
const navDropdown = document.querySelector(".nav__dropdown");
const sidebarContainer = document.querySelector(".sidebarContainer");
const sidebar = document.querySelector(".sidebar");
const uploadFileInput = document.querySelector(".section__uploadFileInput");
const uploadFileBtn = document.querySelector(".section__uploadFileBtn");

// scroll events
const scrollToTop = () => {
    window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
    // scroll to top button
    if (window.scrollY > 0) {
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
});

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

// Sidebar
const openSidebar = () => {
    sidebar.style.display = "block";
    sidebarContainer.style.display = "block";
};

const closeSidebar = () => {
    setTimeout(() => {
        sidebar.style.display = "none"
        sidebarContainer.style.display = "none";
        sidebar.style.animation = "sidebar__appear 0.5s linear 1";
        sidebarContainer.style.animation = "sidebarContainer__appear 0.5s linear 1";
    }, 500);
    sidebar.style.animation = "sidebar__disappear 0.5s linear 1";
    sidebarContainer.style.animation = "sidebarContainer__disappear 0.5s linear 1";
};

// grid
var $cell = $('.section__projectCard');

//open and close card when clicked on card
$cell.find('.js-expander').on("click", function () {
    var $thisCell = $(this).closest('.section__projectCard');
    if ($thisCell.hasClass('is-collapsed')) {
        $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
        $thisCell.removeClass('is-collapsed').addClass('is-expanded');

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
    var $thisCell = $(this).closest('.section__projectCard');
    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    $cell.not($thisCell).removeClass('is-inactive');
});

// form handling
const openForm = (e) => {
    const form = e.target.parentElement.nextElementSibling;
    form.style.display = "flex";
    form.style.animation = "form__appear 0.5s ease-out 1 forwards";
    form.style.zIndex = "3";
};
const closeForm = (e) => {
    const form = e.target.parentElement;
    form.style.animation = "form__disappear 0.5s ease-out 1 forwards";
    setTimeout(() => form.style.display = "none", 500);
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
    uploadFileInput.click();
};
const changedFile = (e) => {
    uploadFileBtn.innerText = "Uploaded: \"" + truncate(e.target.files[0].name, 20) + "\"";
};