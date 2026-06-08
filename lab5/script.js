function getWeekNumber(year, month, day) {
    var c = new Date(year, month - 1, day);
    var b = (new Date(year, 0, 1)).getTime();
    var a = [7, 1, 2, 3, 4, 5, 6][c.getDay()];
    c = c.getTime();
    return 1 + Math.ceil(((c - b) / 36E5 / 24 - a) / 7);
}

function getWeekFromInput() {
    var dateInput = document.getElementById("weekDate").value;
    if (!dateInput) {
        alert("Пожалуйста, выберите дату!");
        return;
    }
    var parts = dateInput.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]);
    var weekNumber = getWeekNumber(year, month, day);
    document.getElementById("weekResult").value = weekNumber;
}

function createEmployees() {
    var div = document.getElementById("employees");
    div.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        div.innerHTML +=
            "<div class='employee-row'>" +
            "Фамилия: <input type='text' id='name" + i + "'> " +
            "Дата контракта: <input type='date' id='date" + i + "'> " +
            "Срок (лет): <input type='number' id='years" + i + "' min='1'> " +
            "</div>";
    }
}

function calculateContracts() {
    var result = "";
    for (var i = 0; i < 10; i++) {
        var name = document.getElementById("name" + i).value;
        var dateStr = document.getElementById("date" + i).value;
        var years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        var parts = dateStr.split("-");
        var startYear = parseInt(parts[0]);
        var startMonth = parseInt(parts[1]);
        var startDay = parseInt(parts[2]);
        var endYear = startYear + years;
        var month = startMonth;
        var day = startDay;
        var daysInMonth = new Date(endYear, month, 0).getDate();
        if (day > daysInMonth) day = daysInMonth;
        var monthNum = month;
        var weekNum = getWeekNumber(endYear, month, day);
        var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        var tempDate = new Date(endYear, month - 1, day);
        var dayOfWeek = days[tempDate.getDay()];
        result += name + ": " +
            "Дата окончания: " + day + "." + month + "." + endYear +
            ", Месяц: " + monthNum +
            ", День: " + dayOfWeek +
            ", Неделя: " + weekNum + "<br>";
    }
    if (result == "") result = "Нет заполненных данных о сотрудниках.";
    document.getElementById("result").innerHTML = result;
}

function findBySeason() {
    var season = document.getElementById("seasonSelect").value;
    var result = "";
    for (var i = 0; i < 10; i++) {
        var name = document.getElementById("name" + i).value;
        var dateStr = document.getElementById("date" + i).value;
        var years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        var parts = dateStr.split("-");
        var startYear = parseInt(parts[0]);
        var startMonth = parseInt(parts[1]);
        var startDay = parseInt(parts[2]);
        var endYear = startYear + years;
        var month = startMonth;
        var day = startDay;
        var daysInMonth = new Date(endYear, month, 0).getDate();
        if (day > daysInMonth) day = daysInMonth;
        var match = false;
        if (season == "winter" && (month == 12 || month == 1 || month == 2)) match = true;
        else if (season == "spring" && (month >= 3 && month <= 5)) match = true;
        else if (season == "summer" && (month >= 6 && month <= 8)) match = true;
        else if (season == "autumn" && (month >= 9 && month <= 11)) match = true;
        if (match) result += name + "<br>";
    }

    var seasonName = "";
    if (season == "winter") seasonName = "зиму";
    else if (season == "spring") seasonName = "весну";
    else if (season == "summer") seasonName = "лето";
    else if (season == "autumn") seasonName = "осень";
    if (result == "") result = "Нет сотрудников.";
    document.getElementById("result").innerHTML = "Контракт заканчивается " + seasonName + ":<br><br>" + result;
}

