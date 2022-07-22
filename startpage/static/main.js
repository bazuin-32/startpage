// get a random background
const body = document.body;

// get the window size
const width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
const height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
body.style.background = `url('https://picsum.photos/${width}/${height}?random=1') no-repeat center center fixed`;