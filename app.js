let framewidth=document.getElementById("frame");
let imagewidth=document.querySelectorAll(".image-container");
let moveforward=document.getElementById("arrow-left");
let movebackward=document.getElementById("arrow-right");
let circle=document.getElementById("circle")
let page2=document.getElementById("page2-main");
let cards = document.querySelectorAll('.card');
let cardBackButtons = document.querySelectorAll('.card-back');
let input=document.querySelectorAll("input");
let typearea=document.querySelector("textarea");
let sub=document.querySelector("#sub-button");
let popup=document.querySelector(".popup-message");
let num=imagewidth.length;
let inputvalue;
// let aftersumitvalue=["Full name","Enter Your Email","Enter Phone no.","give suggestions"];
let currentposition=1;
let x=100/num;
let indexcount=x;

//nav animations

gsap.from("nav a",{
    opacity:0.5,
    duration:0.2,
    top:"-200%",
    stagger: {
        each: 0.1,
    }
})

gsap.from("#logo",{
    left:-200,
    duration:0.5,
})


//page1 animations

let tlpage1=gsap.timeline()

tlpage1.from("#page1 #hero h1",{
    left:500,
    opacity:0,
    duration:1,
    ease: "power2.out"
},"ab")

tlpage1.from("#page1 p , #page1 button",{
    opacity:0,
    color:"transparent",
    duration:2,
    ease: "power2.out"
},"ab")

//page2 animations


//moving circle
// page2.addEventListener("mouseenter",()=>{
// })

page2.addEventListener("mousemove",(dets)=>{
    circle.style.display="block";
    gsap.to(circle,{
        scale:1.5,
        delay:0.4,
        duration:1,
    })
})

page2.addEventListener("mousemove",(dets)=>{
    gsap.to(circle,{
        left:dets.x,
        top:dets.y,
    })
})

page2.addEventListener("mouseleave",(de)=>{
    circle.style.display="none";
})


//image rotation
gsap.from("#image-container .images",{
    rotate:0,
    duration:0.5,
    stagger:0.5,
    ease: "power2.out",
    scrollTrigger:{
        trigger:"#image-container",
        scroller:"body",
        start:"top 30%",
        end:"top 50%",
        scrub:5
    }
})

//page3 animations

function flipCard(event) {
    const currentCard = event.currentTarget.closest('.card');
    currentCard.classList.add('flip');
    currentCard.classList.remove('flipback');
  }
function flipBack(event) {
    const currentCard = event.currentTarget.closest('.card'); // Get the specific card
    currentCard.classList.add('flipback');
    currentCard.classList.remove('flip');
  }
  
document.querySelectorAll('.front button').forEach(button => {
    button.addEventListener('click', flipCard);
  });
  
  cards.forEach(cards => {
    cards.addEventListener('mouseleave', flipBack);
  });

//page4 animations

input.forEach(button =>{
    button.addEventListener("mouseenter",()=>{
        inputvalue=button.placeholder;
        button.placeholder="";
    })
})

input.forEach(button =>{
    button.addEventListener("mouseleave",()=>{
        button.placeholder=inputvalue;
    })
})

function formValidation(event) {
    // let i=0;
    event.preventDefault();
    gsap.to(popup,{
        display:"block",
        scale:3,
        duration:2,
        onComplete:()=>{
            input.forEach(button=>{
                // button.placeholder=aftersumitvalue[i];
                button.value="";
                // i++;
            })
            typearea.value="give suggestions";
            sub.value="submit";
            popup.style.display="none";
        }
}
)}


//page5 animations

moveforward .addEventListener("click",increment);
movebackward.addEventListener("click",decrement);

function increment(){
    if(currentposition < num){
        framewidth.style.transform =`translateX(${-x}%)`;
        currentposition+=1;
        x=x+indexcount;
    }else{
        currentposition=1;
        framewidth.style.transform="translateX(0%)"
        x=100/num;
    }
}
function decrement(){
    if(currentposition > 1){  //position 2 x=50
        x=x-indexcount;
        framewidth.style.transform =`translateX(${-x}%)`; //position -25
        currentposition-=1;
    }else{
        currentposition=4;
        framewidth.style.transform="translateX(-75%)"
        x=75;

    }
}


let timer=setInterval(increment,3000);