import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = userId;
        next();
    } catch (error) {
        console.error('Unauthorized: Invalid token. ', error.message);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export default authMiddleware;