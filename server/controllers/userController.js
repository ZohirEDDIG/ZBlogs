import User from '../models/User.js';

export async function getSearchUsers(req, res) {
    const query = req.params.query;

    try {
        const searchObj = {
            $or: [
                { 'personalInfo.fullName': { $regex: query, $options: 'i' } },
                { 'personalInfo.username': { $regex: query, $options: 'i' } },
                { 'personalInfo.email': { $regex: query, $options: 'i' } },
                { 'personalInfo.bio': { $regex: query, $options: 'i' } }
            ]
        };

        const users = await User.find(searchObj).limit(10);

        return res.status(200).json({ users });

    } catch (error) {
        console.error(`Failed to fetch users related to ${query}`, error);
        return res.status(500).json(`Failed to fetch users related to ${query}`, error);
    };
}