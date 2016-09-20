var navButtons = document.getElementsByClassName('main-header__nav__list--button'),
    thisURLs,
    thisButton;

for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
        target = document.querySelectorAll('#' + this.getAttribute('for').split('go-')[1] + ' object');
        thisURLs = this.getAttribute('data-content-url').split(',');
        setTimeout(function() {
            for (var i = 0; i < target.length; i++) {
                target[i].setAttribute('data', thisURLs[i]);
            }
        }, 1000);
    });
}
