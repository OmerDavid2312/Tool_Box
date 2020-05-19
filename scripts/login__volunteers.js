var db = firebase.firestore();

const button = document.getElementById('register');
const email = document.getElementById('eml');
const password = document.getElementById('pwd');
const dangerEl = document.getElementById('danger');
const successEl = document.getElementById('success');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const emailVal = email.value;
    const passwordVal = password.value;
    if(!emailVal || !passwordVal || emailVal.trim()=='' || passwordVal.trim()=='')
    {
        dangerEl.style.display = 'block';
        dangerEl.innerText = 'יש למלא את כל הפרטים';
        setTimeout(()=>{
            dangerEl.style.display = 'none';
        },2000)
        return;
    }
    //create new user in firebase !
    firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal).then(res=>{
        
        successEl.style.display='block';
        successEl.innerText = 'התחברת בהצלחה';
        //move to relevent page
        db.collection("users").where('email','==',emailVal).get().then(res=>{
            res.forEach(doc=>{
                const data = doc.data();
                console.log(data.volunteer);
                
                if(data.volunteer == false)
                {
                    location.href = 'questionnaire.html'
                }
                else
                {
                    location.href = 'questionnaire_volunteers.html'
                }
            })
        })
        setTimeout(()=>{
            dangerEl.style.display = 'none';   
       
        },2000)

    }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        
        dangerEl.style.display = 'block'
        dangerEl.innerText = errorMessage;
        setTimeout(()=>{
            dangerEl.style.display = 'none';
        },2000)
      
      });

    
    
})