//资源中间件
module.exports = options => {
    
    return async (req,res,next)=>{
        //提取中间件
        //把小写复数转成大写单数的名称，就是一个类名
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}