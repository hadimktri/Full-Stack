export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

//In the this code, we created a function to generate the consent screen URL based on the OAuth2 credentials.

// With that out of the way, we can now evoke the getGoogleUrl("/profile") function in an href attribute of a link tag to redirect the user to the consent screen when the link is clicked.

//client_id – Is the client ID of the application, which we obtained from the Google API Console.

//redirect_uri – This is the URL the OAuth2 API will redirect the user to after the permission has been granted or denied.
//   This URL must match one of the redirect URLs configured in the Google API Console.

// access_type: "offline" – This indicates that the application needs to access the user’s data when the user is not present.

// scope – This is a scope of permissions the application is requesting. In this project, we’ll only request access to the user’s email address and profile information.

// response_type: "code" – This indicates that an authorization code will be returned on the query string.
// state – This will allow us to pass data to the backend API. In this example,
//      we’ll include a path in the state so that the backend API can redirect the user to that page after the authentication is successful.

// prompt: "consent" – This indicates that the user should only see the consent screen the first time they grant permission to the application.
