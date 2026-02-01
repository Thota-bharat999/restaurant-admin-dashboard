export const errorMiddlware=(err,req,res,next)=>{
    console.error(err)
    const statusCode=err.statusCode || 500
    res.status(statusCode).json({
        success:false,
        message:err.stack || "Internal Server Error",
        
    })
}