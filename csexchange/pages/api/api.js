const HasatPhoneIP = "http://172.20.10.8:1000/api"
const HasatHomeIP = "http://192.168.1.40:1000/api"

const API_BASE_URL = HasatHomeIP;
const API_UNIS_INFO_ENDPOINT = `${API_BASE_URL}/all-unis/`;
const API_ANNOUNCEMENTS_ENDPOINT = `${API_BASE_URL}/announcements/`;
const API_FORUM_ENDPOINT = `${API_BASE_URL}/forum/`;
const API_LOGIN_ENDPOINT = `${API_BASE_URL}/login/`;




module.exports = {
    API_BASE_URL,
    API_UNIS_INFO_ENDPOINT,
    API_ANNOUNCEMENTS_ENDPOINT,
    API_FORUM_ENDPOINT,
    API_LOGIN_ENDPOINT,
} ;