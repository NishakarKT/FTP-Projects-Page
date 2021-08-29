// DOM Elements
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const profileMenu = document.querySelector(".profileMenu");
const nav = document.querySelector("nav");
const navScroll = document.querySelector(".nav__onScroll");
const navDropdown = document.querySelector(".nav__dropdown");
const navDropdownBtn = document.querySelector(".nav__dropdownBtn");
const projectForm = document.querySelector(".projectForm");
const ftpSOP = document.querySelector(".projectForm__ftpSOP");
const wordCountAlert = document.querySelector(".projectForm__wordCountAlert");
const submitBtn = document.querySelector(".projectForm__submitBtn");
const projectCards = Array.from(document.getElementsByClassName("section__projectCard"));
const pastProjectCards = Array.from(document.getElementsByClassName("section__pastProjectCard"));

// scroll events
const scrollToTop = () => {
    window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        // nav
        nav.style.display = "none";
        navScroll.style.display = "flex";
        // floating buttons
        scrollToTopBtn.style.transform = "scale(1)";
        // footer-nav
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
            setTimeout(() => navScroll.style.display = "none", 500);
            navScroll.style.animation = "nav__disappear 0.5s ease-out 1";
        }
        else {
            navScroll.style.display = "flex";
            navScroll.style.animation = "nav__appear 0.5s ease-out 1";
        }
    }
    else {
        // nav
        nav.style.display = "flex";
        navScroll.style.display = "none";
        // floating buttons
        scrollToTopBtn.style.transform = "scale(0)";
    }
    // card transitions
    pastProjectCards.map(projectCard => {
        if (projectCard.getBoundingClientRect().y < projectCard.clientHeight + 150) {
            projectCard.style.animation = "projectCard__appear 0.5s ease-out 1 forwards";
        }
        else {
            projectCard.style.animation = "projectCard__disappear 0.5s ease-out 1 forwards";
        }
    });
});

// grid
let projectCardTimeout;
let isOtherProjectOpen = false;

projectCards.map(projectCard => {
    projectCard.querySelector(".js-expander").addEventListener("click", () => {
        if (projectCard.classList.contains("is-collapsed")) {
            projectCards.map(projectCard => {
                projectCard.classList.remove("is-expanded");
                projectCard.classList.add("is-collapsed");
                projectCard.style.zIndex = 0;
            });
            clearTimeout(projectCardTimeout);
            projectCardTimeout = setTimeout(() => {
                projectCard.classList.remove("is-collapsed");
                projectCard.classList.add("is-expanded");
                projectCard.style.zIndex = 1;
                window.scrollTo(0, projectCard.offsetTop + 200);
            }, isOtherProjectOpen ? 300 : 0);

            // switch isOtherProjectOpen
            isOtherProjectOpen = true;
        }
        else {
            projectCard.classList.remove("is-expanded");
            projectCard.classList.add("is-collapsed");
            projectCard.style.zIndex = 0;
            window.scrollTo(0, projectCard.offsetTop - 200);
            isOtherProjectOpen = false;
        }
    });

    projectCard.querySelector(".js-collapser").addEventListener("click", () => {
        projectCard.classList.remove("is-expanded");
        projectCard.classList.add("is-collapsed");
        projectCard.style.zIndex = 0;
        window.scrollTo(0, projectCard.offsetTop - 200);
        isOtherProjectOpen = false;
    });
});


// form handling
const openForm = () => {
    projectForm.style.display = "flex";
    projectForm.parentElement.style.display = "grid";
    projectForm.style.animation = "form__appear 0.3s ease-out 1 forwards";
    projectForm.parentElement.style.opacity = "1";
    projectForm.querySelector("input").value = "";
    projectForm.querySelector(".project__uploadFileBtn").innerText = "Apply with a different CV";
};

const closeForm = () => {
    projectForm.style.animation = "form__disappear 0.3s ease-out 1 forwards";
    setTimeout(() => {
        projectForm.style.display = "none";
        projectForm.parentElement.style.display = "none";
    }, 300);
};

const submitProjectForm = (e) => {
    if (e.target.classList.contains("projectForm__disabledBtn"))
        openWordCountAlert(e);
    else {
        window.location.reload();
    }
}

const openWordCountAlert = (e) => {
    if (e.target.classList.contains("projectForm__disabledBtn")) {
        const wordCount = ftpSOP.value.split(" ").length - 1;
        wordCountAlert.firstElementChild.innerText = "word count: " + wordCount;
        wordCountAlert.style.zIndex = "1";
        wordCountAlert.style.opacity = "1";
    }
};

const closeWordCountAlert = () => {
    wordCountAlert.style.opacity = "0";
    wordCountAlert.style.zIndex = "-1";
};

const wordCountCheck = () => {
    const wordCount = ftpSOP.value.split(" ").length - 1;

    if (wordCount >= 250) {
        submitBtn.classList.remove("projectForm__disabledBtn");
    }
    else {
        submitBtn.classList.add("projectForm__disabledBtn");
    }
};

// profile menu handling
let profileMenuTimeout;
const profileMenuHandler = () => {
    const display = profileMenu.style.display;
    if (!display || display === "none") {
        profileMenu.style.display = "flex";
        profileMenu.style.animation = window.innerWidth >= 800 ? "profileMenuAppear 0.2s ease-out 1 forwards" : "profileMenuAppear_phone 0.2s ease-out 1 forwards";
    }
    else {
        clearTimeout(profileMenuTimeout);
        profileMenuTimeout = setTimeout(() => profileMenu.style.display = "none", 200);
        profileMenu.style.animation = window.innerWidth >= 800 ? "profileMenuDisappear 0.2s ease-out 1 forwards" : "profileMenuDisappear_phone 0.2s ease-out 1 forwards";
    }
};
profileMenu.addEventListener("click", profileMenuHandler);

// Drop down menu
let dropdownTimeout;
const dropdownHandler = () => {
    const display = navDropdown.style.display;
    if (!display || display === "none") {
        navDropdown.style.display = "flex"
        navDropdown.style.animation = "nav__dropdownAppear 0.2s ease-out 1 forwards";
    }
    else {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => navDropdown.style.display = "none", 200);
        navDropdown.style.animation = "nav__dropdownDisappear 0.2s ease-out 1 forwards";
    }
};
navDropdown.addEventListener("click", dropdownHandler);

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