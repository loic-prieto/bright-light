const Router = require('koa-router')

const router = new Router()

const catalogues = [
    {
        filename: "test_bs_catalogue",
        revision: "184",
        gamesystem_id: "28ec-711c-d87f-3aeb",
        gamesystem_revision: "205",
        name: "Robotic Zealots",
        id: "ebe8-544e-1fe8-fcde"
    }
]

router.get('/battlescribe/catalogues',(context,next)=>{
    context.body = catalogues
    next();
})

router.get('/battlescribe/catalogue/:id',(context,next)=>{
    const revision = context.request.query.revision
    const id = context.params.id

    if(!revision) {
        context.status = 400
        context.body = {error: "revision is a mandatory query param"}
    } else {
        const catalogue = catalogues.find((catalogue)=>catalogue.id === id && catalogue.revision === revision)
        if(catalogue) {
            context.body = catalogue
        } else {
            context.status = 404
            context.body = {error: `Could not find catalogue ${id} at revision ${revision}`}
        }
    }

    next()
})

module.exports = router