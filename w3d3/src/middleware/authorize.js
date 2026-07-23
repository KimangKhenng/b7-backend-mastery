import asyncHandler from "express-async-handler"

export const authorize = (...roles) => {
    return asyncHandler((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error(`Role '${req.user.role}' is not authorized to access this route`);
        }
        next();
    })
};

export const checkOwnership = (Model) =>
    asyncHandler(async (req, res, next) => {
        const resource = await Model.findById(req.params.id);
        if (!resource) throw ApiError.notFound('Resource not found');

        const isOwner = resource.author.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner || !isAdmin) {
            throw ApiError.forbidden('You do not have permission to modify this resource');
        }

        req.resource = resource; // Attach so controller doesn't re-fetch
        next();
    });