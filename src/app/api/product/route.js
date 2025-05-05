import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function GET(req) {
    // to get the query params from the url
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const age = searchParams.get('age');



    return NextResponse.json({
        message: 'Hello from the API',
        status: 200,
        data: {
            name: name || 'John Doe',
            age: age || 30,
        },
    });

}


// to get header into it 



export async function POST(req) {
    // to get the body from the request
    const body = await req.json();

    if (body.name === "antu") {
        return NextResponse.json({
            message: 'Hello from the API',
            status: 200,
            data: {

                age: body.age,
            },
        });
    } else {
        return NextResponse.json({
            message: 'Hello from the API',
            status: 300,
            data: {
                name: body.name,
                age: body.age,
            },
        });
    }

}


export async function PUT(req, res) {
    const body = await req.formData();


    return NextResponse.json({
        message: 'Hello from the put API',
        status: 200,
        data: {
            city: body.get('city'),
            country: body.get('country'),
            image : body.get('image'),
        },
    });
}




export async function DELETE(req, res) {
    const cookies = req.cookies.get('Cookie_1');
    return NextResponse.json({
        message: 'Hello from the delete API',
        status: 200,
        data: {
            name: 'John Doe',
            age: 30,
            cookie: cookies,
        },
    });
}    



export async function PATCH(req) {
    const headerList = headers();
    return NextResponse.json({
        message: 'Hello from the API',
        status: 200,
        data: {
            name: 'John Doe',
            age: 30,
            header: (await headerList).get('token'),
        },
    });
}