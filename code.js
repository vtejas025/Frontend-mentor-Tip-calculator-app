let button=document.querySelector("button[type='reset']");
let radios=document.querySelectorAll("input[type='radio']");
let custominput=document.querySelector("#custominput");
let custom=document.querySelector("#custom");
let bill=document.querySelector("#bill");
let number=document.querySelector('#number');
let unchecked=document.querySelector("input[type='radio']:checked");
let tipamount=document.querySelector(".tipamount");
let tipnumber=document.querySelector(".tipnumber");
if(unchecked) unchecked.checked=false;
let lastchecked=null;
function createp(){
    let p=document.createElement("p");
    p.style.color="red";
    p.textContent="Can't be zero";
    p.style.textAlign="right";
    p.style.margin="0px";
    p.style.display="inline-block";
    p.style.position="absolute";
    p.style.right="2rem";
    return p;
}
let haserror=new Set();
function uncheck(ele){
    let e=ele.target;
    if(haserror.has(e.id)){ 
        e.parentElement.classList.remove("error");
        e.parentElement.previousElementSibling.remove();
        haserror.delete(e.id);
    }
}
function checkerror(){
    if(bill.value.trim()==="" || number.value.trim()===""){
        if(bill.value.trim()==="" && !haserror.has(bill.id)){
            bill.parentElement.classList.add("error");
            bill.parentElement.insertAdjacentElement("beforebegin",createp());
            haserror.add(bill.id);   
        }
        if(number.value.trim()==="" && !haserror.has(number.id)){
            number.parentElement.classList.add("error");
            number.parentElement.insertAdjacentElement("beforebegin",createp());
            haserror.add(number.id);                
        }
    }
}
function calculate(ele){
    if(isNaN(bill.value) || isNaN(number.value) || isNaN(ele.value)){
        return
    }
    else{
        let singlePersonAmount=bill.value/number.value; 
        let percentage=ele.value; 
        tipnumber.textContent=(Number(percentage)*singlePersonAmount)/100;
        tipamount.textContent=singlePersonAmount+Number(tipnumber.textContent);
        tipnumber.textContent=Number(tipnumber.textContent).toFixed(2);
        tipamount.textContent=Number(tipamount.textContent).toFixed(2);
        tipnumber.textContent="$"+tipnumber.textContent;
        tipamount.textContent="$"+tipamount.textContent;
    }
}
radios.forEach(ele=>{
    ele.addEventListener("click",()=>{
        checkerror();
        if(haserror.size>0){
            ele.checked=false;
            return;
        }
        if(ele===lastchecked){
            ele.checked=false;
            lastchecked=null;
        }
        else if(lastchecked===null){
            lastchecked=ele; 
        }
        else if(lastchecked!==ele){ 
            lastchecked=ele;
        }
        let check=document.querySelector("input[type='radio']:checked");
        if(check && check.checked){
            if(check.id!=="custom"){
                calculate(check);
            }
        }
    });
});
bill.addEventListener("focus",uncheck);
number.addEventListener("focus",uncheck);
let input=document.querySelectorAll(".input input[type='text']");
input.forEach(ele=>{
    ele.addEventListener("focusout",()=>{
        if(ele.value.trim()!==""){
            button.removeAttribute("disabled");
            button.classList.add("unfilter");
        }
    });
});
button.addEventListener("click",()=>{
    setTimeout(()=>{
        button.setAttribute("disabled",true);
        button.classList.remove("unfilter");
    },0);
    tipamount.textContent="$0.00";
    tipnumber.textContent="$0.00";
    if(haserror.has(bill.id)){
        bill.parentElement.classList.remove("error");
        bill.parentElement.previousElementSibling.remove();
        haserror.delete(bill.id);
    }
    if(haserror.has(number.id)){
        number.parentElement.classList.remove("error");
        number.parentElement.previousElementSibling.remove();
        haserror.delete(number.id);
    }
});
window.addEventListener("beforeunload",()=>{
    bill.value="";
    number.value="";
});
custom.addEventListener("focus",()=>{
    if(haserror.size===0){
        custominput.focus();
    }
});
custominput.addEventListener("input",()=>{
    checkerror();
    if(haserror.size===0){
        calculate(custominput);
    } 
});
custominput.addEventListener("focusout",()=>{
    custominput.classList.remove("color");
    custominput.value="";
});
custominput.addEventListener("focus",()=>{
    checkerror();
    if(haserror.size==0){
        custominput.classList.add("color");
        if(lastchecked!==null && lastchecked.id!=="custom"){
            lastchecked.checked=false;
        }
        lastchecked=null;
    }
});
custominput.addEventListener("keydown",(e)=>{
    if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp"
    ){
        e.preventDefault();
    }
    if(e.key==="ArrowRight" || e.key==="ArrowDown"){
        radios[0].focus();
    }
    else if(e.key==="ArrowLeft" || e.key==="ArrowUp"){
        radios[4].focus();
    }
});
