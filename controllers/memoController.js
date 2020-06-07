import Memo from "../models/Memo";

export const memoUploads = async (req,res) => {
    const{
        body: {memo}
    } = req;
    if(memo!=null && memo!=""){
        const newMemo = await Memo.create({
            text: memo,
            creator: req.user.id
        });
    }
    res.redirect("/");
}
export const homeMemo = async (req,res) => {
    console.log("req locals : " + req);
    try{
        if(req.user){
        const memos= await Memo.find({creator:req.user.id}).sort({ createdAt: -1 });
        let dates = [];
        for(var i=0;i<memos.length;i++){
            var newDate = new Date(memos[i].createdAt.toString());
            var tmp = (newDate.getMonth()+1) + "월 " + (newDate.getDate()+1) + " 일";
            dates.push(tmp);
        }
        
        res.render("home",{memos,dates});
        }else{
            res.render("home",{});
        }
    }catch(error){
        console.log(error);
        res.redirect("/");
    }
}

export const deleteMemo = async (req,res) =>{
    const {
        params:{
            id
        }
    } = req;
    try {
        await Memo.findOneAndRemove({ _id: id });
      } catch (error) {}
    res.redirect("/");
}

export const getFront = (req,res) => {
    res.render("front");
}
  