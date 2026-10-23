
/* The key used to store calculation history in the browser. */
const HISTORY_KEY = "studentGradeCalculatorHistory";

/* Calculates the student's weighted grade. */
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get the grades as text so empty inputs can be detected.
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();

    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

    // Get the area used to display the current result.
    let resultDiv = document.getElementById("result");

    // Clear the previous result and its color.
    resultDiv.textContent = "";
    resultDiv.className = "";

    // Check whether the student entered a name.
    if (name === "") {
        showError("Please enter the student's name.");
        return;
    }

    // Check whether all grade fields contain values.
    if (
        mcoInput === "" ||
        examInput === "" ||
        attendanceQuizInput === ""
    ) {
        showError("Please enter all three grades.");
        return;
    }

    // Convert the input values from text into numbers.
    let mco = Number(mcoInput);
    let exam = Number(examInput);
    let attendanceQuiz = Number(attendanceQuizInput);

    // Reject invalid numeric values.
    if (
        !Number.isFinite(mco) ||
        !Number.isFinite(exam) ||
        !Number.isFinite(attendanceQuiz)
    ) {
        showError("Please enter valid numeric grades.");
        return;
    }

    // Make sure every grade is between 0 and 100.
    if (
        mco < 0 || mco > 100 ||
        exam < 0 || exam > 100 ||
        attendanceQuiz < 0 || attendanceQuiz > 100
    ) {
        showError("Grades must be between 0 and 100.");
        return;
    }

    // Calculate the weighted contribution of each grade.
    let weightedMCO = mco * 0.50;
    let weightedExam = exam * 0.30;
    let weightedAttendanceQuiz = attendanceQuiz * 0.20;

    // Add the weighted contributions for the final grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Prepare variables for the letter grade and result message.
    let letterGrade;
    let result;
    let resultClass;

    // Assign a letter grade based on the final grade.
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

    // Apply the correct result color.
    resultDiv.className = resultClass;

    // Create and display the student's name.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    // Create and display the final grade.
    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent =
        "Final Grade: " + finalGrade.toFixed(2);

    // Create and display the letter grade.
    let letterParagraph = document.createElement("p");
    letterParagraph.textContent = "Letter Grade: " + letterGrade;

    // Create and display the result message.
    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    // Add all result paragraphs to the result area.
    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(letterParagraph);
    resultDiv.appendChild(resultParagraph);

    // Create a record containing this calculation.
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

    // Save the record and refresh the history display.
    saveCalculation(record);
}

/* Displays a validation error message. */
function showError(message) {
    let resultDiv = document.getElementById("result");

    resultDiv.textContent = message;
    resultDiv.className = "error";
}

/* Retrieves saved calculations from browser storage. */
function getHistory() {
    try {
        // Read the saved history as text.
        let savedHistory = localStorage.getItem(HISTORY_KEY);

        // Return an empty array if nothing has been saved.
        if (savedHistory === null) {
            return [];
        }

        // Convert the saved JSON text back into an array.
        let history = JSON.parse(savedHistory);

        // Make sure the stored data is an array.
        return Array.isArray(history) ? history : [];

    } catch (error) {
        // Return an empty array if stored data cannot be read.
        return [];
    }
}

/* Saves a new calculation in browser storage. */
function saveCalculation(record) {
    let history = getHistory();

    // Put the newest calculation at the beginning.
    history.unshift(record);

    try {
        // Convert the array into JSON text and save it.
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

        // Refresh the history shown on the page.
        displayHistory();

    } catch (error) {
        // The current calculation is still displayed if saving fails.
        alert("The grade was calculated, but history could not be saved.");
    }
}

/* Displays saved calculations and filters them by student name. */
function displayHistory() {

    // Get the area where history cards will appear.
    let historyList = document.getElementById("historyList");

    // Get the search text entered by the user.
    let searchInput = document.getElementById("historySearch");

    // Convert the search text to lowercase.
    let searchText = searchInput.value.trim().toLowerCase();

    // Remove previously displayed cards.
    historyList.textContent = "";

    // Retrieve all saved calculations.
    let history = getHistory();

    // Filter history based on the student's name.
    let filteredHistory = history.filter(function(record) {
        return String(record.name).toLowerCase().includes(searchText);
    });

    // Display a message when no history has been saved.
    if (history.length === 0) {
        let emptyMessage = document.createElement("p");

        emptyMessage.textContent = "No calculation history yet.";

        historyList.appendChild(emptyMessage);
        return;
    }

    // Display a message when the search finds no matching student.
    if (filteredHistory.length === 0) {
        let emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "No students found matching your search.";

        historyList.appendChild(emptyMessage);
        return;
    }

    // Create a card for each matching calculation.
    filteredHistory.forEach(function(record) {

        let card = document.createElement("div");
        card.className = "history-card";

        // Display the student's name.
        let name = document.createElement("p");
        name.textContent = "Student: " + record.name;

        // Display the final grade.
        let grade = document.createElement("p");
        grade.textContent =
            "Final Grade: " + Number(record.finalGrade).toFixed(2);

        // Display the letter grade.
        let letter = document.createElement("p");
        letter.textContent = "Letter Grade: " + record.letterGrade;

        // Display whether the student passed or failed.
        let result = document.createElement("p");
        result.textContent = "Result: " + record.result;

        // Display the date and time of the calculation.
        let date = document.createElement("small");
        date.textContent = "Calculated: " + record.date;

        // Add the information to the card.
        card.appendChild(name);
        card.appendChild(grade);
        card.appendChild(letter);
        card.appendChild(result);
        card.appendChild(date);

        // Add the card to the webpage.
        historyList.appendChild(card);
    });
}

/* Clears the input fields and current result. */
function resetCalculator() {

    // Clear the student's name.
    document.getElementById("studentName").value = "";

    // Clear all grade inputs.
    document.getElementById("mco").value = "";
    document.getElementById("exam").value = "";
    document.getElementById("attendanceQuiz").value = "";

    // Clear the displayed result and its color.
    let resultDiv = document.getElementById("result");
    resultDiv.textContent = "";
    resultDiv.className = "";

    // Put the cursor back in the student name input.
    document.getElementById("studentName").focus();
}

/* Deletes all saved calculations after confirmation. */
function clearHistory() {

    // Ask the user before permanently clearing the saved history.
    let shouldClear = confirm(
        "Are you sure you want to delete all calculation history?"
    );

    // Stop if the user chooses Cancel.
    if (!shouldClear) {
        return;
    }

    try {
        // Remove the saved history from browser storage.
        localStorage.removeItem(HISTORY_KEY);

        // Clear the search box.
        document.getElementById("historySearch").value = "";

        // Update the page to show that history is empty.
        displayHistory();

    } catch (error) {
        // Inform the user if history cannot be deleted.
        alert("Unable to clear the calculation history.");
    }
}

/* Display saved calculations when the webpage first opens. */
displayHistory();
