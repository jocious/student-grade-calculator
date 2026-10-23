
// Calculate the student's weighted grade and display the result.
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get the original grade values as text.
    // This lets us detect empty inputs before converting them to numbers.
    let mcoInput = document.getElementById("mco").value.trim();
    let examInput = document.getElementById("exam").value.trim();
    let attendanceQuizInput =
        document.getElementById("attendanceQuiz").value.trim();

    // Get the area where the result or error message will appear.
    let resultDiv = document.getElementById("result");

    // Remove the previous result before calculating again.
    resultDiv.textContent = "";

    // Check whether the student entered a name.
    if (name === "") {
        resultDiv.textContent = "Please enter the student's name.";
        return;
    }

    // Check whether all three grade fields contain values.
    if (
        mcoInput === "" ||
        examInput === "" ||
        attendanceQuizInput === ""
    ) {
        resultDiv.textContent = "Please enter all three grades.";
        return;
    }

    // Convert the input values from text into numbers.
    let mco = Number(mcoInput);
    let exam = Number(examInput);
    let attendanceQuiz = Number(attendanceQuizInput);

    // Make sure the entered grades are valid numbers.
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

    // Calculate each component using its assigned percentage.
    let weightedMCO = mco * 0.50;                 // 50% weight
    let weightedExam = exam * 0.30;               // 30% weight
    let weightedAttendanceQuiz = attendanceQuiz * 0.20; // 20% weight

    // Add the weighted scores to get the final grade.
    let finalGrade =
        weightedMCO + weightedExam + weightedAttendanceQuiz;

    // Determine the student's result based on the final grade.
    let result;

    if (finalGrade >= 90) {
        result = "Excellent!";
    } else if (finalGrade >= 75) {
        result = "Passed!";
    } else {
        result = "Failed.";
    }

    // Create a paragraph to display the student's name.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    // Display the final weighted grade to two decimal places.
    let gradeParagraph = document.createElement("p");
    gradeParagraph.textContent = "Final Grade: " + finalGrade.toFixed(2);

    // Display the result classification.
    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    // Add all three paragraphs to the result area.
    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(gradeParagraph);
    resultDiv.appendChild(resultParagraph);
}
