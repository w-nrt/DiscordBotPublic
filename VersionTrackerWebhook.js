//This code is used for my roblox game, each time the update time is different from the old one it'll post.

//Imports
import axios from 'axios'
import 'dotenv/config'
import { open, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

//API Keys constants
const RobloxAPI = process.env.ROBLOX_API_KEY;
const DiscordWebhook = process.env.DISCORD_WEBHOOK_URL;
const GameAPIURL = 'https://apis.roblox.com/cloud/v2/universes/9469403144/places/131996783533808';

//Needed variables
//let versionFile = await open("currentversion", "r");
let currentVersion = 1;
let versionDirectory = path.join(import.meta.dirname,'currentversion.txt');


//Functions

async function getVersion(location) {
    const toReturn = await readFile(location, 'utf8');
    return toReturn.trim();
}

async function IncrementVersion(location) {
    let data =  (await readFile(location))
    let newnumber = parseInt(data, 10) + 1; // use second variable cuz we never know if its gonna async and immediately write
    await writeFile(location, newnumber.toString(), (err) => {
        if (err) throw err;
    });
    return newnumber;
}


async function post() {

    axios.post(DiscordWebhook, {
        content: "# A new version of the game was published!\n**Development stage:** Alpha\n**Old version: **"+await getVersion(versionDirectory)+"\n**New version: **"+await IncrementVersion(versionDirectory)
    });
}


async function CheckForUpdate(yesno){
try {
    const response = await axios.get(GameAPIURL, {
        headers: { 
            'x-api-key': RobloxAPI 
        }
    });
    if (currentVersion != response.data.updatedAt && yesno) {
        post();
    }
    currentVersion = response.data.updatedAt; 
} catch (error) {

    console.error("Connection failed:", error.response?.status || error.message);
}
}

CheckForUpdate(false) // whenever code is executed, so it doesnt add a "fake" version

//Check game version every minute.

setInterval(() => {
    checkUpdate(true);
}, 60*1000);