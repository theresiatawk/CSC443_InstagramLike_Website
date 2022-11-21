const instagram_like_pages = {};
const base_url = "http://localhost/CSC433_InstagramLike_Website/Backend/";

instagram_like_pages.Console = (title, values, oneValue = true) => {
  console.log("---" + title + "---");
  if (oneValue) {
    console.log(values);
  } else {
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);
    }
  }
  console.log("--/" + title + "---");
};

instagram_like_pages.loadFor = (page) => {
  eval("instagram_like_pages.load_" + page + "();");
};

instagram_like_pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "token " + api_token,
        "Content-Type": "multipart/form-data boundary=something",
      },
    });
  } catch (error) {
    instagram_like_pages.Console("Error from Signup API", error);
  }
};
instagram_like_pages.getAPI = async (api_url) => {
  try {
    return await axios(api_url);
  } catch (error) {
    instagram_like_pages.Console("Error from Linking (GET)", error);
  }
};

instagram_like_pages.load_landing = () => {
  const signup_btn = document.getElementById("signup");
  const login_btn = document.getElementById("login");
  const result = document.getElementById("response");

  const responseHandler = () => {
    result.innerHTML = '<div id = "response" class = "result"></div>';
  };

  const signup = async () => {
    const signup_url = base_url + "signup.php";

    const signup_data = new URLSearchParams();
    signup_data.append("first_name", document.getElementById("f_name").value);
    signup_data.append("last_name", document.getElementById("l_name").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("pass").value);

    const response = await instagram_like_pages.postAPI(
      signup_url,
      signup_data
    );
    if (response.data.Error) {
      result.innerHTML =
        '<div id = "response" class = "result">' +
        response.data.Error +
        "</div>";
      setTimeout(responseHandler, 2000);
    } else {
      result.innerHTML =
        '<div id = "response" class = "result">' +
        response.data.Success +
        "<br>Now Login!</div>";
      setTimeout(responseHandler, 2000);
    }
  };
  const login = async () => {
    const login_url = base_url + "login.php";

    const login_data = new URLSearchParams();
    login_data.append("email", document.getElementById("email1").value);
    login_data.append("password", document.getElementById("password").value);

    const response = await instagram_like_pages.postAPI(login_url, login_data);
    if (response.data.Error) {
      result.innerHTML =
        '<div id = "response" class = "result">' +
        response.data.Error +
        "</div>";
      setTimeout(responseHandler, 2000);
    } else {
      // Saving user data in the local storage
      const userData = [];
      const user_id = response.data.Success.id;
      const first_name = response.data.Success.first_name;
      const last_name = response.data.Success.last_name;
      const email = response.data.Success.email;

      userData.push({ user_id, first_name, last_name, email });
      localStorage.setItem("userData", JSON.stringify(userData));

      // Switching to the stream page
      window.location.href = "stream.html";
    }
  };
  signup_btn.addEventListener("click", signup);
  login_btn.addEventListener("click", login);
};

instagram_like_pages.load_stream = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const user_id = user[0].user_id;
  const getImages = async () => {
    const get_images_url = base_url + "get_images.php?user_id=" + user_id;
    const response = await instagram_like_pages.getAPI(get_images_url);
    if (response.data.Error) {
      console.log(response.data.Error);
    } else {
      const images = response.data;
      let images_list = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Instagram Like</title>
              <link rel="stylesheet" href="style.css" />
            </head>
            <body class="stream-container">`;
      images.map(
        (image, i) =>
          (images_list += `<div id = "${image.id}" class="image-card flex-column">
              <div class="flex-row">
                <div class="username">
                  <p><b>${image.first_name} ${image.last_name}</b></p>
                </div>
                <div class="dots-img">
                  <img src="./Assets/dots.png" width="20px" height="20px" />
                </div>
              </div>
              <div class="user-img">
                <img
                  class="img"
                  src="../Backend/uploads/${image.url}"
                  width="200px"
                  height="300px"
                />
              </div>
              <div class="caption">
                <p>${image.caption}</p>
              </div>
              <div class="flex-row">
                <div id = "${image.id}">
                  <img
                    class="heart-img"
                    src="./Assets/empty_heart.png"
                    width="20px"
                    height="20px"
                  />
                </div>
                <div class="comment-img">
                  <img src="./Assets/comment.png" width="25px" height="25px" />
                </div>
              </div>
            </div> `)
      );
      images_list += `<div class="dropdown comment-top">
            <div id="dropdown_stg" class="dropdown-content">
              <a href="#">Delete Image</a>
              <a href="#">Hide Image</a>
            </div>
        </div>

        <div class="comment-card comment-top" id ="add_comment">
          <div class="flex-row">
            <h2 class="comment-header">Comment</h2>
            <div class="x-icon" id="remove_icon">
              <img src="./Assets/remove.png" width="20px" height="20px" />
            </div>
          </div>
          <textarea id = "comment_content" class="comment-area" rows="10" cols="5"></textarea>
          <form class="form">
            <input class="add-btn" id="add_btn" type="button" value="Add" />
          </form>
        </div>

        <div class="navbar">
          <div class="active">
            <a href="stream.html"
              ><img src="./Assets/home.png" width="25px" height="25px"
            /></a>
          </div>
          <div>
            <a href="addImage.html"><img src="./Assets/plus.png" width="25px" height="25px" /></a>
          </div>
          <div>
            <a href="profile.html"
              ><img src="./Assets/user.png" width="25px" height="25px"
            /></a>
          </div>
        </div>
        <script src="logic.js" type="text/javascript"></script> 
      </body>
      </html>`;
      document.write(images_list);
    }
  };
  getImages();
};

instagram_like_pages.load_add_image = () => {
  const add_image_btn = document.getElementById("add_image");
  const result = document.getElementById("response");

  const responseHandler = () => {
    result.innerHTML = '<div id = "response" class = "result"></div>';
  };

  const addImage = async () => {
    const add_image_url = base_url + "add_image.php";
    const user = JSON.parse(localStorage.getItem("userData"));
    const user_id = user[0].user_id;

    const add_image_data = new URLSearchParams();
    add_image_data.append("user_id", user_id);
    const files = document.getElementById("img").files;
    const formData = new FormData();
    console.log(formData);
    formData.append("file", files[0]);
    console.log(formData);
    console.log(document.getElementById("img").files[0]);
    add_image_data.append("file", document.getElementById("img").files);
    add_image_data.append("caption", document.getElementById("caption").value);

    const response = await instagram_like_pages.postAPI(
      add_image_url,
      add_image_data
    );
    console.log(response.data);
    if (response.data.Error) {
      result.innerHTML =
        '<div id = "response" class = "result">' +
        response.data.Error +
        "</div>";
      setTimeout(responseHandler, 2000);
    } else {
      result.innerHTML =
        '<div id = "response" class = "result">' +
        response.data.Success +
        "</div>";
      setTimeout(responseHandler, 2000);
    }
  };
  add_image_btn.addEventListener("click", addImage);
};
