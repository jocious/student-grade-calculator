
// Calculate the student's average grade and display the result.
function calculateGrade() {

    // Get the student's name and remove extra spaces.
    let name = document.getElementById("studentName").value.trim();

    // Get the original grade input values.
    // Keep them as text first so empty fields are not mistaken for zero.
    let quizInput = document.getElementById("quiz").value.trim();
    let assignmentInput = document.getElementById("assignment").value.trim();
    let examInput = document.getElementById("exam").value.trim();

    // Get the HTML element where messages and results will appear.
    let resultDiv = document.getElementById("result");

    // Clear the previous result before checking the new input.
    resultDiv.textContent = "";

    // Check whether the student name is empty.
    if (name === "") {
        resultDiv.textContent = "Please enter the student's name.";
        return;
    }

    // Check whether any grade field is empty.
    if (quizInput === "" || assignmentInput === "" || examInput === "") {
        resultDiv.textContent = "Please enter all three grades.";
        return;
    }

    // Convert the grade inputs from text into numbers.
    let quiz = Number(quizInput);
    let assignment = Number(assignmentInput);
    let exam = Number(examInput);

    // Check whether all grades are valid numbers.
    if (
        !Number.isFinite(quiz) ||
        !Number.isFinite(assignment) ||
        !Number.isFinite(exam)
    ) {
        resultDiv.textContent = "Please enter valid numeric grades.";
        return;
    }

    // Check that every grade is between 0 and 100.
    if (
        quiz < 0 || quiz > 100 ||
        assignment < 0 || assignment > 100 ||
        exam < 0 || exam > 100
    ) {
        resultDiv.textContent = "Grades must be between 0 and 100.";
        return;
    }

    // Calculate the average of the three grades.
    let average = (quiz + assignment + exam) / 3;

    // Create a variable to store the student's result.
    let result;

    // Determine the result based on the average.
    if (average >= 90) {
        result = "Excellent!";
    } else if (average >= 75) {
        result = "Passed!";
    } else {
        result = "Failed.";
    }

    // Create separate paragraph elements for the results.
    // Using textContent displays the student's name as text,
    // rather than treating it as HTML code.
    let studentParagraph = document.createElement("p");
    studentParagraph.textContent = "Student: " + name;

    let averageParagraph = document.createElement("p");
    averageParagraph.textContent = "Average: " + average.toFixed(2);

    let resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Result: " + result;

    // Add the result paragraphs to the result area.
    resultDiv.appendChild(studentParagraph);
    resultDiv.appendChild(averageParagraph);
    resultDiv.appendChild(resultParagraph);
}
