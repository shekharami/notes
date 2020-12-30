const Notes = require("../models/noteModel");

exports.getNote = async (req, res, next) =>{

    try{
        const data = await Notes.find({email: req.body.email}).sort({ createdAt:  -1 });

        res.status(200).json({
            status: "success",
            data:{
                length: data.length,
                data
            }
        });

    }catch(err){
        console.log(err);
    }
    
    next();
};

exports.postNote = async (req, res, next) =>{
    try{
        const item = {... req.body};
        const data = await Notes.create(item);

        res.status(201).json({
            status: "success",
            data: {
                data
            }

        });
    
    }catch(err){
        console.log(err);
    }

    next();
};

exports.updateNote = async(req, res, next) => {
    try{
        
        //const note = await Notes.findOneAndUpdate({_id: req.body.id},{$set:{item: req.body.item}, createdAt: Date.now()},{new:true});
        const note = await Notes.findByIdAndUpdate({_id: req.body.id},{$set:{item: req.body.item}, createdAt: Date.now()},{new:true});

        res.status(200).json({
            status: "success",
            data: {
                note
            }
        });
    

    }catch(err){
        console.log(err)
    }

    next();
}

exports.deleteNote = async(req, res, next) =>{
    try{
        await Notes.findOneAndDelete({_id: req.params.id});

        res.status(204).json({
            status: "success",
            data: null
        });

    }catch(err){
        console.log(err);
    }

    next();

};