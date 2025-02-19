
document.addEventListener('DOMContentLoaded',function(){
    const sumitButton=document.getElementById('button');
    sumitButton.addEventListener('click',async function(){
        const subjectInput=document.getElementById('subjectInput').value;
        const questionInput=document.getElementById('questionInput').value;
        const optionA=document.getElementById('optionA').value;
        const optionB=document.getElementById('optionB').value;
        const optionC=document.getElementById('optionC').value;
        const optionD=document.getElementById('optionD').value;
        const selectedButton=document.querySelector('input[name="answer"]:checked');
        if(!selectedButton){
            alert("slect button");
        }
        let correctOption=null;
        const objectOption={A:optionA,B:optionB,C:optionC,D:optionD}
        correctOption=objectOption[selectedButton.value]
        console.log(correctOption); 
        const jsonQuestion=
        {
            "questionText":questionInput,
            "correctAnswer":correctOption,
            "subject":subjectInput,
            "options":[
                optionA,
                optionB,
                optionC,
                optionD
            ]
        }
        console.log(jsonQuestion);
        try {
            const response = await fetch(`http://localhost:9090/api/${subjectInput}_save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonQuestion)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Question saved successfully:', data);
                alert("Question saved successfully!");
            } else {
                console.error('Error:', response.statusText);
                alert("Error saving the question");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Network error, try again later.");
        }

        fetch(`http://localhost:8080/api/${subjectInput}_question`)
    .then((response) => {
        // Check if response is ok (status 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Convert response to JSON
    })
    .then((data) => {
        console.log(data);  // Handle your data here
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
        
    })
})