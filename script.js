
// Calculate the student's weighted grade and display the result.
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get the grade inputs as text.
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();
    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

    // Get the HTML element where the result will appear.
    let resultDiv = document.getElementById("result");

    // Clear the previous result and its color.
    resultDiv.textContent = "";
    resultDiv.className = "";

    // Check whether the student entered a name.
    if (name === "") {
        resultDiv.textContent = "Please enter the student's name.";
        resultDiv.className = "error";
        return;
    }

    // Check whether all grade fields contain values.
    if (
        mcoInput === "" ||
        examInput === "" ||
        attendanceQuizInput === ""
    ) {
        resultDiv.textContent = "Please enter all three grades.";
        resultDiv.className = "error";
        return;
    }

    // Convert the input values into numbers.
    let mco = Number(mcoInput);
    let exam = Number(examInput);
    let attendanceQuiz = Number(attendanceQuizInput);

    // Make sure all inputs are valid numbers.
    if (
        !Number.isFinite(mco) ||
        !Number.isFinite(exam) ||
        !Number.isFinite(attendanceQuiz)
    ) {
        resultDiv.textContent = "Please enter valid numeric grades.";
        resultDiv.className = "error";
        return;
    }

    // Check that every grade is between 0 and 100.
    if (
        mco < 0 || mco > 100 ||
        exam < 0 || exam > 100 ||
        attendanceQuiz < 0 || attendanceQuiz > 100
    ) {
        resultDiv.textContent = "Grades must be between 0 and 100.";
        resultDiv.className = "error";
        return;
    }

    // Calculate each component using its assigned weight.
    let weightedMCO = mco * 0.50;
    let weightedExam = exam * 0.30;
    let weightedAttendanceQuiz = attendanceQuiz * 0.20;

    // Add the weighted scores to get the final grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Create variables for the letter grade and result message.
    let letterGrade;
    let result;

    // Assign the letter grade and result.
    if (finalGrade >= 90) {
        letterGrade = "A";
        result = "Excellent!";
        resultDiv.className = "excellent";
    } else if (finalGrade >= 85) {
        letterGrade = "B";
        result = "Passed!";
        resultDiv.className = "passed";
    } else if (finalGrade >= 80) {
        letterGrade = "C";
        result = "Passed!";
        resultDiv.className = "passed";
    } else if (finalGrade >= 75) {
        letterGrade = "D";
        result = "Passed!";
        resultDiv.className = "passed";
    } else {
        letterGrade = "F";
        result = "Failed.";
        resultDiv.className = "failed";
    }

    // Create a paragraph for the student's name.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    // Create a paragraph for the final weighted grade.
    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent =
        "Final Grade: " + finalGrade.toFixed(2);

    // Create a paragraph for the letter grade.
    let letterParagraph = document.createElement("p");
    letterParagraph.textContent = "Letter Grade: " + letterGrade;

    // Create a paragraph for the result message.
    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    // Display all four paragraphs.
    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(letterParagraph);
    resultDiv.appendChild(resultParagraph);
}
