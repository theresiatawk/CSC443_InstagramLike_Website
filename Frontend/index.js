const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const joinus_btn = document.getElementById("join_us");
const register_btn = document.getElementById("register");
const signin_btn = document.getElementById("signin");


const goToLoginHandler = () =>{
    card1.style.display = "none";
    card2.style.display = "flex";
    card3.style.display = "none";

}
const goToSignupHandler =() =>{
    card1.style.display = "none";
    card2.style.display = "none";
    card3.style.display = "flex";
}
joinus_btn.addEventListener("click", goToLoginHandler);
register_btn.addEventListener("click", goToSignupHandler);
signin_btn.addEventListener("click", goToLoginHandler);





