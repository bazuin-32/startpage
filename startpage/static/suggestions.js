const query_input = document.getElementById("query");
const list = document.getElementsByClassName("query-suggestions")[0];

let block_suggestion_change = false;
let selection_index = -1;

const generate_suggestions = () => {
	if (block_suggestion_change) {
		block_suggestion_change = false;
		return;
	}

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
query_input.addEventListener("keydown", (e) => {
	if (e.key === "ArrowDown") {
		// remove selection from before
		if (selection_index > -1) {
			list.children[selection_index].classList.remove("selected");
		}

		selection_index = (selection_index + 1) % list.children.length;
		list.children[selection_index].classList.add("selected");
		
		block_suggestion_change = true;
		query_input.value = list.children[selection_index].innerText;
	} else if (e.key === "ArrowUp") {
		// remove selection from before
		if (selection_index > -1) {
			list.children[selection_index].classList.remove("selected");
		}

		selection_index = (selection_index - 1 + list.children.length) % list.children.length;
		list.children[selection_index].classList.add("selected");

		block_suggestion_change = true;
		query_input.value = list.children[selection_index].innerText;
	}
});

query_input.addEventListener("focusout", () => {
	list.classList.remove("shown");
});