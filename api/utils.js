

const requireUser = (req, res, next) => {
    if (!req.user) {
        next('NOT AUTHORIZED');
    } else {
      next();
    }
}

module.exports = {
    requireUser
}