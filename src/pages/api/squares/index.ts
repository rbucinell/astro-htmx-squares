export async function GET() {
    return new Response(
        JSON.stringify({ msg: "Hello World" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}