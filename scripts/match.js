//check if user is login?
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //console.log(user);
        
    } else {
      // No user is signed in.
     location.href = 'onboarding.html';
      
    }
});


