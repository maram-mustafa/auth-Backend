const Owners=require("./mongooes-books")

function deletebooksHandler(req,res){
    let email=req.query.email;
    let id = req.params.id;

    Owners.Owners.find({email : email}, (err,data)=>{
        if(err){
            res.status(500).send("there is an error")
        }else{
            let newData = data[0].books.filter((book)=>{
                return book._id != id 
            });
            // console.log(newData);
            data[0].books=newData;
            data[0].save();
            res.send(newData);
        }
    })

}



module.exports =deletebooksHandler;