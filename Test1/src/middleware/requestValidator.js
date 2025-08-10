exports.validateLendRequest = (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required to lend a book' });
    }
    next();
};

exports.validateReturnRequest = (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required to return a book' });
    }
    next();
};