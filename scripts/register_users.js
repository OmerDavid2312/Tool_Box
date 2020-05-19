const button = document.getElementById('register');
const email = document.getElementById('eml');
const password = document.getElementById('pwd');
const dangerEl = document.getElementById('danger');
const successEl = document.getElementById('success');
var chars = 'abcdefghijklmnopqrstuvwxyz'

const generateEmail = () =>{
    return chars[Math.floor(Math.random()*26)] 
    + Math.random().toString(36).substring(2,11) 
    + '@random.com';
};


email.value = generateEmail();


button.addEventListener('click',(e)=>{
    e.preventDefault();
    const emailVal = email.value;
    const passwordVal = password.value;
    const isVolunteer = false;
    
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
    firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal).then(res=>{
        //add to collection
        var db = firebase.firestore();
        db.collection("users").add({
            email:emailVal,
            name:'אנונימית',
            volunteer :isVolunteer,

        })
        .then(()=> {
            successEl.style.display='block';
            successEl.innerText = 'נרשמת בהצלחה';
            //login after register
            firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal).then(res=>{
                location.href = 'questionnaire.html'
            }).catch(err=>{

                var errorCode = err.code;
                var errorMessage = err.message;
                
                dangerEl.style.display = 'block'
                dangerEl.innerText = errorMessage;
                setTimeout(()=>{
                    dangerEl.style.display = 'none';
                },2000)
            })
        })
        .catch((err) =>{
            var errorCode = err.code;
            var errorMessage = err.message;
            
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