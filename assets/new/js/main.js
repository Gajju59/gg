function fadeOut(targetElement) {
    var fadeEffect = setInterval(function() {
        if (!targetElement.style.opacity) {
            targetElement.style.opacity = 1;
        }
        if (targetElement.style.opacity > 0) {
            targetElement.style.opacity -= 0.4;
        } else {
            targetElement.style.display = 'none';
            clearInterval(fadeEffect);
        }
    }, 100);
}

window.addEventListener('load', (event) => {
    // Preloader Area
    const preloader = document.getElementById('preloader');
    fadeOut(preloader);
    const dataSrcs = document.querySelectorAll('[data-src]');
    dataSrcs.forEach((dataSrcEle) => {
        const src = dataSrcEle.dataset.src;
        dataSrcEle.setAttribute('src', src);
        dataSrcEle.removeAttribute('data-src');
    });

    const dataSrcsets = document.querySelectorAll('[data-srcset]');

    dataSrcsets.forEach((srcsetEle) => {
        const srcset = srcsetEle.dataset.srcset;
        srcsetEle.setAttribute('srcset', srcset);
        srcsetEle.removeAttribute('data-srcset');
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    TopnavMenuButtonHandler();
    FloatingButtonHandler();
    goTopButtonHandler();
    getStartedModalHandler();
    introVideoModalHandler();
});

window.addEventListener('scroll', (event) => {
    const scrolled = event.target.scrollingElement.scrollTop;
    const goTopButton = document.getElementById('go-top');
    if (scrolled > 600) goTopButton.classList.add('active');
    if (scrolled < 600) goTopButton.classList.remove('active');
})

const TopnavMenuButtonHandler = () => {
    const topnavMenuButtonEle = document.getElementById('topnav-menu-button');
    const sidenavPopupRootEle = document.getElementById('sidenav-popup-root');
    const siteRootEle = document.getElementById('site-root');
    const sidenavPopupCloseButtonEle = document.querySelector('.sidenav-popup-close');

    const windowClicker = (event) => {
        if (event.target == sidenavPopupRootEle) {
            closeSideNav();
        }
    }

    const closeSideNav = () => {
        sidenavPopupRootEle.classList.remove('sidenav-popup-root--active');
        siteRootEle.classList.remove('site-root-sidenav-popup-root--active')
        window.removeEventListener('click', windowClicker);
    }

    topnavMenuButtonEle.onclick = function() {
        sidenavPopupRootEle.classList.add('sidenav-popup-root--active');
        siteRootEle.classList.add('site-root-sidenav-popup-root--active');
        window.addEventListener('click', windowClicker);

    }

    sidenavPopupCloseButtonEle.onclick = function() {
        closeSideNav();
    }
}

const FloatingButtonHandler = () => {
    // Handling settings fab button click
    const settingsButton = document.getElementById('settingsButton');
    const floatActionMenu = document.getElementById('floatActionMenu');
    const siteRootEle = document.getElementById('site-root');
    settingsButton.onclick = () => {
        if (floatActionMenu.classList.contains('open')) {
            floatActionMenu.classList.remove('open');
            siteRootEle.classList.remove('site-root-float-button--active')
        } else {
            floatActionMenu.classList.add('open');
            siteRootEle.classList.add('site-root-float-button--active')
        }
    };
}

const goTopButtonHandler = () => {
    const goTopButtonEle = document.getElementById('go-top');
    goTopButtonEle.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

const getStartedModalHandler = () => {
    const getStartedButtons = document.querySelectorAll('[data-button-type="get-started"]');
    getStartedButtons.forEach((getStartedButton) => {
        if (getStartedButton) {
            getStartedButton.onclick = function() {
                openModal('get-started-modal');
            }
        }
    })
}
const introVideoModalHandler = () => {
    const introVideoButtons = document.querySelectorAll('[data-button-type="intro-video-button"]');
    introVideoButtons.forEach((introVideoButton) => {
        if (introVideoButton) {
            introVideoButton.onclick = function() {
                const onClose = () => {
                    // introVideo.setAttribute("src", "")
                    introVideoContainer.innerHTML = '';
                }
                openModal('intro-video-modal', onClose);
                // const introVideo = document.getElementById('intro-video');
                const introVideoContainer = document.getElementById('intro-video-container');
                console.log('introVideoContainer', introVideoContainer);

                if (introVideoContainer.children.length === 0) {
                    introVideoContainer.insertAdjacentHTML('beforeend', '<iframe id="intro-video" class="intro-video" src="https://www.youtube.com/embed/HRN6G_mf9Ws?re=0&autoplay=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                }
                // const introVideoSrc = introVideo.getAttribute('data-src1');
                // introVideo.setAttribute("src", introVideoSrc)
            }
        }
    })
}

const openModal = (id, onClose) => {
    const modal = document.getElementById(id);
    modal.style.display = 'block';

    const windowClicker = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    }
    window.addEventListener('click', windowClicker);

    const modalCloseBtn = modal.getElementsByClassName('modal-close-btn');
    for (var i = 0; i < modalCloseBtn.length; i++) {
        modalCloseBtn[i].onclick = () => {
            closeModal();
        }
    }
    const closeModal = () => {
        modal.style.display = "none";
        window.removeEventListener('click', windowClicker);
        onClose();
    }
}


/**/
$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});