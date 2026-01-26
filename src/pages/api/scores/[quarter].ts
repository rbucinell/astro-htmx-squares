import type { APIContext } from "astro";
import FootballEvent from "@models/events";

export async function PUT({request, params, url}: APIContext) {
    let {quarter} = params;
    const eventId = url.searchParams.get('eventId');
    let q = parseInt(quarter);
    const data = await request.formData();
    const afc = (data.get('afc') == "") ? null : parseInt(data.get('afc').toString());
    const nfc = (data.get('nfc') == "") ? null : parseInt(data.get('nfc').toString());

    await FootballEvent.updateOne({ _id: eventId }, { 
        $set: { 
            [`afc.scores.${q-1}`]: afc,
            [`nfc.scores.${q-1}`]: nfc
        }
    });
    return new Response(null, { status: 201 });
}

