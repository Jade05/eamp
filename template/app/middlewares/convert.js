export default function () {
    const middlewares = Array.from(arguments)
    const length = middlewares.length
    
    return async (req, res, next) => {
        if (!middlewares || !length) {
            next()
        }

        const __next = async index => {
            const middleware = middlewares[index]
            if (index === length) {
                return next()
            }
            if (typeof middleware === 'function') {
                req.span && req.span.event(`start-middleware-${index}`)
                await middleware(req, res, () => __next(index + 1))
                req.span && req.span.event(`end-middleware-${index}`)
            } else {
                await __next(index + 1)
            }
        }

        try {
            await __next(0)
        } catch (error) {
            next(error)
        }
    }
}
  