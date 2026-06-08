function getWeekNumber(year, month, day) {
    const currentDate = new Date(year, month - 1, day);
    const firstDay = new Date(year, 0, 1).getTime();
    const weekDay = [7, 1, 2, 3, 4, 5, 6][currentDate.getDay()];
    const currentTime = currentDate.getTime();
    return 1 + Math.ceil(((currentTime - firstDay) / 36E5 / 24 - weekDay) / 7);
}

function getWeekFromInput() {
    const dateInput = document.getElementById("weekDate").value;
    if (!dateInput) {
        alert("Пожалуйста, выберите дату!");
        return;
    }
    const parts = dateInput.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const weekNumber = getWeekNumber(year, month, day);
    document.getElementById("weekResult").value = weekNumber;
}

function createEmployees() {
    const div = document.getElementById("employees");
    div.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.className = "employee-row";
        row.innerHTML =
            "Фамилия: <input type='text' id='name" + i + "'> " +
            "Дата контракта: <input type='date' id='date" + i + "'> " +
            "Срок (лет): <input type='number' id='years" + i + "' min='1'> ";
        div.appendChild(row);
    }
    // Загружаем сохранённые данные после создания полей
    loadFromLocalStorage();
}

// Сохранить в localStorage
function saveToLocalStorage() {
    const employees = [];
    for (let i = 0; i < 10; i++) {
        const nameInput = document.getElementById("name" + i);
        const dateInput = document.getElementById("date" + i);
        const yearsInput = document.getElementById("years" + i);

        if (nameInput && dateInput && yearsInput) {
            employees.push({
                name: nameInput.value,
                date: dateInput.value,
                years: yearsInput.value
            });
        }
    }
    localStorage.setItem("employeesData", JSON.stringify(employees));
    console.log("Данные сохранены в localStorage");
}

// Загрузить из localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem("employeesData");
    if (saved) {
        const employees = JSON.parse(saved);
        for (let i = 0; i < employees.length; i++) {
            const nameInput = document.getElementById("name" + i);
            const dateInput = document.getElementById("date" + i);
            const yearsInput = document.getElementById("years" + i);

            if (nameInput && dateInput && yearsInput && employees[i]) {
                nameInput.value = employees[i].name || "";
                dateInput.value = employees[i].date || "";
                yearsInput.value = employees[i].years || "";
            }
        }
        console.log("Данные загружены из localStorage");
    }
}

// Очистить localStorage
function clearLocalStorage() {
    if (confirm("Вы уверены, что хотите очистить все сохранённые данные?")) {
        localStorage.removeItem("employeesData");
        for (let i = 0; i < 10; i++) {
            const nameInput = document.getElementById("name" + i);
            const dateInput = document.getElementById("date" + i);
            const yearsInput = document.getElementById("years" + i);

            if (nameInput) nameInput.value = "";
            if (dateInput) dateInput.value = "";
            if (yearsInput) yearsInput.value = "";
        }
        alert("Данные очищены!");
        console.log("localStorage очищен");
    }
}

// Автоматическое сохранение при изменении любого поля
function attachAutoSave() {
    for (let i = 0; i < 10; i++) {
        const nameInput = document.getElementById("name" + i);
        const dateInput = document.getElementById("date" + i);
        const yearsInput = document.getElementById("years" + i);

        if (nameInput) {
            nameInput.addEventListener("input", saveToLocalStorage);
        }
        if (dateInput) {
            dateInput.addEventListener("change", saveToLocalStorage);
        }
        if (yearsInput) {
            yearsInput.addEventListener("input", saveToLocalStorage);
        }
    }
}

// Модифицируем calculateContracts, чтобы добавить автосохранение
function calculateContracts() {
    let result = "";
    for (let i = 0; i < 10; i++) {
        const name = document.getElementById("name" + i).value;
        const dateStr = document.getElementById("date" + i).value;
        const years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        const parts = dateStr.split("-");
        const startYear = parseInt(parts[0]);
        const startMonth = parseInt(parts[1]);
        const startDay = parseInt(parts[2]);
        const endYear = startYear + years;
        let month = startMonth;
        let day = startDay;
        const daysInMonth = new Date(endYear, month, 0).getDate();
        if (day > daysInMonth) {
            day = daysInMonth;
        }
        const monthNum = month;
        const weekNum = getWeekNumber(endYear, month, day);
        const days = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота"
        ];
        const tempDate = new Date(endYear, month - 1, day);
        const dayOfWeek = days[tempDate.getDay()];
        result +=
            name +
            ": Дата окончания: " +
            day + "." + month + "." + endYear +
            ", Месяц: " + monthNum +
            ", День: " + dayOfWeek +
            ", Неделя: " + weekNum +
            "<br>";
    }
    if (result === "") {
        result = "Нет заполненных данных о сотрудниках.";
    }
    document.getElementById("result").innerHTML = result;

    // Сохраняем данные после расчёта
    saveToLocalStorage();
}

