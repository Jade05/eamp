'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    const middlewares = Array.from(arguments);
    const length = middlewares.length;

    return (() => {
        var _ref = _asyncToGenerator(function* (req, res, next) {
            if (!middlewares || !length) {
                next();
            }

            const __next = (() => {
                var _ref2 = _asyncToGenerator(function* (index) {
                    const middleware = middlewares[index];
                    if (index === length) {
                        return next();
                    }
                    if (typeof middleware === 'function') {
                        req.span && req.span.event(`start-middleware-${index}`);
                        yield middleware(req, res, function () {
                            return __next(index + 1);
                        });
                        req.span && req.span.event(`end-middleware-${index}`);
                    } else {
                        yield __next(index + 1);
                    }
                });

                return function __next(_x4) {
                    return _ref2.apply(this, arguments);
                };
            })();

            try {
                yield __next(0);
            } catch (error) {
                next(error);
            }
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    })();
};

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }