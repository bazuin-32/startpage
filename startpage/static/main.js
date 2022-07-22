// get a random background
const body = document.body;

// these image dimensions are 1.2 * 1920x1080, since having the image
// aspect ratio not wide enough to fit the screen causes problems
body.style.background = "url('https://picsum.photos/2304/1296?random=1') no-repeat center center fixed";

document.getElementById("main-input").addEventListener("keyup", (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();

	let request = new XMLHttpRequest();
	request.open("POST", "/go/");
});