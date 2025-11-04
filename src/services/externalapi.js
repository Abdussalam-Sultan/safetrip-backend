import axios from "axios";
import config from "../config/index.js";
import AppError from "../utils/AppError.js";


const typicodeAPI = axios.create({
  baseURL: config.TYPICODE_BASE_URL,
  timeout: 1000,
  headers: {'Authorization': config.TYPICODE_BASE_API_KEY,
    "Content-Type": "application.json",
  }
});

//connecting to our typicode
export async function getPublicProfiles(userid){
    try{
        const response = await typicodeAPI.get('/users, {params:{userid}}');
        if(!response) throw new AppError("No response for typicode API", 502)
        return response;
    } catch (error) {
        console.error("Error fetching profile:", error)

    }
    
}

async function getPublicPost(postid){
    try {
        const response = await typicodeAPI.post('/post, {params:{postid}}');
        return response;
    } catch (error) {
        console.error("Error fetching public post", error)
    }

}

//sending something into Typicode api. creating a user on the remote server(API)
async function sendPublicUser(){
    try{
        const response = await typicodeAPI.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  });
  return response;

    } catch (error){
        console.log("Error Fetching User", error)
    }
};

export default {getPublicProfiles, getPublicPost, sendPublicUser}
