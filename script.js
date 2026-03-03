// Inputs
let nameInput = document.getElementById("name");
let heightInput = document.getElementById("height");
let weightInput = document.getElementById("weight");
let resultDiv = document.getElementById("result");
let historyList = document.getElementById("history");

// Buttons
let calculateBtn = document.getElementById("calculateBtn");
let resetBtn = document.getElementById("resetBtn");
let metricBtn = document.getElementById("metricBtn");
let imperialBtn = document.getElementById("imperialBtn");

// Default unit
let unit = "metric";

// Load history on page load
window.onload = function () {
    showHistory();
};



// TOGGLE FEATURE
metricBtn.addEventListener("click", function () {
    unit = "metric";

    heightInput.placeholder = "Height (cm)";
    weightInput.placeholder = "Weight (kg)";

    metricBtn.classList.add("active");
    imperialBtn.classList.remove("active");
});

imperialBtn.addEventListener("click", function () {
    unit = "imperial";

    heightInput.placeholder = "Height (feet)";
    weightInput.placeholder = "Weight (lbs)";

    imperialBtn.classList.add("active");
    metricBtn.classList.remove("active");
});




// CALCULATE BMI
calculateBtn.addEventListener("click", function () {

    let name = nameInput.value.trim();
    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);

    // Validation
    if (!name || !height || !weight || height <= 0 || weight <= 0) {
        resultDiv.innerText = "Please fill all fields properly";
        resultDiv.style.color = "white";
        return;
    }
    let bmi;

    if (unit === "metric") {
        let heightInMeter = height / 100;
        bmi = weight / (heightInMeter * heightInMeter);
    }
    else {
        let heightInInches = height * 12;
        bmi = (weight / (heightInInches * heightInInches)) * 703;
    }
    bmi = bmi.toFixed(2);
    let category = "";
    let categoryClass = "";

    if (bmi < 18.5) {
        category = "Underweight";
        categoryClass = "bmi-underweight";
        resultDiv.style.color = "var(--underweight)";
    }
    else if (bmi <= 24.9) {
        category = "Normal weight";
        categoryClass = "bmi-normal";
        resultDiv.style.color = "var(--normal)";
    }
    else if (bmi <= 29.9) {
        category = "Overweight";
        categoryClass = "bmi-overweight";
        resultDiv.style.color = "var(--overweight)";
    }
    else {
        category = "Obese";
        categoryClass = "bmi-obese";
        resultDiv.style.color = "var(--obese)";
    }

    resultDiv.innerText = name + ", your BMI is " + bmi + " (" + category + ")";

    saveHistory(name, bmi, categoryClass);
    showHistory();
});




// RESET BUTTON
resetBtn.addEventListener("click", function () {
    nameInput.value = "";
    heightInput.value = "";
    weightInput.value = "";
    resultDiv.innerText = "";
    resultDiv.style.color = "white";
});



// SAVE HISTORY
function saveHistory(name, bmi, categoryClass) {

    let data = JSON.parse(localStorage.getItem("bmiHistory")) || [];

    data.push({
        name: name,
        bmi: bmi,
        categoryClass: categoryClass
    });

    localStorage.setItem("bmiHistory", JSON.stringify(data));
}




// SHOW HISTORY
function showHistory() {
    historyList.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    data.forEach(function (item) {
        let li = document.createElement("li");

        li.innerHTML = `
      ${item.name} - BMI: 
      <span class="${item.categoryClass}">
        ${item.bmi}
      </span>
    `;

        historyList.appendChild(li);
    });
}