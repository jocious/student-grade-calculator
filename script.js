
/* The key used to store calculation history in the browser. */
const HISTORY_KEY = "studentGradeCalculatorHistory";

/* Calculates the student's weighted grade. */
function calculateGrade() {
    let name = document.getElementById("studentName").value.trim();
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();
    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

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

    // Convert input text into numbers.
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

    // Check that every grade is between 0 and 100.
    if (
        mco < 0 || mco > 100 ||
        exam < 0 || exam > 100 ||
        attendanceQuiz < 0 || attendanceQuiz > 100
    ) {
        showError("Grades must be between 0 and 100.");
        return;
    }

    // Calculate each weighted grade contribution.
    let weightedMCO = mco * 0.50;
    let weightedExam = exam * 0.30;
    let weightedAttendanceQuiz = attendanceQuiz * 0.20;

    // Calculate the final weighted grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Prepare the letter grade, result message, and result color.
    let letterGrade;
    let result;
    let resultClass;

    // Assign a letter grade using the sample grading scale.
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

    // Apply the result color.
    resultDiv.className = resultClass;

    // Display the student's name.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    // Display the final grade.
    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent =
        "Final Grade: " + finalGrade.toFixed(2);

    // Display the letter grade.
    let letterParagraph = document.createElement("p");
    letterParagraph.textContent = "Letter Grade: " + letterGrade;

    // Display the result message.
    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(letterParagraph);
    resultDiv.appendChild(resultParagraph);

    // Create a record for the calculation history.
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

    // Save the calculation.
    saveCalculation(record);
}

/* Displays an error message. */
function showError(message) {
    let resultDiv = document.getElementById("result");
    resultDiv.textContent = message;
    resultDiv.className = "error";
}

/* Retrieves the saved history from localStorage. */
function getHistory() {
    try {
        let savedHistory = localStorage.getItem(HISTORY_KEY);

        // Return an empty array if no history exists.
        if (savedHistory === null) {
            return [];
        }

        // Convert the stored JSON text into an array.
        let history = JSON.parse(savedHistory);

        // Make sure the stored data is an array.
        return Array.isArray(history) ? history : [];
    } catch (error) {
        return [];
    }
}

/* Saves a new calculation. */
function saveCalculation(record) {
    let history = getHistory();

    // Put the newest calculation first.
    history.unshift(record);

    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        displayHistory();
    } catch (error) {
        alert("The grade was calculated, but history could not be saved.");
    }
}

/* Displays saved calculations and filters them by student name. */
function displayHistory() {
    let historyList = document.getElementById("historyList");
    let searchInput = document.getElementById("historySearch");
    let searchText = searchInput.value.trim().toLowerCase();

    // Clear the previously displayed cards.
    historyList.textContent = "";

    let history = getHistory();

    // Find records whose student names match the search.
    let filteredHistory = history.filter(function(record) {
        return String(record.name).toLowerCase().includes(searchText);
    });

    // Show a message when no calculations have been saved.
    if (history.length === 0) {
        let message = document.createElement("p");
        message.textContent = "No calculation history yet.";
        historyList.appendChild(message);
        return;
    }

    // Show a message when no records match the search.
    if (filteredHistory.length === 0) {
        let message = document.createElement("p");
        message.textContent = "No students found matching your search.";
        historyList.appendChild(message);
        return;
    }

    // Display each matching calculation.
    filteredHistory.forEach(function(record) {
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

/* Clears the input fields without deleting saved history. */
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

/* Deletes all saved calculations after confirmation. */
function clearHistory() {
    let shouldClear = confirm(
        "Are you sure you want to delete all calculation history?"
    );

    // Stop if the user cancels.
    if (!shouldClear) {
        return;
    }

    try {
        localStorage.removeItem(HISTORY_KEY);
        document.getElementById("historySearch").value = "";
        displayHistory();
    } catch (error) {
        alert("Unable to clear the calculation history.");
    }
}

/* Exports all saved calculations to a CSV file. */
function exportHistory() {
    let history = getHistory();

    // Do not download a file if no calculations exist.
    if (history.length === 0) {
        alert("There is no calculation history to export.");
        return;
    }

    // Define the column headings for the CSV file.
    let rows = [
        [
            "Student Name",
            "MCO Grade",
            "Exam Grade",
            "Attendance and Quiz Grade",
            "Final Grade",
            "Letter Grade",
            "Result",
            "Date Calculated"
        ]
    ];

    // Add every saved calculation as a row.
    history.forEach(function(record) {
        rows.push([
            record.name,
            record.mco,
            record.exam,
            record.attendanceQuiz,
            Number(record.finalGrade).toFixed(2),
            record.letterGrade,
            record.result,
            record.date
        ]);
    });

    // Escape CSV values so commas and quotation marks are handled correctly.
    let csvContent = rows.map(function(row) {
        return row.map(function(value) {
            let safeValue = String(value ?? "").replace(/"/g, '""');
            return '"' + safeValue + '"';
        }).join(",");
    }).join("\r\n");

    // Add a byte-order mark to help spreadsheet programs read UTF-8 text.
    let csvFile = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    // Create a temporary download link.
    let downloadUrl = URL.createObjectURL(csvFile);
    let link = document.createElement("a");

    link.href = downloadUrl;
    link.download = "student-grade-history.csv";

    // Start the file download.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the temporary browser URL.
    URL.revokeObjectURL(downloadUrl);
}

/* Display saved history when the page first opens. */
displayHistory();
