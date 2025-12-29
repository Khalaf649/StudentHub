import authMiddleware from "./authMiddleware";
import authorizeRole from "./roleMiddleware";
const graphqlMiddleware = async (req, res) => {
    // Wrap authMiddleware
    await new Promise((resolve, reject) => {
        authMiddleware(req, res, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
    // Wrap roleMiddleware for teacher
    await new Promise((resolve, reject) => {
        authorizeRole("teacher")(req, res, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
    // Now req.user is available
    return { user: req.user };
};
export default graphqlMiddleware;
