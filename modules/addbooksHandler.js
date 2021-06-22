const Owners=require("./mongooes-books")


function addbooksHandler(req, res){
    const{email ,name , desc , status} = req.body;

    Owners.Owners.find({email : email}, (err ,data)=>{
        if(err){
            res.status(500).send("there is error")
        }else{
            data[0].books.push({
                name: name,
                desc:desc,
                status:status

             });
             data[0].save();
             res.send(data[0].books)
        }


    });


}

module.exports = addbooksHandler;
