import db from "../config/db/queries.js";

const indexController = {
    get: async (req, res) => {
        const { rows } = await db.findMessages()

        const signedIn = req.isAuthenticated();
        const memberStatus = signedIn ? req.user.membership_status : false;

        res.render("index.html", { signedIn: signedIn, memberStatus: memberStatus, messages: rows });
    },
};

export default indexController;
