const user = JSON.parse(localStorage.getItem("userData"));
const user_id = user[0].user_id;
const like_icons = document.querySelectorAll(".heart-img");
const comment_card = document.getElementById("add_comment");
const remove_icon = document.getElementById("remove_icon");
const comment_icons = document.querySelectorAll(".comment-img");
const add_btn = document.getElementById("add_btn");
const dots_icons = document.querySelectorAll(".dots-img");
const dropdown_stg = document.getElementById("dropdown_stg"); 

const commentHandler = (e) => {
    comment_card.style.display = "flex";
}
const removeCommentCardHandler = (e) => {
    console.log("yess");
    comment_card.style.display = "none";
}
const imageSettingHanlder = (e) => {
    if(dropdown_stg.style.display == "flex"){
        dropdown_stg.style.display = "none";
    }
    else{
        dropdown_stg.style.display = "flex";
    }
}
const likeImageHandler = async (e) => {
    const like_image_url =
      base_url + "add_like.php?user_id=" + user_id + "&image_id=7";
    const delete_like_url =
      base_url + "delete_like.php?user_id=" + user_id + "&image_id=7";
    if (e.srcElement.attributes[1].value == "./Assets/full_heart.png") {
      e.srcElement.attributes[1].value = "./Assets/empty_heart.png";
      const response = await instagram_like_pages.getAPI(delete_like_url);
      if (response.data.Error) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    } else {
      e.srcElement.attributes[1].value = "./Assets/full_heart.png";
      const response = await instagram_like_pages.getAPI(like_image_url);
      if (response.data.Error) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    }
};
comment_icons.forEach(b => b.addEventListener("click", commentHandler));
dots_icons.forEach(b => b.addEventListener("click", imageSettingHanlder));
remove_icon.addEventListener("click", removeCommentCardHandler);
add_btn.addEventListener("click", removeCommentCardHandler);
console.log(like_icons);
like_icons.forEach((b) => b.addEventListener("click", likeImageHandler));


