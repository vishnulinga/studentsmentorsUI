async function insert(){
    var insertitem=document.getElementById("insertselect").value
    var insertname=document.getElementById("name").value
    if(insertitem=="student"){
       let result= fetch("http://localhost:3000/student",{
            method:"POST",
            body:JSON.stringify({"name":`${insertname}`}),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        
    }
    else{
        let result= fetch("http://localhost:3000/mentor",{
            method:"POST",
            body:JSON.stringify({"name":`${insertname}`}),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        
    }
    document.getElementById("parentdiv").innerText="Inserted"

}

async function assign(){
    var assignitem=document.getElementById("assignselect").value
    var assignto=document.getElementById("id").value
    console.log(assignto)
    var array=document.getElementById("array").value.split(",").map(x=>+x)
    console.log(array)
    if(assignitem=="students"){
        let result= fetch(`http://localhost:3000/studentsofmentor/${assignto}`,{
            method:"POST",
            body:JSON.stringify({"arr":`${array}`}),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        document.getElementById("parentdiv").innerText="Assigned students to mentor"
    }
    else{
        let result= fetch(`http://localhost:3000/mentorofstudent/${assignto}/${array}`,{
            method:"POST",
            
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        document.getElementById("parentdiv").innerText="Assigned mentor to student"
    }
}


function display(){
    let val=document.getElementById("displayselect").value
    if(val=="students")getstudents();
    else if(val=="mentors")getmentors();
    else getstudentsofmentor();
   
}
async function getstudents(){
    
    try{
        let result=await fetch("http://localhost:3000/students")
        let arr=await result.json()
        let parentdiv=document.createElement("div")
        if(arr.length==0)document.getElementById("parentdiv").innerText="Nothing to Display"
        else{
        document.getElementById("parentdiv").innerText=""
        arr.forEach(element => {
            
            document.getElementById("parentdiv").innerHTML+=JSON.stringify(element)+"<br>"
            
           
        });}
       
    }
    catch(err){console.log(err)}
}
async function getmentors(){
    
    try{
        let result=await fetch("http://localhost:3000/mentors")
        let arr=await result.json()
        
        let parentdiv=document.createElement("div")
        if(arr.length==0)document.getElementById("parentdiv").innerText="Nothing to Display"
        else{
            document.getElementById("parentdiv").innerText=""
        arr.forEach(element => {
            
            document.getElementById("parentdiv").innerHTML+=JSON.stringify(element)+"<br>"
            
           
        });
    }
    }
    catch(err){console.log(err)}
}

async function getstudentsofmentor(){
    
    let id=document.getElementById("mentorid").value
    try{
        let result=await fetch(`http://localhost:3000/studentsof/${id}`)
        let arr=await result.json()
        if(arr.length==0)document.getElementById("parentdiv").innerText="Nothing to Display"
        else{
        document.getElementById("parentdiv").innerText=""
        arr.forEach(element => {
            document.getElementById("parentdiv").innerHTML+=JSON.stringify(element)+"<br>"
           
        });}
        
    }
    catch(err){console.log(err)}
}