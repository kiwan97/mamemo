import Memo from "../models/Memo";

export const memoUploads = async (req,res) => {
    const{
        body: {memo}
    } = req;
    const newMemo = await Memo.create({
        text: memo,
    });
    res.redirect("/");
}
export const homeMemo = async (req,res) => {
    console.log("req locals : " + req);
    try{
        const memos= await Memo.find({}).sort({ createdAt: -1 });
        res.render("home",{memos});
    }catch(error){
        console.log(error);
        res.redirect("/");
    }
}
  