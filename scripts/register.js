const button = document.getElementById('register');
const email = document.getElementById('eml');
const password = document.getElementById('pwd');
const role = document.getElementById('role');
const dangerEl = document.getElementById('danger');
const successEl = document.getElementById('success');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const emailVal = email.value;
    const passwordVal = password.value;
    const roleVal = role.value;
    if(!emailVal || !passwordVal || emailVal.trim()=='' || passwordVal.trim()=='' || roleVal =='type')
    {
        dangerEl.style.display = 'block';
        dangerEl.innerText = 'יש למלא את כל הפרטים';
        setTimeout(()=>{
            dangerEl.style.display = 'none';
        },2000)
        return;
    }
    //set bool is voluntter
    if(roleVal=='user')
    {
        var isVolunteer= false
    }
    else
    {
        var isVolunteer = true;
    }
    //create new user in firebase
    firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal).then(res=>{
        //add to collection
        var db = firebase.firestore();
        db.collection("users").add({
            email:emailVal,
            volunteer :isVolunteer 
        })
        .then(()=> {
            successEl.style.display='block';
            successEl.innerText = 'נרשמת בהצלחה, מועברת לדף התחברות';
            setTimeout(()=>{
                dangerEl.style.display = 'none';
                window.location.href = "login.html"; 
            },2000)
        })
        .catch((err) =>{
            var errorCode = error.code;
            var errorMessage = error.message;
            
            dangerEl.style.display = 'block'
            dangerEl.innerText = errorMessage;
            setTimeout(()=>{
                dangerEl.style.display = 'none';
            },2000)
        });


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