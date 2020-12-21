const Notes = require("../models/notesModel");

exports.getNotes = async (req, res, next) =>{

    try{
        const data = await Notes.find({email: req.body.email});

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

exports.postNotes = async (req, res, next) =>{
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