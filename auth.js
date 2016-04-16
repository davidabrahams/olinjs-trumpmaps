module.exports = {
  'FACEBOOK_APP_ID' : process.env.FACEBOOK_APP_ID,
  'FACEBOOK_APP_SECRET' : process.env.FACEBOOK_APP_SECRET,
  'FACEBOOK_CALLBACK_URL' : process.env.FACEBOOK_CALLBACK_URL
}

// You don't need to wrap the process.env variables into another module --
// can just reference them directly wherever you need them.

// It doesn't look like it's possible for me to run your app locally -- the env
// variables won't be set, so the Facebook auth won't work. Important to
// make sure local development is possible even after you've deployed!
// You could either use this file to select between the process.env variable
// and local values stored in some other module, or you could use something
// which will put the environment variables in place for you locally, like
// dotenv (https://github.com/bkeepers/dotenv)
