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

instagram_like_pages.load_landing = () => {

  const signup_btn = document.getElementById("signup");
  const login_btn = document.getElementById("login");
  const result = document.getElementById("response");

  const responseHandler = () => {
    result.innerHTML = '<div id = "response" class = "result"></div>';
  }

  const signup = async () => {
    const signup_url = base_url + "signup.php";

    const signup_data = new URLSearchParams();
    signup_data.append("first_name", document.getElementById("f_name").value);
    signup_data.append("last_name", document.getElementById("l_name").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("pass").value);

    const response = await instagram_like_pages.postAPI(signup_url, signup_data);
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
      let userData = [];
      console.log(response.data);
      // userData.push({ fname, lname, email, pwd, score });
      // window.location.href = "stream.html";
    }
  };
  signup_btn.addEventListener("click", signup);
  login_btn.addEventListener("click", login);
};
