const query_input = document.getElementById("query");
const list = document.getElementsByClassName("query-suggestions")[0];

const generate_suggestions = () => {
	const query = query_input.value.toLowerCase().trim();

	if (query.length < 1) {
		list.classList.remove("shown");
		return;
	}


	list.innerHTML = "";

	Array.from(
		document.getElementsByClassName("history")[0]
		.getElementsByTagName("li")
	)
		.filter(li => li.innerText.toLowerCase().includes(query))
		.map(li => li.innerText)
		.forEach(suggestion => {
			const option = document.createElement("option");

			option.innerText = suggestion;
			option.addEventListener("mousedown", () => {
				query_input.value = suggestion;
				list.classList.remove("shown");
			});

			list.appendChild(option);
		});

	list.classList.add("shown");
}

query_input.addEventListener("keyup", generate_suggestions);
query_input.addEventListener("focus", generate_suggestions);

query_input.addEventListener("focusout", () => {
	list.classList.remove("shown");
});