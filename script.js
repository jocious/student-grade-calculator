function calculateGrade() {

    // Get the student's name
    let name = document.getElementById("studentName").value;

    // Get the grades
    let quiz = Number(document.getElementById("quiz").value);
    let assignment = Number(document.getElementById("assignment").value);
    let exam = Number(document.getElementById("exam").value);

    // Calculate the average
    let average = (quiz + assignment + exam) / 3;

    // Create a variable for the result
    let result;

    // Check the average
    if (average >= 90) {

        result = "Excellent!";

    } else if (average >= 75) {

        result = "Passed!";

    } else {

        result = "Failed.";

    }

    // Display the result
    document.getElementById("result").innerHTML =
        "<p>Student: " + name + "</p>" +
        "<p>Average: " + average.toFixed(2) + "</p>" +
        "<p>Result: " + result + "</p>";
}