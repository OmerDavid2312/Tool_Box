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
    //create new user in firebase
    firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal).then(res=>{
        
        successEl.style.display='block';
        successEl.innerText = 'התחברת בהצלחה';
        setTimeout(()=>{
            dangerEl.style.display = 'none';
            //href to other page ...
            location.href = 'questionnaire.html'
       
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