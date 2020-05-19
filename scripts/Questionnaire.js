//check if user is login?
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     //console.log(user);
//
//   } else {
//     // No user is signed in.
//    location.href = 'onboarding.html';
//
//   }
// });

// document.getElementById('reset').addEventListener('click',resetAnswer);
// document.getElementById('submit').addEventListener('click',tabulateAnswers);

// function to calculate the result of the survey
function tabulateAnswers() {
  alert("saving");
  //selected language
  var language = document.getElementById("language");
  var selected_lang = language.options[language.selectedIndex].value;
  //statistical answers
  age = document.getElementById('age').value;
  city = document.getElementById('city').value;
  children = document.getElementById('children').value;
  //selected religion level
  var religion = document.getElementById("religion");
  var selected_religin = language.options[religion.selectedIndex].value;
  //radio button choice index
  var background_choice;
  var ele = document.getElementsByName("background");
  for(var i=0;i<ele.length;i++)
    if(ele[i].checked === true)
    {
      background_choice = i;
    }
  //radio button choice index
  var first_phrase_degree;
  var ele2 = document.getElementsByName("rating1");
  for(var i=0;i<ele.length;i++)
    if(ele2[i].checked === true)
    {
      first_phrase_degree = i;
    }
  alert(first_phrase_degree);

}

// program the reset button
function resetAnswer() {
  alert("pressed");


  //statistical questions reset
  document.getElementById('age').value = '';
  document.getElementById('city').value = '';
  document.getElementById('children').value = '';

  //radio button reset
  var ele = document.getElementsByName("background");
  for(var i=0;i<ele.length;i++)
    ele[i].checked = false;



  var answerbox = document.getElementById('answer');
  answerbox.innerHTML = "Your result will show up here!";
}

