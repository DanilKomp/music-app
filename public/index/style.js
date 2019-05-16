const style = ()=>{
if(window.outerWidth < 450){
   console.log('mobile')
   document.querySelector(".app").style.display = 'block';
   //circle
   document.querySelector(".track-outline").style.top ="25vh";
   document.querySelector(".moving-outline").style.top ="25vh";
   document.querySelector(".moving-outline").style.align ="center";
   document.querySelector(".time-select").style ='display:none';
   document.querySelector(".player-conteiner").style ='display:none';
   //prevSound

   document.querySelector(".prevSound").style ="margin-top: auto; margin-left: 40%;";
   document.querySelector(".play").style ="margin-top: auto; max-height: 4.5rem";
   document.querySelector(".nextSound").style ="margin-top: auto;margin-right: 40%; margin-top: 37%;";
   //genreWrapper
   document.querySelector("#Reading").addEventListener('click', ()=>{
      document.querySelector(".player-conteiner").style ='display:flex';
      document.querySelector(".sound-picker").style.transform ="translate(0.01%, 50% )";
   })
   document.querySelector("#lofi").addEventListener('click', ()=>{
      document.querySelector(".player-conteiner").style ='display:flex';
      document.querySelector(".sound-picker").style.transform ="translate(0.01%, 50% )";
   })
    
}
}
style();