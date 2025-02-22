function getTitle() {
    let title = new URLSearchParams(window.location.search);
    return title.get('title');
}
window.addEventListener('DOMContentLoaded', function () {

    if (this.localStorage.getItem('email') == "raushanmuz0102@gmail.com") {
        var addquestion = this.document.getElementById('addquestion');
        addquestion.style.display = "block";
    }
    else {
        var addquestion = this.document.getElementById('addquestion');
        addquestion.style.display = "none";

    }

    const title = getTitle()
    const t = document.getElementById('title').innerHTML = title;
    console.log(title);
    var answer={};
        
       
    let currentQuestionIndex = 0;
    let questions = [];
    var correctAnswers = 0; // Variable to track the number of correct answers
    let totalQuestions = 0; // This will be set dynamically based on the API response
    // Function to fetch questions from the API
    async function fetchQuestions() {
        try {
            const response = await fetch(`https://question-quiz-production.up.railway.app/api/${title}_question`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            questions = await response.json(); // Assume API returns an array of question objects
            totalQuestions = questions.length; // Set totalQuestions based on fetched data
            for(var i=1;i<=totalQuestions;i++){
                answer[i]="f";
            }
            document.getElementById('total-questions').textContent = totalQuestions; // Update the total questions in the HTML
            displayQuestion();
        } catch (error) {
            console.error('Error fetching questions:', error);
            document.getElementById('question-text').textContent = "Failed to load questions. Please try again.";
        }
       
        //console.log("f"+answer);
        
    }

    function displayQuestion() {
        if (questions.length === 0) return;

        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentQuestion = questions[currentQuestionIndex];

        // Update this line to match the correct property
        questionText.textContent = currentQuestion.questionText;
        optionsContainer.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option';
            // button.onclick = () => checkAnswer(option,button); // Call checkAnswer on click
            optionsContainer.appendChild(button);
            console.log("A");

        });
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        const allbutoon = Array.from(this.document.getElementsByClassName('option'));
        console.log("optionbutton" + allbutoon);
        allbutoon.forEach((res) => {
            res.onclick = () => {
                //console.log(currentQuestion.correctAnswer);
                if (res.id!='write') {
                    if (res.innerHTML === currentQuestion.correctAnswer) {
                        res.id = 'write';
                        console.log(currentQuestion.id);
                        answer[currentQuestion.id]="y";                
                        
                    }
                    
                    
                    else{
                        res.id='wrong';
                    }
                    //console.log("answer"+answer); 
                }
                //console.log(answer);
                
                
                setColornonclcikbutton(res.innerHTML);
            }
        })
        function setColornonclcikbutton(value){
            allbutoon.forEach((res)=>{
                if (res.innerHTML===value) {
                    
                }
                else{
                    res.id='normer';
                }
            })
            
        }   
       
       
    }
    
  
    
    
    function checkAnswer(selectedOption, button) {
        const currentQuestion = questions[currentQuestionIndex];

        // Update this line to match the correct property

        button.className = 'option';
        if (selectedOption === currentQuestion.correctAnswer) {
            correctAnswers++;
            console.log(button);
            button.id = 'write';
            // Increment score if the answer is correct
            const allbuton = document.getElementsByClassName('option');
            console.log("allbuton" + allbuton);
        }
        else {
            button.id = 'wrong';

        }
        // Automatically move to the next question after selecting an answer
    }
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            // Quiz Completed: Save score and redirect to results page
            localStorage.setItem('quizScore', correctAnswers); // Save the score
            localStorage.setItem('totalQuestions', totalQuestions); // Save total questions
            window.location.href = 'result.html'; // Redirect to results page
        }
    })
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            // Quiz Completed: Save score and redirect to results page
            localStorage.setItem('quizScore', correctAnswers); // Save the score
            localStorage.setItem('totalQuestions', totalQuestions); // Save total questions
            window.location.href = 'result.html'; // Redirect to results page
        }
    }
    
    window.onload = fetchQuestions;
})
