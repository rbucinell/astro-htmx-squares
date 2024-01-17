export function successJSON( data ) {
    return new Response( JSON.stringify(data),{
        status: 200,
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

export function errorResponse( status,body ){
    return new Response(body,{ status, body});
}

export function error404(){
    return new Response(null,{
        status: 404,
        statusText: 'Not Found'
    })
}