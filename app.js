let framewidth=document.getElementById("frame");
let imagewidth=document.querySelectorAll(".image-container");
let moveforward=document.getElementById("arrow-left");
let movebackward=document.getElementById("arrow-right");
let circle=document.getElementById("circle")
let page2=document.getElementById("page2-main");
let cards = document.querySelectorAll('.card');
let input=document.querySelectorAll("input");
let typearea=document.querySelector("textarea");
let sub=document.querySelector("#sub-button");
let popup=document.querySelector(".popup-message");
let registerCta=document.querySelector("#register-cta");
let num=imagewidth.length;
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

// Register CTA
if (registerCta) {
    registerCta.addEventListener("click", () => {
        document.querySelector("#page4")?.scrollIntoView({ behavior: "smooth" });
    });
}

//moving circle
if (page2 && circle) {
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
}

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
    if (currentCard) {
        currentCard.classList.add('flip');
        currentCard.classList.remove('flipback');
    }
}
function flipBack(event) {
    const currentCard = event.currentTarget.closest('.card');
    if (currentCard) {
        currentCard.classList.add('flipback');
        currentCard.classList.remove('flip');
    }
}

document.querySelectorAll('.front button').forEach(button => {
    button.addEventListener('click', flipCard);
});

cards.forEach(card => {
    card.addEventListener('mouseleave', flipBack);
});

//page4 animations
input.forEach(field =>{
    field.addEventListener("focusin",()=>{
        if (!field.dataset.originalPlaceholder) {
            field.dataset.originalPlaceholder = field.placeholder;
        }
        field.placeholder="";
    })

    field.addEventListener("focusout",()=>{
        field.placeholder = field.dataset.originalPlaceholder || field.placeholder;
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
if (moveforward && movebackward && framewidth && num > 0) {
    moveforward.addEventListener("click",increment);
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;

    // Keep autoplay disabled for users who request reduced motion.
    function pauseSlider(){
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }
    function resumeSlider(){
        if (!prefersReducedMotion && timer === null && !document.hidden) {
            timer=setInterval(increment,3000);
        }
    }

    resumeSlider();

    // Avoid moving the slider while a keyboard or pointer user is interacting with it.
    [moveforward, movebackward].forEach((control) => {
        control.addEventListener("mouseenter", pauseSlider);
        control.addEventListener("mouseleave", resumeSlider);
        control.addEventListener("focusin", pauseSlider);
        control.addEventListener("focusout", resumeSlider);
    });

    // Pause the autoplay when the tab is hidden to avoid unnecessary work.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            pauseSlider();
        } else {
            resumeSlider();
        }
    });
}
