import Memo from "../models/Memo";

export const memoUploads = async (req,res) => {
    const{
        body: {memo}
    } = req;
    const newMemo = await Memo.create({
        text: memo,
        creator: req.user.id
    });
    res.redirect("/");
}
export const homeMemo = async (req,res) => {
    console.log("req locals : " + req);
    try{
        if(req.user){
        // const memos= await Memo.find({}).sort({ createdAt: -1 });
        const memos = await Memo.find({creator:req.user.id})
        res.render("home",{memos});
        }else{
            res.render("home",{});
        }
    }catch(error){
        console.log(error);
        res.redirect("/");
    }
}
  