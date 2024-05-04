const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(req).catch((err) => next(err))
    }
}

// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//         await fn(req,res,next)
//     } catch (error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }


export {async}