import { Configuration, OpenAIApi } from "openai";
async function sentToAPI(urapiKey, urOrganizeKey, message){
    const configuration = new Configuration({
        organization:urOrganizeKey,
        apiKey: urapiKey,
     });
     const openai = new OpenAIApi(configuration);
     const completion = await openai.createChatCompletion({
         "model": "gpt-3.5-turbo",
         "messages": [
             {
                 "role": "user",
                 "content": message
             }
         ],
         "temperature": 1,
         "max_tokens": 512,
         "top_p": 1,
         "temperature": 0.5,
         "frequency_penalty": 0,
         "presence_penalty": 0 
     })
     console.log(completion.data.choices[0].message);
}
//example
// const api_key="sk-tiH5SIOgkeEw30i8FchM4T3BlbkFJ9v5Y04LW0PHssMjRQfkV";// please your your own API as this one have a limit budget ><
// const api_org="org-ri1x92o8efTRUpSyLDo9ZcRL2";// u can find this in your profile id
// var message="this's example";
sentToAPI(api_key,api_org,message);
