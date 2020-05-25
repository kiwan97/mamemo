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

export const googleLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};