function findBySeason() {
    const season = document.getElementById("seasonSelect").value;
    let result = "";
    for (let i = 0; i < 10; i++) {
        const name = document.getElementById("name" + i).value;
        const dateStr = document.getElementById("date" + i).value;
        const years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        const parts = dateStr.split("-");
        const startYear = parseInt(parts[0]);
        const startMonth = parseInt(parts[1]);
        const endYear = startYear + years;
        const month = startMonth;
        let match = false;
        if (season === "winter" && (month === 12 || month === 1 || month === 2)) {
            match = true;
        } else if (season === "spring" && (month >= 3 && month <= 5)) {
            match = true;
        } else if (season === "summer" && (month >= 6 && month <= 8)) {
            match = true;
        } else if (season === "autumn" && (month >= 9 && month <= 11)) {
            match = true;
        }
        if (match) {
            result += name + "<br>";
        }
    }

    let seasonName = "";
    if (season === "winter") {
        seasonName = "зимой";
    } else if (season === "spring") {
        seasonName = "весной";
    } else if (season === "summer") {
        seasonName = "летом";
    } else if (season === "autumn") {
        seasonName = "осенью";
    }
    if (result === "") {
        result = "Нет сотрудников.";
    }
    document.getElementById("result").innerHTML =
        "Контракт заканчивается " + seasonName + ":<br><br>" + result;
}

function findByQuarter() {
    const quarter = parseInt(document.getElementById("quarterSelect").value);
    let result = "";
    for (let i = 0; i < 10; i++) {
        const name = document.getElementById("name" + i).value;
        const dateStr = document.getElementById("date" + i).value;
        const years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        const parts = dateStr.split("-");
        const startYear = parseInt(parts[0]);
        const startMonth = parseInt(parts[1]);
        const endYear = startYear + years;
        const month = startMonth;
        let q = 0;
        if (month >= 1 && month <= 3) {
            q = 1;
        } else if (month >= 4 && month <= 6) {
            q = 2;
        } else if (month >= 7 && month <= 9) {
            q = 3;
        } else if (month >= 10 && month <= 12) {
            q = 4;
        }
        if (q === quarter) {
            result += name + "<br>";
        }
    }

    if (result === "") {
        result = "Нет сотрудников.";
    }
    document.getElementById("result").innerHTML =
        quarter + "-й квартал:<br><br>" + result;
}

function findByActiveOnDate() {
    const activeDateInput = document.getElementById("activeDate").value;
    if (!activeDateInput) {
        alert("Выберите дату!");
        return;
    }
    const checkDate = new Date(activeDateInput);
    if (isNaN(checkDate.getTime())) {
        alert("Некорректная дата!");
        return;
    }
    let result = "";
    for (let i = 0; i < 10; i++) {
        const name = document.getElementById("name" + i).value;
        const dateStr = document.getElementById("date" + i).value;
        const years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        const parts = dateStr.split("-");
        const startYear = parseInt(parts[0]);
        const startMonth = parseInt(parts[1]);
        const startDay = parseInt(parts[2]);
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endYear = startYear + years;
        const endMonth = startMonth;
        let endDay = startDay;
        const daysInMonth = new Date(endYear, endMonth, 0).getDate();
        if (endDay > daysInMonth) {
            endDay = daysInMonth;
        }
        const endDate = new Date(endYear, endMonth - 1, endDay);
        if (startDate <= checkDate && endDate > checkDate) {
            result +=
                name +
                " (до " +
                endDay + "." + endMonth + "." + endYear + ")<br>";
        }
    }
    if (result === "") {
        result = "Нет действующих контрактов.";
    }
    document.getElementById("result").innerHTML =
        "Активные на " +
        checkDate.toLocaleDateString() +
        ":<br><br>" +
        result;
}

function findByExpiredOnDate() {
    const expiredDateInput = document.getElementById("expiredDate").value;
    if (!expiredDateInput) {
        alert("Выберите дату!");
        return;
    }
    const refDate = new Date(expiredDateInput);
    if (isNaN(refDate.getTime())) {
        alert("Некорректная дата!");
        return;
    }
    let result = "";
    for (let i = 0; i < 10; i++) {
        const name = document.getElementById("name" + i).value;
        const dateStr = document.getElementById("date" + i).value;
        const years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        const parts = dateStr.split("-");
        const startYear = parseInt(parts[0]);
        const startMonth = parseInt(parts[1]);
        const startDay = parseInt(parts[2]);
        const endYear = startYear + years;
        const endMonth = startMonth;
        let endDay = startDay;
        const daysInMonth = new Date(endYear, endMonth, 0).getDate();
        if (endDay > daysInMonth) {
            endDay = daysInMonth;
        }
        const endDate = new Date(endYear, endMonth - 1, endDay);
        if (endDate <= refDate) {
            result +=
                name +
                " (завершён " +
                endDay + "." + endMonth + "." + endYear + ")<br>";
        }
    }
    if (result === "") {
        result = "Нет завершённых контрактов.";
    }
    document.getElementById("result").innerHTML =
        "Завершённые до " +
        refDate.toLocaleDateString() +
        ":<br><br>" +
        result;
}

function setFocusOnFirst() {
    const firstInput = document.getElementById("weekDate");
    if (firstInput) {
        firstInput.focus();
    }
}

// Загружаем данные при загрузке страницы
window.addEventListener("DOMContentLoaded", function() {
    // Примечание: createEmployees() уже вызывает loadFromLocalStorage()
    // Поэтому просто вызываем создание полей
    if (document.getElementById("employees")) {
        createEmployees();
    }
});