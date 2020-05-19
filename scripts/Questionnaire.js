const db = firebase.firestore();
var id;
//check if user is login?

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const email = user.email;
    //get users data
    db.collection("users").where('email','==',email).get().then(res=>{
      res.forEach(doc=>{
        //is not volunteer
        if ( doc.data().volunteer === false)
        {
          location.href = 'onboarding.html';
        }
        // fill the form already
        if(doc.data().lang)
        {
          window.location.href = "onboarding.html";
        }
        id = doc.id;
      });
    });
  } else {
    // No user is signed in.
    location.href = 'onboarding.html';
  }
});

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
      alert(i);
    }

  db.collection('users').doc(id).update({
    language:selected_lang,
    age:age,
    city:city,
    children:children,
    religion:selected_religin,
    back_ground_choice:background_choice
  }).then(res=>{
    successEl.style.display='block';
    successEl.innerText = 'הנתונים נוספו למערכת';
    setTimeout(()=>{
      dangerEl.style.display = 'none';
      window.location.href = "onboarding.html";
    },2000)

  }).catch(err=>{
    var errorCode = error.code;
    var errorMessage = error.message;

    dangerEl.style.display = 'block';
    dangerEl.innerText = errorMessage;
    setTimeout(()=>{
      dangerEl.style.display = 'none';
    },2000)

  })

}

// program the reset button
function resetAnswer() {
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

