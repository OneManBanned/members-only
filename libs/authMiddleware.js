export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("You're no authorized to view this resource");
    }
}

export function isMember(req, res, next) {
    if (req.user.membership_status) {
        next();
    } else {
        res.status(401).send("You're no authorized to view this resource");
    }
}
