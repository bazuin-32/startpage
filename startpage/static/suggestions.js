const query_input = document.getElementById("query");
const list = document.getElementsByClassName("query-suggestions")[0];

query_input.addEventListener("keyup", () => {
	const query = query_input.value;

	if (query.length < 1) {
		list.style.display = "none";
		return;
	}

	list.style.display = "block";
});

query_input.addEventListener("focusout", () => {
	list.style.display = "none";
});