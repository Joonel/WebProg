const keywordInput = document.getElementById("keyword");
const searchButton = document.getElementById("search");
const resultsList = document.getElementById("results");
const errorElement = document.getElementById("error");

searchButton.addEventListener("click", async () => {
    errorElement.classList.add("hidden");
    resultsList.innerHTML = "";

    const keyword = keywordInput.value;
    const apiUrl = `/api?keyword=${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Не вдалося отримати дані :(");
        }
        const data = await response.json();

        if (data.results.length === 0) {
            errorElement.textContent = "Нічого не знайдено :(";
            errorElement.classList.remove("hidden");
        } else {
            data.results.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.name;
                resultsList.appendChild(li);
            });
        }
    } catch (error) {
        errorElement.textContent = "Сталася помилка при отриманні даних :(";
        errorElement.classList.remove("hidden");
    }
});
