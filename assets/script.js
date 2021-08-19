window.addEventListener("load", function () {
    Array.from(document.querySelectorAll(".ripple-button-light")).forEach(button => ripple('light', button));
    Array.from(document.querySelectorAll(".ripple-button-dark")).forEach(button => ripple('dark', button));
});

function ripple(color, button) {
    button.onmousedown = function (e) {
        if (this.querySelector('span.ripple-' + color)) this.removeChild(this.querySelector('span.ripple-' + color));

        document.documentElement.style.setProperty('--elementWidth', this.offsetWidth / 15);

        var rect = this.getBoundingClientRect();
        var x = e.pageX - (rect.left + window.pageXOffset) - 10;
        var y = e.pageY - (rect.top + window.pageYOffset) - 10;
        var ripple = document.createElement('span');
        ripple.className = 'ripple-' + color;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 750);
    };
}