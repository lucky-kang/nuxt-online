const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['device'] = require('..\\middleware\\device.js')
middleware['device'] = middleware['device'].default || middleware['device']

middleware['getClientIp'] = require('..\\middleware\\getClientIp.js')
middleware['getClientIp'] = middleware['getClientIp'].default || middleware['getClientIp']

middleware['page-cache'] = require('..\\middleware\\page-cache.js')
middleware['page-cache'] = middleware['page-cache'].default || middleware['page-cache']

export default middleware
