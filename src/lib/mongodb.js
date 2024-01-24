
const appId = `data-jzoii`;
const baseUri = `https://us-east-1.aws.data.mongodb-api.com/app/${appId}/endpoint/data/v1`;
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export async function find( collection, options = null) {
    const response = await db('find', collection, options);
    return await response.json();
}
export async function findOne( collection, options = null ) {
    const response = await db('findOne', collection, options );
    return await response.json();
}

export async function db(action, collection, options ) {
    const uri = `${baseUri}/action/${action}`;
    const body = {
        "dataSource": import.meta.env.MONGO_SOURCE,
        "database": import.meta.env.MONGO_DB,
        "collection": collection,
        ...options
    };
    const response = await fetch( uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Accept': 'application/json',
            'api-key': import.meta.env.MONGO_DATA_API_KEY_SECRET
        },
        body: JSON.stringify(body)
    });
    return response;
}
