const Router = require('koa-router')

const router = new Router()

const game_systems = [
    {
        filename: "test_gs",
        version: "205",
        name: "Grim Dark Universe latest Edition",
        id: "28ec-711c-d87f-3aeb"
    }
]

router.get('/battlescribe/game-systems',(context,next)=>{

    context.body = game_systems

    next();
})

module.exports = router