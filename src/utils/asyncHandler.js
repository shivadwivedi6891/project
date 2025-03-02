const asyncHandler=(requestHandler)=>{

(req,res,next)=>{
    promoise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
}

}

export {asyncHandler}


