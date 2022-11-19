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

instagram_like_pages.signup = async (api_url, api_data, api_token = null) => {
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
  const result = document.getElementById("response");
  const signup = async () => {
    const signup_url = base_url + "signup.php";

    const signup_data = new URLSearchParams();
    signup_data.append("first_name", document.getElementById("f_name").value);
    signup_data.append("last_name", document.getElementById("l_name").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("pass").value);

    const response = await instagram_like_pages.signup(signup_url, signup_data);
    if (response.data.Error) {
      console.log(response.data.Error);
    }
    else{
      console.log(response.data.Success);
    }
    console.log(result);
  };
  signup_btn.addEventListener("click", signup);
};
