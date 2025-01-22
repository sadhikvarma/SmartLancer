import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        // Get token from header or cookies
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.KEY);
        
        // Attach user ID to request object
        req.user = { _id: decoded.userId };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

export {auth as auth};