const query_input = document.getElementById("query");
const list = document.getElementsByClassName("query-suggestions")[0];

query_input.addEventListener("keyup", () => {
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
			option.addEventListener("click", () => {
				query_input.value = suggestion;
				list.classList.remove("shown");
			});

			list.appendChild(option);
		});

	list.classList.add("shown");
});

query_input.addEventListener("focusout", () => {
	list.classList.remove("shown");
});