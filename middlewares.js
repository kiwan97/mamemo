export const middleWares = (req,res,next) =>{
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
}

export const onlyPublic = (req, res, next) => {
    if (req.user) {
      res.redirect("/front");
    } else {
      next();
    }
  };
  
  export const onlyPrivate = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/front");
    }
  };