function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                const parsedBody = JSON.parse(body)
                resolve(parsedBody);
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { getPostData }