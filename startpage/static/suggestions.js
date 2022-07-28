const query_input = document.getElementById("query");
const list = document.getElementsByClassName("query-suggestions")[0];

query_input.addEventListener("keyup", () => {
	const query = query_input.value;

	if (query.length < 1) {
		list.classList.remove("shown");
		return;
	}

	list.classList.add("shown");
});

query_input.addEventListener("focusout", () => {
	list.classList.remove("shown");
});