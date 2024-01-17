export async function GET() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const randomUser = data.results[0];
    return new Response( JSON.stringify(randomUser) );
}