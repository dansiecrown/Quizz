

const quiz = [
  {name: "Superman", realName: "Clark Kent"},
  {name: "Wonder Woman", realName: "Diana Prince"},
  {name: "Batman", realName: "Bruce Wayne"}
];

//View Object
const view = {
  timer: document.querySelector('#timer strong'),
  start: document.getElementById('start'),
  score:document.querySelector('#score strong'),
  question: document.getElementById('question'),
  result: document.getElementById('result'),
  response: document.querySelector('#response'),
  info: document.getElementById('info'),
  render(target,content,attributes) {
    for (const key in attributes){
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },
  show(element){
    element.style.display = 'block';
  },
  hide(element){
    element.style.display = 'none';
  },
  setup(){
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, '');
    this.render(this.info, '');
    this.resetForm();
  },
  resetForm(){
    this.response.answer.value = '';
    this.response.answer.focus();
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  }
};


const game = {
  start(quiz){
    this.secondsRemaining = 20;
    this.timer = setInterval (this.countdown, 1000);
    this.questions = [...quiz];
    this.score= 0;
    view.setup();
    this.ask();
  },
  countdown() {
    game.secondsRemaining--;
    view.render(view.timer, game.secondsRemaining);
    if(game.secondsRemaining <= 0){
      game.gameOver();
    }
  },
  ask(name){
      if(this.questions.length > 0){
        this.question = this.questions.pop();
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question, question);
      } else {
        this.gameOver();
      };
  },
  check(event){
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if(response === answer){
      view.render(view.result, 'Correct!', {'class': 'correct'});
      alert('Correct!');
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {'class': 'wrong'});
      alert(`Wrong! The correct answer was ${answer}`);
    }
    view.resetForm();
    this.ask();
  },


  gameOver(){
    view.render(view.info, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();
    clearInterval(this.timer);
  }
}


view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => 
game.check(event), false);
view.hide(view.response);
// function start(quiz) {
//   let score = 0 //initialize score
//
//   //main game loop
//   for(const [question, answer] of quiz){
//     const response = ask(question);
//     check(response, answer);
//   }
//   //end of main Game
//   gameOver();
//
//
//   //function declarations
//   function ask(question){
//     return prompt(question);
//   }
//
//   function check(response,answer){
//     if(response === answer){
//       alert('Correct!');
//       score++;
//     } else {
//       alert(`Wrong! The Correct answer was ${answer}`);
//     }
//   }
//   function gameOver(){
//     alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`)
//   }
// }
//
// start(quiz);
