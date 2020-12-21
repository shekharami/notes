exports.getHome = async (req, res, next) => {
     //console.log(req.body);
    res.status(200).render('home', {
        title: 'Notes | Home'
    });
    next();
};

exports.getNotes = (req, res, next) => {
   
    res.status(200).render('myNotes', {
        title: 'My Notes'
    });
    next();
};

