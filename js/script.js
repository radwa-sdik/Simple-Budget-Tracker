function login(){   
    const userName = document.getElementById('signinName').value.trim();
    
    if (!userName) return alert("Enter a valid username");
    
    localStorage.setItem('currentUser',userName);
    window.location.href = "dashboard.html";
}
