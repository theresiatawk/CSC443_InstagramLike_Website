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
    console.log(response);
    if (response.data.Error) {
      console.log(response.data.Error);
    } else {
      const images = response.data;
      let images_list = "";
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
                <p>Better Days Together at the beach<br />Love itt</p>
              </div>
              <div class="flex-row">
                <div>
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
      document.write(images_list);
      console.log(images);
    }
  };
  getImages();
};
