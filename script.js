
// Calculate the student's weighted grade and display the result.
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get the grade inputs as text.
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();
    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

    // Get the result area from the HTML.
    let resultDiv = document.getElementById("result");

    // Clear the previous result.
    resultDiv.textContent = "";

    // Check if the student name is empty.
    if (name === "") {
        resultDiv.textContent = "Please enter the student's name.";
        return;
    }

    // Check if any grade field is empty.
    if (
        mcoInput === "" ||
        examInput === "" ||
        attendanceQuizInput === ""
    ) {
        resultDiv.textContent = "Please enter all three grades.";
        return;
    }

    // Convert the grade inputs into numbers.
    let mco = Number(mcoInput);
    let exam = Number(examInput);
    let attendanceQuiz = Number(attendanceQuizInput);

    // Check if all inputs are valid numbers.
    if (
        !Number.isFinite(mco) ||
        !Number.isFinite(exam) ||
        !Number.isFinite(attendanceQuiz)
    ) {
        resultDiv.textContent = "Please enter valid numeric grades.";
        return;
    }

    // Make sure every grade is between 0 and 100.
    if (
        mco < 0 || mco > 100 ||
        exam < 0 || exam > 100 ||
        attendanceQuiz < 0 || attendanceQuiz > 100
    ) {
        resultDiv.textContent = "Grades must be between 0 and 100.";
        return;
    }

    // Calculate the weighted score of each component.
    let weightedMCO = mco * 0.50;
    let weightedExam = exam * 0.30;
    let weightedAttendanceQuiz = attendanceQuiz * 0.20;

    // Add the weighted scores to get the final grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Create variables for the letter grade and result message.
    let letterGrade;
    let result;

    // Assign a letter grade based on the final grade.
    if (finalGrade >= 90) {
        letterGrade = "A";
        result = "Excellent!";
    } else if (finalGrade >= 85) {
        letterGrade = "B";
        result = "Passed!";
    } else if (finalGrade >= 80) {
        letterGrade = "C";
        result = "Passed!";
    } else if (finalGrade >= 75) {
        letterGrade = "D";
        result = "Passed!";
    } else {
        letterGrade = "F";
        result = "Failed.";
    }

    // Create a paragraph to display the student's name.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    // Display the final weighted grade.
    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent =
        "Final Grade: " + finalGrade.toFixed(2);

    // Display the letter grade.
    let letterParagraph = document.createElement("p");
    letterParagraph.textContent = "Letter Grade: " + letterGrade;

    // Display the pass/fail result.
    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    // Add all results to the HTML result area.
    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(letterParagraph);
    resultDiv.appendChild(resultParagraph);
}
