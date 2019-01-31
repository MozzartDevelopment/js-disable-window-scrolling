/**
 * Stoping scrolling behavior
 * @param {Event} ev 
 */
function stopScrolling(ev) {
  let keyCodes = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  let keys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    ' '
  ]
  if (ev.type == 'wheel') return false;
  if (ev.target == document.body && ev.type == 'keydown' && (keyCodes.includes(ev.keyCode) || keys.includes(ev.key))) return false;
}
/**
 * Disable window scrolling
 */
function disScrolling() {
  let events = [
    'keydown',
    'wheel',
    'mousewheel'
  ]
  events.forEach(event => {
    if (window[`on${event}`]) {
      window.addEventListener(event, stopScrolling, false);
    } else {
      window[`on${event}`] = stopScrolling;
    }
  });
}
/**
 * Enable window scrolling
 */
function enScrolling() {
  let events = [
    'keydown',
    'wheel',
    'mousewheel'
  ]
  events.forEach((event) => {
    if (window[`on${event}`] == stopScrolling) {
      window[`on${event}`] = null;
    } else {
      window.removeEventListener(event, stopScrolling, false);
    }
  });
}

/**
 * Switch between eneble and disable scrolling
 * @param {HTMLElement} el 
 */
function switchScrolling(el) {
  let scrolling = (localStorage.getItem('scrolling') == 'true');
  scrolling ? disScrolling() : enScrolling();
  document.querySelector('#state').innerText = scrolling ? 'Disabled' : 'Enabled';
  localStorage.setItem('scrolling', !scrolling);
  el.blur()
}