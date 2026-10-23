
// The key is the name used to store history in browser localStorage.
const HISTORY_KEY = "studentGradeCalculatorHistory";

// Calculate the student's weighted grade.
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get grade inputs as text so empty fields can be detected.
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();
    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

    // Get the area for the current result.
    let resultDiv = document.getElementById("result");

    // Clear the previous result and its color.
    resultDiv.textContent = "";
    resultDiv.className = "";

    // Validate the student's name.
    if (name === "") {
        showError("Please enter the student's name.");
        return;
    }

    // Validate that all grade fields have values.
    if (
        mcoInput === "" ||
        examInput === "" ||
        attendanceQuizInput === ""
    ) {
        showError("Please enter all three grades.");
        return;
    }

    // Convert the input values into numbers.
    let mco = Number(mcoInput);
    let exam = Number(examInput);
    let attendanceQuiz = Number(attendanceQuizInput);

    // Reject values that are not valid numbers.
    if (
        !Number.isFinite(mco) ||
        !Number.isFinite(exam) ||
        !Number.isFinite(attendanceQuiz)
    ) {
        showError("Please enter valid numeric grades.");
        return;
    }

    // Make sure each grade is between 0 and 100.
    if (
        mco < 0 || mco > 100 ||
        exam < 0 || exam > 100 ||
        attendanceQuiz < 0 || attendanceQuiz > 100
    ) {
        showError("Grades must be between 0 and 100.");
        return;
    }

    // Calculate the weighted score for each component.
    let weightedMCO = mco * 0.50;
    let weightedExam = exam * 0.30;
    let weightedAttendanceQuiz = attendanceQuiz * 0.20;

    // Add the weighted scores to calculate the final grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Prepare variables for the letter grade and result message.
    let letterGrade;
    let result;
    let resultClass;

    // Assign the letter grade and result based on the final grade.
    if (finalGrade >= 90) {
        letterGrade = "A";
        result = "Excellent!";
        resultClass = "excellent";
    } else if (finalGrade >= 85) {
        letterGrade = "B";
        result = "Passed!";
        resultClass = "passed";
    } else if (finalGrade >= 80) {
        letterGrade = "C";
        result = "Passed!";
        resultClass = "passed";
    } else if (finalGrade >= 75) {
        letterGrade = "D";
        result = "Passed!";
        resultClass = "passed";
    } else {
        letterGrade = "F";
        result = "Failed.";
        resultClass = "failed";
    }

    // Display the current student's result.
    resultDiv.className = resultClass;

    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent =
        "Final Grade: " + finalGrade.toFixed(2);

    let letterParagraph = document.createElement("p");
    letterParagraph.textContent = "Letter Grade: " + letterGrade;

    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(letterParagraph);
    resultDiv.appendChild(resultParagraph);

    // Create an object containing the student's calculation.
    let record = {
        name: name,
        mco: mco,
        exam: exam,
        attendanceQuiz: attendanceQuiz,
        finalGrade: finalGrade,
        letterGrade: letterGrade,
        result: result,
        date: new Date().toLocaleString()
    };

    // Save the record and refresh the history displayed on the page.
    saveCalculation(record);
}

// Display a validation message in the result area.
function showError(message) {
    let resultDiv = document.getElementById("result");
    resultDiv.textContent = message;
    resultDiv.className = "error";
}

// Read saved calculations from localStorage.
function getHistory() {
    try {
        let savedHistory = localStorage.getItem(HISTORY_KEY);

        // If no history exists yet, return an empty array.
        if (savedHistory === null) {
            return [];
        }

        // Convert the saved JSON text back into a JavaScript array.
        let history = JSON.parse(savedHistory);

        // Make sure the stored data is an array.
        return Array.isArray(history) ? history : [];
    } catch (error) {
        // Handle unavailable or invalid stored data safely.
        return [];
    }
}

// Save a new calculation in browser storage.
function saveCalculation(record) {
    let history = getHistory();

    // Add the newest calculation to the beginning of the list.
    history.unshift(record);

    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        displayHistory();
    } catch (error) {
        // The calculation still appears even if saving fails.
        alert("The grade was calculated, but history could not be saved.");
    }
}

// Display all saved calculations.
function displayHistory() {
    let historyList = document.getElementById("historyList");

    // Remove the old displayed history before rebuilding the list.
    historyList.textContent = "";

    let history = getHistory();

    // Show a message when there are no saved calculations.
    if (history.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No calculation history yet.";
        historyList.appendChild(emptyMessage);
        return;
    }

    // Create one history card for each saved calculation.
    history.forEach(function(record) {
        let card = document.createElement("div");
        card.className = "history-card";

        let name = document.createElement("p");
        name.textContent = "Student: " + record.name;

        let grade = document.createElement("p");
        grade.textContent =
            "Final Grade: " + Number(record.finalGrade).toFixed(2);

        let letter = document.createElement("p");
        letter.textContent = "Letter Grade: " + record.letterGrade;

        let result = document.createElement("p");
        result.textContent = "Result: " + record.result;

        let date = document.createElement("small");
        date.textContent = "Calculated: " + record.date;

        card.appendChild(name);
        card.appendChild(grade);
        card.appendChild(letter);
        card.appendChild(result);
        card.appendChild(date);

        historyList.appendChild(card);
    });
}

// Clear all inputs and the current result.
// This does not delete saved calculation history.
function resetCalculator() {
    document.getElementById("studentName").value = "";
    document.getElementById("mco").value = "";
    document.getElementById("exam").value = "";
    document.getElementById("attendanceQuiz").value = "";

    let resultDiv = document.getElementById("result");
    resultDiv.textContent = "";
    resultDiv.className = "";

    document.getElementById("studentName").focus();
}

// Delete all saved calculations after confirmation.
function clearHistory() {
    let shouldClear = confirm(
        "Are you sure you want to delete all calculation history?"
    );

    // Stop if the user cancels the confirmation.
    if (!shouldClear) {
        return;
    }

    try {
        localStorage.removeItem(HISTORY_KEY);
        displayHistory();
    } catch (error) {
        alert("Unable to clear the calculation history.");
    }
}

// Show previously saved calculations when the page opens.
displayHistory();
