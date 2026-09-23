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

//moving circle
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
    const currentCard = event.currentTarget.closest('.card');
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
    event.preventDefault();
    gsap.to(popup,{
        display:"block",
        scale:3,
        duration:2,
        onComplete:()=>{
            input.forEach(button=>{
                button.value="";
            })
            typearea.value="";
            sub.value="submit";
            popup.style.display="none";
        }
    })
}

//page5 animations
moveforward.setAttribute("aria-label", "Show previous gym image");
movebackward.setAttribute("aria-label", "Show next gym image");
moveforward.setAttribute("title", "Previous image");
movebackward.setAttribute("title", "Next image");

moveforward.addEventListener("click",increment);
movebackward.addEventListener("click",decrement);

// Allow keyboard users to operate the slider controls without a mouse.
[moveforward, movebackward].forEach((control) => {
    control.setAttribute("tabindex", "0");
    control.setAttribute("role", "button");
    control.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            control === moveforward ? increment() : decrement();
        }
    });
});

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
    if(currentposition > 1){
        x=x-indexcount;
        framewidth.style.transform =`translateX(${-x}%)`;
        currentposition-=1;
    }else{
        currentposition=num;
        const lastPosition = (num - 1) * indexcount;
        framewidth.style.transform =`translateX(-${lastPosition}%)`;
        x=lastPosition;
    }
}

let timer=setInterval(increment,3000);

// Avoid moving the slider while a keyboard or pointer user is interacting with it.
function pauseSlider(){
    clearInterval(timer);
}
function resumeSlider(){
    clearInterval(timer);
    timer=setInterval(increment,3000);
}

[moveforward, movebackward].forEach((control) => {
    control.addEventListener("mouseenter", pauseSlider);
    control.addEventListener("mouseleave", resumeSlider);
    control.addEventListener("focusin", pauseSlider);
    control.addEventListener("focusout", resumeSlider);
});