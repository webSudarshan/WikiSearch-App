let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    //Creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //Creating Title
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    //Creating Break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //Creating URL Element
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    //Creating Break Element
    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);

    //Creating Description Element
    let descEl = document.createElement("p");
    descEl.classList.add("link-description");
    descEl.textContent = description;
    resultItemEl.appendChild(descEl);
}


function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let userInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener('keydown', wikipediaSearch);