import { createProxyMiddleware } from 'http-proxy-middleware';

const userProxy = createProxyMiddleware({
    target: process.env.PROXY_USER_TARGET,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/',
    },
});

const productProxy = createProxyMiddleware({
    target: process.env.PROXY_PRODUCT_TARGET,
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            const userHeader = req.headers['x-user'];
            if (userHeader) {
                proxyReq.setHeader('x-user', userHeader);
            }
        },
    },
    pathRewrite: {
        '^/api/product': '/',
    },
});

export { userProxy, productProxy };
