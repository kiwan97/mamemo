import User from "../models/User";
import passport from "passport";

export const getJoin = (req,res) => res.render("join");
export const postJoin = async (req,res,next) => {
    const{
        body:{name,
        email,
        password,
        password2}
    } = req;
    if (password !== password2) {
        res.status(400);
        res.redirect("/join");
    } 
    else {
        try {
          const user = await User({
            name,
            email
          });
            await User.register(user, password);
            next();
        } catch (error) {
          console.log(error);
        }
    }
    res.redirect('/');
}

export const getLogin = (req,res) => res.render("login");
export const postLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/"
});

export const getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

export const googleLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  const {
    _json: { name, email,picture }
  } = profile;
  console.log("picture : "+picture);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.picture = picture;
      user.save();
      console.log(user.picture);
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      picture
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
  // Successful authentication, redirect home.
  console.log("Successful authentication, redirect home.");
  res.redirect("/");
};