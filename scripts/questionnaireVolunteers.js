
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
          if ( doc.data().volunteer == false)
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

////
const dangerEl = document.getElementById('danger');
const successEl = document.getElementById('success');
const btn = document.getElementById('questionBtn');
const professions = document.getElementById('professions').value;
const days = document.getElementById('days'); 
const lang = document.getElementById('lang');
var chosenDays = [];
var chosenLangs = [];
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    //get days and add to array
    for (let index = 0; index < days.options.length; index++) {
        if(days.options[index].selected){
            chosenDays.push(days.options[index].value);
        }
        
    }
    for (let index = 0; index < lang.options.length; index++) {
        if(lang.options[index].selected){
            chosenLangs.push(lang.options[index].value);
        }
        
    }

    db.collection('users').doc(id).update({
        days:chosenDays,
        lang:chosenLangs,
        professions:professions
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
        
        dangerEl.style.display = 'block'
        dangerEl.innerText = errorMessage;
        setTimeout(()=>{
            dangerEl.style.display = 'none';
        },2000)
        
    })


   
    
    
    
})