
exports.getHome = async (req, res, next) => {
    res.status(200).render('home', {
        title: 'Notes | Home'
    });
    next();
};

exports.getNotes = async (req, res, next) => {

    res.status(200).render('myNotes', {
        title: 'My Notes'
    });
    
    next();
};


exports.signup = (req, res, next) => {
   
    res.status(200).render('signup', {
        title: 'Create an account'
    });
    next();
};

exports.login = (req, res, next) => {
   
    res.status(200).render('login', {
        title: 'Login to your account'
    });
    next();
};


exports.getLogout = (req, res, next) => {
   
    res.status(200).render('logout', {
        title: 'Logged out !'
    });
    next();
};
