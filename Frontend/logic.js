const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const likes = document.querySelectorAll(".heart-img");

 

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
const likeHandler = (e) =>{
    // If already liked unlike
    if( e.srcElement.attributes[1].value == "./Assets/full_heart.png"){
        e.srcElement.attributes[1].value = "./Assets/empty_heart.png"
    }
    //like
    else{
        e.srcElement.attributes[1].value = "./Assets/full_heart.png"
    }
}

likes.forEach(b => b.addEventListener("click", likeHandler));

