import {NextResponse, NextRequest} from 'next/server';
import openai from '@/openai';

export async function POST(request : Request){
    const {todos} = await request.json();
    console.log('inside post requests');
    
    console.log(todos);
    
    const response = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        temperature : 0.8,
        n:1,
        stream : false,
        messages : [
            {
                role : 'system',
                content : `when responding, welcome the user always as Mr.Mahammad Zubair and say welcome to Progresso! 
                Limit the response to 300 characters`,
            },
            {
                role: "user",
                content: `Hi there, provide summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here\'s the data: ${JSON.stringify(todos)}. and also at the end give some motivation to the user to complete the tasks.`
            }
        ]
    })

    const {data} = response;

    console.log("DATA IS: ", data);
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);

}   