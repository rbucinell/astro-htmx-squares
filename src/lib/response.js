export function successJSON( data, status=200 ) {
    return new Response( data === null ? data : JSON.stringify(data),{
        status,
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

export function errorResponse( status,body ){
    return new Response(body,{ status, body});
}

export function error404( body = null){
    return new Response(body,{
        status: 404,
        statusText: 'Not Found'
    })
}