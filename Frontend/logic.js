const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const like_icons = document.querySelectorAll(".heart-img");
const comment_card = document.getElementById("add_comment");
const remove_icon = document.getElementById("remove_icon");
const comment_icons = document.querySelectorAll(".comment-img");
const add_comment_btn = document.getElementById("add_comment");


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
    //Otherwise like
    else{
        e.srcElement.attributes[1].value = "./Assets/full_heart.png"
    }
}
const commentHandler = () => {
    comment_card.style.display = "flex";
}
const removeCommentCardHandler = (e) => {
    comment_card.style.display = "none";
}


like_icons.forEach(b => b.addEventListener("click", likeHandler));
comment_icons.forEach(b => b.addEventListener("click", commentHandler));
remove_icon.addEventListener("click", removeCommentCardHandler);
add_comment_btn.addEventListener("click", removeCommentCardHandler);


