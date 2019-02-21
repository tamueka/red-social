
import APIService from './API-service';

class LoginService {
    constructor() {
        this.baseUrl = process.env.API_URL;
        this.APIServiceInstance = new APIService();
    }
    //Obtenemos usuario
    async getUser() {
        return this.APIServiceInstance.get();
    }
    //Login
    async Login(email,pass) {
        return this.APIServiceInstance.search(email,pass);
    }
    //Perfiles
    async Profile(email) {
        return this.APIServiceInstance.search_profile(email);
    }  
}

export default LoginService;
