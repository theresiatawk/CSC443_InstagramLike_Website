const user = JSON.parse(localStorage.getItem("userData"));
const user_id = user[0].user_id;
let img_id;
const like_icons = document.querySelectorAll(".heart-img");
const comment_card = document.getElementById("add_comment");
const remove_icon = document.getElementById("remove_icon");
const comment_icons = document.querySelectorAll(".comment-img");
const add_btn = document.getElementById("add_btn");
const dots_icons = document.querySelectorAll(".dots-img");
const dropdown_stg = document.getElementById("dropdown_stg");

const commentHandler = (e) => {
  comment_card.style.display = "flex";
  img_id = e.target.parentElement.id;
};
const removeCommentCardHandler = (e) => {
  comment_card.style.display = "none";
};
const imageSettingHandlder = (e) => {
  console.log("I am here");
  console.log(dots_icons);
  if (dropdown_stg.style.display == "flex") {
    dropdown_stg.style.display = "none";
  } else {
    dropdown_stg.style.display = "flex";
  }
};
const likeImageHandler = async (e) => {
  const image_id = e.target.parentElement.id;
  const like_image_url =
    base_url + "add_like.php?user_id=" + user_id + "&image_id=" + image_id;
  const delete_like_url =
    base_url + "delete_like.php?user_id=" + user_id + "&image_id=" + image_id;
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
const saveCommentHandler = async (e) => {
  console.log(document.getElementById("comment_content").value);
  comment_card.style.display = "none";
  const add_comment_url =
    base_url + "add_comment.php";
  const add_comment_data = new URLSearchParams();
  add_comment_data.append("user_id", user_id);
  add_comment_data.append("image_id", img_id);
  add_comment_data.append("content", document.getElementById("comment_content").value);
  document.getElementById("comment_content").value = "";
  const response = await instagram_like_pages.postAPI(add_comment_url, add_comment_data);
  if (response.data.Error) {
    console.log(response.data);
  } else {
    console.log(response.data);
  }
};
comment_icons.forEach((b) => b.addEventListener("click", commentHandler));
dots_icons.forEach((b) => b.addEventListener("click", imageSettingHandlder));
console.log(dots_icons);
remove_icon.addEventListener("click", removeCommentCardHandler);
add_btn.addEventListener("click", saveCommentHandler);
like_icons.forEach((b) => b.addEventListener("click", likeImageHandler));
