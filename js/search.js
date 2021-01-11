$(document).ready(() => {
	searchBooks(defaultFilter);
});
let defaultFilter = {
	username: "123123123123123",
	entries: 10,
	start: 0,
	title: "",
	publisher: "",
	location: "",
	issn: "",
	eissn: "",
	isbn: "",
	type: "",
	language: "",
	subjects: "",
	id: "12296",
	// id: "",
	url: "",
};

function searchBooks(filter) {
	$("#tableLoading").show();
	$("#tableBody").empty();
	$.ajax({
		type: "POST",
		crossDomain: true,
		headers: {
			"Content-Type": "application/json",
		},
		url: "https://europe-west2-bookit-297317.cloudfunctions.net/search",
		data: JSON.stringify(filter),
		success: (response) => {
			let books = JSON.parse(response.message);

			console.log(books);
			populateTable(books);
		},
	});
}

function populateTable(books) {
	let tableBody = $("#tableBody");
	tableBody.empty();
	$("#tableLoading").hide();
	books.forEach((book) => {
		let loanBtn =
			"<input onclick=loan('" +
			book.ID +
			"') type='button' class='btn btn-primary ' value='Loan'>";
		let template = $(
			"<tr>" +
				"<td>" +
				book.Type +
				"</td>" +
				"<td>" +
				book.Title +
				"</td>" +
				"<td>" +
				book.Publisher +
				"</td>" +
				"<td>" +
				book.Subjects +
				"</td>" +
				"<td>" +
				book.Language +
				"</td>" +
				"<td class='text-center'>" +
				loanBtn +
				"</td>" +
				"</tr>"
		);
		template.clone().appendTo(tableBody);
		template.clone().appendTo(tableBody);
		template.clone().appendTo(tableBody);

		console.log(book);
	});
}
function loan(bookID) {
	console.log(bookID);
	$.ajax({
		type: "POST",
		crossDomain: true,
		headers: {
			"Content-Type": "application/json",
		},
		url: "https://europe-west2-bookit-297317.cloudfunctions.net/loanbook",
		data: JSON.stringify({
			username: "user",
			id: bookID,
		}),
		success: (response) => {
			console.log(response);
			// console.log(JSON.parse(response.message))
		},
	});
}
