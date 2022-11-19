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

instagram_like_pages.load_landing = async () => {
  const signup_url = base_url + "signup.php";
  var params = new URLSearchParams();
  params.append('first_name', 'value1');
  params.append('last_name', 'value2');
  params.append('email', 'value2');
  params.append('password', 'value2');

  const signup_data = {
    first_name: "Becca",
    last_name: "tawk",
    email: "Byblos",
    password: "h"
  };
  console.log(signup_data);

  const response = await instagram_like_pages.signup(signup_url, params);
  console.log(response);
};
