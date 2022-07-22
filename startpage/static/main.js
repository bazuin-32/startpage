// get a random background
const body = document.body;
body.style.background = "url('https://picsum.photos/1920/1080?random=1') no-repeat center center fixed";

document.getElementById("main-input").addEventListener("keyup", (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();

	let request = new XMLHttpRequest();
	request.open("POST", "/go/");
});