function findByQuarter() {
    var quarter = parseInt(document.getElementById("quarterSelect").value);
    var result = "";
    for (var i = 0; i < 10; i++) {
        var name = document.getElementById("name" + i).value;
        var dateStr = document.getElementById("date" + i).value;
        var years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        var parts = dateStr.split("-");
        var startYear = parseInt(parts[0]);
        var startMonth = parseInt(parts[1]);
        var startDay = parseInt(parts[2]);
        var endYear = startYear + years;
        var month = startMonth;
        var day = startDay;
        var daysInMonth = new Date(endYear, month, 0).getDate();
        if (day > daysInMonth) day = daysInMonth;
        var q = 0;
        if (month >= 1 && month <= 3) q = 1;
        else if (month >= 4 && month <= 6) q = 2;
        else if (month >= 7 && month <= 9) q = 3;
        else if (month >= 10 && month <= 12) q = 4;
        if (q == quarter) result += name + "<br>";
    }

    if (result == "") result = "Нет сотрудников.";
    document.getElementById("result").innerHTML = quarter + "-й квартал:<br><br>" + result;
}

function findByActiveOnDate() {
    var activeDateInput = document.getElementById("activeDate").value;
    if (!activeDateInput) {
        alert("Выберите дату!");
        return;
    }
    var checkDate = new Date(activeDateInput);
    if (isNaN(checkDate.getTime())) {
        alert("Некорректная дата!");
        return;
    }
    var result = "";
    for (var i = 0; i < 10; i++) {
        var name = document.getElementById("name" + i).value;
        var dateStr = document.getElementById("date" + i).value;
        var years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        var parts = dateStr.split("-");
        var startYear = parseInt(parts[0]);
        var startMonth = parseInt(parts[1]);
        var startDay = parseInt(parts[2]);
        var startDate = new Date(startYear, startMonth - 1, startDay);
        var endYear = startYear + years;
        var endMonth = startMonth;
        var endDay = startDay;
        var daysInMonth = new Date(endYear, endMonth, 0).getDate();
        if (endDay > daysInMonth) endDay = daysInMonth;
        var endDate = new Date(endYear, endMonth - 1, endDay);
        if (startDate <= checkDate && endDate > checkDate) {
            result += name + " (до " + endDay + "." + endMonth + "." + endYear + ")<br>";
        }
    }
    if (result == "") result = "Нет действующих контрактов.";
    document.getElementById("result").innerHTML = "Активные на " + checkDate.toLocaleDateString() + ":<br><br>" + result;
}

function findByExpiredOnDate() {
    var expiredDateInput = document.getElementById("expiredDate").value;
    if (!expiredDateInput) {
        alert("Выберите дату!");
        return;
    }
    var refDate = new Date(expiredDateInput);
    if (isNaN(refDate.getTime())) {
        alert("Некорректная дата!");
        return;
    }
    var result = "";
    for (var i = 0; i < 10; i++) {
        var name = document.getElementById("name" + i).value;
        var dateStr = document.getElementById("date" + i).value;
        var years = parseInt(document.getElementById("years" + i).value);
        if (!name || !dateStr || !years) continue;
        var parts = dateStr.split("-");
        var startYear = parseInt(parts[0]);
        var startMonth = parseInt(parts[1]);
        var startDay = parseInt(parts[2]);
        var endYear = startYear + years;
        var endMonth = startMonth;
        var endDay = startDay;
        var daysInMonth = new Date(endYear, endMonth, 0).getDate();
        if (endDay > daysInMonth) endDay = daysInMonth;
        var endDate = new Date(endYear, endMonth - 1, endDay);
        if (endDate <= refDate) {
            result += name + " (завершён " + endDay + "." + endMonth + "." + endYear + ")<br>";
        }
    }
    if (result == "") result = "Нет завершённых контрактов.";
    document.getElementById("result").innerHTML = "Завершённые до " + refDate.toLocaleDateString() + ":<br><br>" + result;
}

function setFocusOnFirst() {
    var firstInput = document.getElementById("weekDate");
    if (firstInput) {
        firstInput.focus();
    }
}