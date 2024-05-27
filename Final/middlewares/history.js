module.exports = async function (req, res, next) {
 if(!req.session.history){
req.session.history = []
 }
    next();
  };