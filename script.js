let currentQuestion = 0;
let correctAnswers= 0;
let userResponses = [];
let responseHtml = '';



showQuestion();
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
document.querySelector('#btnBack').addEventListener('click', backQuestion); // Adiciona um event listener para o botão de voltar
document.querySelector('#btnNext').addEventListener('click', nextQuestion); // Adiciona um event listener para o botão de avançar
document.querySelector('#btnResponses').addEventListener('click', showResponses);
document.querySelector('#btnRestart').addEventListener('click', resetResponse);


function showQuestion(){
   if(questions[currentQuestion]){
     let q = questions[currentQuestion];
  
     let pct = Math.floor((currentQuestion / questions.length) * 100);
     document.querySelector('.progress--bar').style.width = `${pct}%`;

     document.querySelector('#btnRestart').style.display = 'none';
     document.querySelector('.scoreArea').style.display = 'none';
     document.querySelector('.questionArea').style.display = 'block';
     document.querySelector('.question').innerHTML = q.question;
      
     let image8Element = document.querySelector('.image8');
     let image10Element = document.querySelector('.image10');




     switch (q.image) {
      case 8:
          image8Element.style.display = 'block';   
          image10Element.style.display = 'none';       
          break;
  
      case 10:
          image10Element.style.display = 'block';  
          image8Element.style.display = 'none';        
          break;
  
      default:
          image8Element.style.display = 'none';
          image10Element.style.display = 'none';
          break;
  }

     

     

    let optionsHtml = '';
    for(let i in q.options)
    {
      let isSelected = userResponses[currentQuestion] === parseInt(i);
      optionsHtml += `<div data-op="${i}" class="option ${isSelected ? 'selected' : ''}"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
      
    }
    document.querySelector('.options').innerHTML  = optionsHtml;
 


    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent);
    });

    // ...

// Adiciona botão "Finalizar" quando chegar à última questão
    if (currentQuestion === questions.length - 1) {
      document.querySelector('#btnNext').style.display = 'none';
      document.querySelector('#btnFinish').style.display = 'block';
      document.querySelector('#btnFinish').addEventListener('click', finishQuiz);
      } else {
      document.querySelector('#btnNext').style.display = 'block';
       document.querySelector('#btnFinish').style.display = 'none';
    }
   } else {

    finishQuiz();
      
   }


   function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    // Verifica se a pergunta foi respondida corretamente anteriormente
    let wasCorrect = userResponses[currentQuestion] === questions[currentQuestion].answer;

    // Verifica se a resposta está correta
    let isCorrect = questions[currentQuestion].answer === clickedOption;

    // Atualiza a resposta do usuário
    userResponses[currentQuestion] = clickedOption;

    // Atualiza a contagem de respostas corretas se a resposta for correta
    if (isCorrect) {
        correctAnswers++;
    } else {
        // Se a resposta anterior estava correta e a nova está errada, decrementa o contador
        if (wasCorrect) {
            correctAnswers--;
        }
    }

    currentQuestion++;
    showQuestion();
}

  

function finishQuiz(){
     let points = Math.floor((correctAnswers / questions.length) * 100);
     

     if(points <50)
     {
        document.querySelector('.scoreText1').innerHTML = "Ruim! <br>Entretanto vejo grandes oportunidades para <br>você melhorar.<br>Lembre-se, o processo que está em<br>suas mãos é algo que impacta nos resultados do paciente.";
        document.querySelector('.scorePct').style.color = '#FF0000';
     } else if(points >= 50 && points < 70)
      {
      document.querySelector('.scoreText1').innerHTML = "Regular! <b>Podemos melhorar mais.<br>Juntos faremos assistência <br> mais segura e livre de danos.";
      document.querySelector('.scorePct').style.color = '#FC9D03';
      } else if(points >= 70 && points < 90)
      {
      document.querySelector('.scoreText1').innerHTML = "Muito bom! <br>Trabalhando e estudando juntos, <br>alcançaremos uma assistência mais segura.";
      document.querySelector('.scorePct').style.color = '#0D630D';    
      }else if(points >= 90)
      {
      document.querySelector('.scoreText1').innerHTML = "Excelente! <br>Cada gota de conhecimento<br> agregada impacta na assistência e na segurança do paciente.";
      document.querySelector('.scorePct').style.color = '#3D59B8';    
      }
    
   
    
     document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
     document.querySelector('.scoreText2').innerHTML = `De ${questions.length} perguntas você respondeu ${userResponses.length} e acertou ${correctAnswers}`;
    
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';



  }
}

function resetEvent() {
  currentQuestion = 0;
  correctAnswers = 0;
  userResponses = [];
  showQuestion();
}


function backQuestion() {
  if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
  } else {
      finishQuiz();
  }
}

function showResponses() {
  document.querySelector('.responseTotalArea').style.display = 'block';

  
  

  for (let i = 0; i < questions.length; i++) {
    let q = questions[i];
    let userResponse = userResponses[i];
    let isCorrect = q.answer === userResponse;

    responseHtml += `
      <div class="response">
        <p><strong>Pergunta ${i + 1}:</strong> ${q.question}</p>
        <p><strong>Sua Resposta:</strong> ${q.options[userResponse]}</p>
        <p><strong>Resposta Correta:</strong> ${q.options[q.answer]}</p>
        <p class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correto' : 'Incorreto'}</p>
      </div>
    `;
  }

  // Mostrar as respostas na interface
  document.querySelector('#btnRestart').style.display = 'block';

  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.scoreArea').style.display = 'none';
  document.querySelector('.responsesArea').innerHTML = responseHtml;
  document.querySelector('.responsesArea').style.display = 'block';
  document.querySelector('.progress').style.display = 'none';
}


function resetResponse(){
  currentQuestion = 0;
  correctAnswers = 0;
  userResponses = [];  
  document.querySelector('.responseTotalArea').style.display = 'none';
  document.querySelector('.questionArea').style.display = 'block';
  document.querySelector('.scoreArea').style.display = 'none';
  document.querySelector('.progress').style.display = 'block';
  
  showQuestion();  

}
