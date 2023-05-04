const keywordInput = document.getElementById("keyword");
const searchButton = document.getElementById("search");
const resultsList = document.getElementById("results");
const errorElement = document.getElementById("error");
const loadingElement = document.getElementById("loading");

searchButton.addEventListener("click", async () => {
    errorElement.classList.add("hidden");
    resultsList.innerHTML = "";
    loadingElement.classList.remove("hidden");

    const keyword = keywordInput.value;
    const apiUrl = `/api?keyword=${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Не вдалося отримати дані");
        }
        const data = await response.json();

        if (data.results.length === 0) {
            errorElement.textContent = "Нічого не знайдено";
            errorElement.classList.remove("hidden");
        } else {
            data.results.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.name;
                li.classList.add("bg-white", "py-2", "px-4", "mb-2", "rounded");
                resultsList.appendChild(li);
            });
        }
        loadingElement.classList.add("hidden");
    } catch (error) {
        errorElement.textContent = "Сталася помилка при отриманні даних";
        errorElement.classList.remove("hidden");
        loadingElement.classList.add("hidden");
    }
});

keywordInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});
