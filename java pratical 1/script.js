alert("Welcome to SIT Nagpur");

function showWelcome(){

    let name=document.getElementById("name").value;
    let age=document.getElementById("age").value;
    let gender=document.getElementById("gender").value;
    let email=document.getElementById("email").value;
    let mobile=document.getElementById("mobile").value;
    let course=document.getElementById("course").value;
    let city=document.getElementById("city").value;

    if(name=="" || age=="" || gender=="" || email=="" || mobile=="" || course=="" || city==""){
        alert("Please fill all the fields.");
        return;
    }

    document.getElementById("output").innerHTML=
    "<h2>Welcome, "+name+"!</h2>"+
    "<p><b>Age :</b> "+age+"</p>"+
    "<p><b>Gender :</b> "+gender+"</p>"+
    "<p><b>Email :</b> "+email+"</p>"+
    "<p><b>Mobile :</b> "+mobile+"</p>"+
    "<p><b>Course :</b> "+course+"</p>"+
    "<p><b>City :</b> "+city+"</p>";

    console.log("Name : "+name);
    console.log("Age : "+age);
    console.log("Gender : "+gender);
    console.log("Email : "+email);
    console.log("Mobile : "+mobile);
    console.log("Course : "+course);
    console.log("City : "+city);

    console.warn("This is a warning message.");
    console.error("This is an error message (Demo Purpose).");

    alert("Thank you for submitting!");
}