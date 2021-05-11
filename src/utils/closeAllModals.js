export function closeAllModals() {
    const modals = document.getElementsByClassName('modal');
    const length = modals.length;

    for(let i=0; i<length; i++) {
        modals[i].classList.remove('show');
        modals[i].setAttribute('aria-hidden', 'true');
        modals[i].setAttribute('style', 'display: none');
    }
    const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

    const modalsBackdropLength = modalsBackdrops.length;

    for(let i=0; i < modalsBackdropLength; i++) {
        document.body.removeChild(modalsBackdrops[i]);
    }
}