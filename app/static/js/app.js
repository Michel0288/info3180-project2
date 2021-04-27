/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});
app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color:#202938;">
    <span class=" pl-2 pr-3"><img src="https://img.icons8.com/material-rounded/24/ffffff/car.png"/></span>  
    <a class="navbar-brand" href="#">United Auto Sales</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item active">
          <li class="nav-item active">
          <router-link class="nav-link" v-if="!link_status" to="/" >Home <span class="sr-only">(current)</span></router-link>
          </li>
          <router-link class="nav-link " style="margin-left:200px;" v-if="link_status" to="/cars/new">Add Car <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
          <router-link class="nav-link ml-4" v-if="link_status" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
          <router-link class="nav-link ml-4" v-if="link_status" @click="profile_page()" v-bind:to="'/users/' + userid">My Profile <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item active">
            <router-link class="nav-link"  v-if="!link_status" to="/register">Register <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
            <router-link class="nav-link"  v-if="!link_status" to="/login">Login <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
            <router-link class="nav-link" v-if="link_status" to="/logout">Logout<span class="sr-only">(current)</span></router-link>
            </li>
      </ul>
      </div>
    </nav>
    `, 
    data: function(){
        return {
            userid: 0,
            link_status:false
        }
    },
    methods:{
        profile_page(){
            location.reload();
        }
    },
    mounted: function(){
        let self=this;
        self.userid=localStorage.getItem('id');
        setInterval(()=>{
            if(localStorage.hasOwnProperty('token')){
                this.link_status=true;
            }
            else{
                this.link_status=false;
            }
        },1)
    }
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
    <div>
        <div class="row no-gutters">
            <div class="col my-auto ">
                <div class="mx-auto" style="width:400px;">
                    <h1 class="font-weight-bold" style="font-size:50px;">Buy and Sell Cars Online</h1>
                    <br>
                    <p  style="font-size:17px;">United Auto Sales provides the fastest, easiest and most user friendly way to buy or sell cars online. Find a Great Price on the Vehicle You Want.</p>
                    <router-link style="width:150px;" type="button" class="btn btn-primary btn-lg rounded" to="/register">Register<span class="sr-only">(current)</span></router-link>
                    <router-link style="width:150px; margin-left :15px" type="button" class="btn btn-info btn-lg rounded" to="/login">Login<span class="sr-only">(current)</span></router-link>
                </div>
            </div>
            <div class="col">
                <img src="/static/images/home.jpg" alt="Car" style="width:100%;height:98vh;">
            </div>
        </div>
    </div>

    `,
    data() {
        return {}
    }
};

const login = {
    name: 'loginForm',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 5rem; margin-top: 0; ">
        <div class="d-flex align-items-center justify-content-center h-100"  style="padding-bottom:20rem; margin-top:200px;" >
            <div class="">
            <h2 class="font-weight-bold text-center" >Login to your account</h2>
            <br>
            <form @submit.prevent="loginUser" id="loginForm">
                <div id = "message">
                    <p class="alert alert-success" v-if="message === 'success'" >{{success}}</p>
                    <ul class="alert alert-danger" v-if="message === 'error'" >
                        <li v-for="errors in errors" > {{errors}}</li>
                    </ul> 
                </div>
                <div class="card p-3 mb-5" style="width: 30rem; border-radius:10px;">
                    <div class="card-body">
                    <div class="form-group">
                        <label class="font-weight-bold" for="username">Username</label>
                        <br>
                        <input name="username" style="height:50px; border-radius:10px;" class="form-control " type="text">
                    </div>
                    <div class="form-group">
                        <label class="font-weight-bold" for="password">Password</label>
                        <input name="password" autocomplete="on"  style="height:50px;  border-radius:10px; " class="form-control " type="password">
                    </div>
                    <br>
                    <button type="submit" style="height:40px; border-radius:10px;" class="btn btn-success w-100">Login</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </body>

    `,
    data() {
        return {
            message: '',
            errors: [],
            success:[]
        }
    },
    methods: {
        loginUser: function(){
            let loginForm= document.getElementById('loginForm');
            let router =this.$router;
            let form_data=new FormData(loginForm);
            let self=this;
            fetch("/api/auth/login", {
                method: "POST",
                body: form_data,
                headers: {
                   
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                // console.log(response)
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('message' in jsonResponse ){
                    let jwt_token=jsonResponse.message.token
                    localStorage.setItem("token",jwt_token)
                    localStorage.setItem("id",jsonResponse.message.id)
                    self.success =  jsonResponse.message.message;
                    self.message = 'success';
                    router.push('/explore')
                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    self.errors = jsonResponse.errors.errors;
                    self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
};


const logout = {
    name: 'logout',
    template: `
    `,
    data() {
        return {

        }
    },
    mounted: function(){
        fetch("/api/auth/logout", {
            method: "GET",
            headers: {
                'X-CSRFToken': token,
                'Authorization': "Bearer "+ localStorage.getItem("token")
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if ('message' in jsonResponse ){
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                self.success =  jsonResponse.message.message;
                self.message = 'success';
                router.push('login');
                console.log(jsonResponse);
            } else if ('errors' in jsonResponse ){
                console.log(jsonResponse);
                self.errors = jsonResponse.errors.errors;
                self.message = 'error';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {}
};

const register = {
    name: 'registerForm',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 6rem; ">
        <div class="d-flex align-items-center justify-content-center h-100" style="padding-bottom:20rem; margin-top:0px;" >
            <div class="">
                <h2 class="font-weight-bold " >Register New User</h2>
                <br>
                <form @submit.prevent="registerUser" id="registerForm">
                <div id = "message">
                    <p class="alert alert-success" v-if="message === 'success'" >{{success}}</p>
                    <ul class="alert alert-danger" v-if="message === 'error'" >
                        <li v-for="errors in errors" > {{errors}}</li>
                    </ul> 
                </div>
                    <div class="card p-4 mb-5" style="width: 55rem; border-radius:10px;">
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="username">Username</label>
                                    <input name="username" type="text" class="form-control " style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-bold" for="password">Password</label>
                                    <input name="password" type="password" autocomplete="on" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="name">Fullname</label>
                                    <input name="name" type="text" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-bold" for="email">Email</label>
                                    <input name="email" type="email" class="form-control" style="height:50px;  width:370px; border-radius:10px;">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="location">Location</label>
                                    <input name="location" type="text" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group w-100">
                                    <label  class="font-weight-bold" for="biography">Biography</label>
                                    <textarea name="biography" class="form-control w-100 " style="height:150px; border-radius:10px;"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold" for="photo">Upload Photo</label>
                                <input name="photo" class="form-control-file" type="file">
                            </div><br>
                            <button type="submit" style="height:45px; width:200px; border-radius:10px;" class="btn btn-success">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>

    `,
    data() {
        return {
            message: '',
            errors: [],
            success:[]
        }
    },
    methods: {
        registerUser: function(){
            let registerForm= document.getElementById('registerForm');
            let router =this.$router;
            let form_data=new FormData(registerForm);
            let self=this;
            fetch("/api/register", {
                method: "POST",
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('message' in jsonResponse ){
                    self.success = 'Registration Succesful!';
                    self.message = 'success';
                    setTimeout(() => {
                        router.push('/login')
                    }, 1500); 
                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    self.errors = jsonResponse.errors.errors;
                    self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
};

const explore = {
    name: 'explore',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 5rem; padding-bottom:10rem; margin: 0; " >
        <div class="d-flex align-items-center justify-content-center h-100" style="margin-top:90px;" >
            <div class="">
            <h2 class="font-weight-bold" style="font-size:40px;">Explore</h2>
            <br>
                <div id = "message">
                    <p class="alert alert-success" v-if="message === 'success'" >Car/s Found!</p>
                    <ul class="alert alert-danger" v-if="message === 'error'" >
                        <li v-for="errors in errors" > {{errors}}</li>
                    </ul> 
                </div>
                <div class="card p-3  mb-4" style="width: 65rem; border-radius:10px;">
                    <div class="card-body">
                    <div class="form-row ">
                    <div class="form-group col">
                        <label  class="font-weight-bold" for="make">Make</label>
                        <input name="make" v-model="makeSearch" id="make" type="text" class="form-control " style="height:50px; width:350px; margin-right:20px; border-radius:10px;">
                    </div>
                    <div class="form-group col">
                        <label class="font-weight-bold" for="model">Model</label>
                        <input name="model" type="text" v-model="modelSearch" class="form-control" style="height:50px; width:350px; margin-right:20px; border-radius:10px;">
                    </div>
                    <div class="form-group col " style="margin-top:30px;">
                    <button type="submit"  @click="search"  style="height:50px; border-radius:10px;" class="btn btn-success w-100">Search</button>
                    </div>
                </div>
                    <br>
                    </div>
                </div>
            </div>
         </div>
         <div class="card-layout d-flex align-items-center  justify-content-center" style="margin-left:40px; margin-top:50px;">
            <div id='carddd'>
            <div v-for="cars in cars"  class="card mb-4 mr-4" style="width: 22rem;  border-radius:10px;">
            <div class="h-100 w-100">
                <img v-bind:src="cars.photo" class="card-img-top" style="height: 15rem;" alt="Car Images"/>
            </div>
            <div class="card-body" style="height:12rem;">
                <div class="row">
                    <h5 class="font-weight-bold card-title col">{{cars.year}} {{cars.make}}</h5> 
                    <div >
                        <span class="d-flex p-1 btn-success align-items-center justify-content-center" style="float:right;border-radius:10px; height:35px;" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tag mr-1" viewBox="0 0 16 16">
                            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
                            <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
                            </svg> 
                            <span> {{"$"+Number(cars.price).toLocaleString() }}</span>
                        </span>
                    </div>
                </div>

                <p class="card-text" style="margin-top:-10px;color:#95989e;">{{cars.model}}</p><br><br>
                <button style="height:40px; border-radius:10px;" @click="$router.push({ name: 'carDetails', params: { car_id: cars.id } })" class="btn btn-success w-100 mb-2">View more details</button>                
            </div>
        </div>
            
            </div>

        </div>    
    </body>
    `,
    data() {
        return {
            message: '',
            errors: [],
            success:[],
            cars:[],
            makeSearch:'',
            modelSearch:''
          
        }
    },
    methods: {
        search: function(){
            let router =this.$router;
            let self=this;
            fetch('/api/search?make='+self.makeSearch+'&'+'model='+self.modelSearch, {
                method: "GET",
                headers: {
                    'X-CSRFToken': token,
                    Authorization: 'Bearer ' + localStorage.getItem('token')
    
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                if(response.status==401){
                    router.push('/error')
                }
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('data' in jsonResponse ){
                    // self.success =  jsonResponse.message.message;
                    self.message = 'success';
                
                    self.cars=jsonResponse.data
                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    self.cars=[]
                    self.errors = jsonResponse.errors.errors;
                    self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    },
    mounted: function(){
        let router =this.$router;
        let self=this;
        fetch("/api/cars", {
            method: "GET",
            headers: {
                'X-CSRFToken': token,
                Authorization: 'Bearer ' + localStorage.getItem('token')

            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            if(response.status==401){
                router.push('/error')
            }
            return response.json();
        })
        .then(function (jsonResponse) {
            if ('data' in jsonResponse ){
                // self.success =  jsonResponse.message.message;
                // self.message = 'success';
                self.cars=jsonResponse.data
                console.log(jsonResponse)
            } else if ('errors' in jsonResponse ){
                console.log(jsonResponse)
                // self.errors = jsonResponse.errors.errors;
                // self.message = 'error';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


const getCarDetails = {
    name: 'carDetials',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 6rem; height: 100vh; ">
    <div class="d-flex align-items-center justify-content-center h-100" style="flex-direction: column; margin-top:-120px;">
            <div id = "message" style="width:1000px;" >
            <p class="alert alert-success" v-if="message === 'success'" >{{success}}</p>
            <ul class="alert alert-danger" v-if="message === 'error'" >
                <li v-for="errors in errors" > {{errors}}</li>
            </ul> 
            </div>
        <div style="width: 1700px;">
            <div class="" style="margin-top:0px;" >
                <div class="row g-0 no-gutters justify-content-center ">
                <div class="col-md-3  rounded" >
                    <img v-bind:src="cars.photo" class="card-img-top h-100" alt="Car Images"/>
                </div>
                <div class="col-md-4 pr-3 bg-white  rounded" >
                    <div class="card-body ">

                    <div class="card-body">
                    <h2 class="card-title font-weight-bold">{{cars.year}} {{cars.make}}</h2>
                    <p class="card-text font-weight-bold" style="color:#95989e; font-size:25px; margin-top:-10px;">{{cars.model}}</p>
                    <p class="card-text" style="color:#95989e;">{{cars.description}}</p>
                </div>
                <div class="row">
                    <span class="d-flex col">
                        <p class="mr-5 ml-3" style="color:#95989e;">Color </p>
                        <p class="font-weight-bold">{{cars.colour}}</p>
                    </span>
                    <span class="d-flex col">
                        <p class="mr-5" style="color:#95989e;">Body Type </p>
                        <p class="font-weight-bold">{{cars.car_type}}</p>
                    </span>
                </div>

                <div class="row">
                    <span class="d-flex col">
                        <p class="mr-5 ml-3 " style="color:#95989e;">Price </p>
                        <p class="font-weight-bold">{{"$"+Number(cars.price).toLocaleString() }}</p>
                    </span>
                    <span class="d-flex col">
                        <p class="mr-4" style="color:#95989e;">Transmission</p>
                        <p class="font-weight-bold">{{cars.transmission}}</p>
                    </span>
                </div>
                <br><br><br><br><br><br>
                <div class="row">
                <span class="d-flex col">
                    <button class="btn btn-success mt-4" style="height:40px;" type="submit">Email Owner</button>
                </span>
                <span class="d-flex col">
                    <input id="toggle-heart" class="mr-5 mt-4" v-on:click="favorites(cars.id)"  type="checkbox" /> 
                    <label style="margin-left:300px; " class="mt-4" for="toggle-heart">❤</label>
                </span>
                </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </body>

    `,
    data() {
        return {
            message: '',
            errors: [],
            cars:[],
            success:[]
           
        }
    },
    mounted: function(){
        let router =this.$router;
        let car_id = this.$route.params.car_id;
        let self=this;

        fetch("/api/cars/"+car_id, {
            method: "GET",
            headers: {
                'X-CSRFToken': token,
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            if(response.status==401){
                router.push('/error')
            }
            return response.json();
        })
        .then(function (jsonResponse) {
            if ('data' in jsonResponse ){
                // self.success =  jsonResponse.message.message;
                // self.message = 'success';
                self.cars=jsonResponse.data
                console.log(jsonResponse)
            } else if ('errors' in jsonResponse ){
                console.log(jsonResponse)
                // self.errors = jsonResponse.errors.errors;
                // self.message = 'error';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods:{
        favorites(car_id){
            let router =this.$router;
            let self=this;
            fetch("/api/cars/"+car_id+"/favourite", {
                method: "POST",
                headers: {
                    'X-CSRFToken': token,
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                if(response.status==401){
                    router.push('/error')
                }
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('data' in jsonResponse ){
                    self.success =  jsonResponse.data.message;
                    self.message = 'success';
                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    self.errors = jsonResponse.errors.errors;
                    self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
    
    }
};


const addcars = {
    name: 'carForm',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 6rem;  ">
        <div class="d-flex align-items-center justify-content-center h-100" style="margin-top:50px;" >
            <div class="">
                <h2 class="font-weight-bold " >Add New Car</h2>
                <br>
                <form @submit.prevent="registerCar" id="carForm">
                <div id = "message">
                    <p class="alert alert-success" v-if="message === 'success'" >Car Successfully Added!</p>
                    <ul class="alert alert-danger" v-if="message === 'error'" >
                        <li v-for="errors in errors" > {{errors}}</li>
                    </ul> 
                </div>
                    <div class="card p-4 mb-5" style="width: 55rem; border-radius:10px;">
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="make">Make</label>
                                    <input name="make" type="text" class="form-control " style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-bold" for="model">Model</label>
                                    <input name="model" type="text" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="colour">Colour</label>
                                    <input name="colour" type="text" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-bold" for="year">Year</label>
                                    <input name="year" type="text" class="form-control" style="height:50px;  width:370px; border-radius:10px;">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="price">Price</label>
                                    <input name="price" type="number" class="form-control" style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="ctype">Car Type</label>
                                    <select name="ctype" class="custom-select" style="height:50px; width:370px; border-radius:10px;">
                                        <option value="SUV">SUV</option>
                                        <option value="MPV">MPV</option>
                                        <option value="Micro">Micro</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Wagon">Wagon</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Antique">Antique</option>
                                        <option value="Muscle">Muscle</option>
                                        <option value="Electric">Electric </option>
                                        <option value="Supercar"> Supercar</option>
                                        <option value="Convertible">Convertible</option>
                                        <option value="Coupe">Coupe</option>
                                    </select>                                
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="transmission">Transmission</label>
                                    <select name="transmission" class="custom-select" style="height:50px; width:370px; border-radius:10px;">
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group w-100">
                                    <label  class="font-weight-bold" for="description">Description</label>
                                    <textarea name="description" class="form-control w-100 " style="height:150px; border-radius:10px;"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold" for="photo">Upload Photo</label>
                                <input name="photo" class="form-control-file" type="file">
                            </div><br>
                            <button type="submit" style="height:45px; width:200px; border-radius:10px;" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>

    `,
    data() {
        return {
            message: '',
            errors: [],
            success:[]
        }
    },
    methods: {
        registerCar: function(){
            let carForm= document.getElementById('carForm');
            let router =this.$router;
            let form_data=new FormData(carForm);
            let self=this;
            fetch("/api/cars", {
                method: "POST",
                body: form_data,
                headers: {
                    'X-CSRFToken': token,
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                if(response.status==401){
                    router.push('/error')
                }
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('message' in jsonResponse ){
                    self.success =  jsonResponse.message.message;
                    self.message = 'success';
                    setTimeout(() => {
                        router.push('/explore')
                    }, 1500); 

                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    self.errors = jsonResponse.errors.errors;
                    self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
};

const profile = {
    name: 'profile',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 6rem; margin-top:0px; padding-bottom:10rem;">
        <div class="d-flex align-items-center justify-content-center" style="margin-top:-240px;" >
            <div>
                <div class="card mb-3 pb-2" style="width: 900px; margin-top:270px;">
                    <div class="row no-gutters">
                        <div class="col-md-3 p-2 pt-4 pl-4 mr-3">
                            <img v-bind:src="user.photo" class="card-img-top" style="border-radius:50%; width:200px;height:200px;" alt="User Images"/>
                        </div>
                        <div class="col-md-4">
                            <div class="card-body">
                                <h2 class="card-title font-weight-bold">{{user.name}}</h2>
                                <p class="card-text font-weight-bold" style="color:#95989e; font-size:25px; margin-top:-10px;">@{{user.username}}</p>
                                <p class="card-text" style="color:#95989e;">{{user.biography}}</p>
                            
                                <div class="row">
                                    <span class="d-flex col">
                                        <p class="mr-5" style="color:#95989e;">Email </p>
                                        <p class="font-weight-bold">{{user.email}}</p>
                                    </span>
                                    <span class="d-flex col">
                                        <p class="mr-4" style="color:#95989e;">Location</p>
                                        <p class="font-weight-bold">{{user.location}}</p>
                                    </span>
                                    <span class="d-flex col">
                                        <p class="pr-3 mr-4" style="color:#95989e;">Joined</p>
                                        <p class="font-weight-bold">{{user.date_joined}}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="font-weight-bold d-flex align-items-center  justify-content-center" style="margin-right:720px;">Cars Favourited</h2>
        <div class="card-layout d-flex align-items-center  justify-content-center" style="margin-left:40px; margin-top:0px;">
        <div id='carddd'>
        <div v-for="cars in cars"  class="card mb-4 mr-4" style="width: 19rem;  border-radius:10px;">
        <div class="h-100 w-100">
            <img v-bind:src="cars.photo" class="card-img-top" style="height: 15rem;" alt="Car Images"/>
        </div>
        <div class="card-body" style="height:12rem;">
            <div class="row">
                <h6 class="font-weight-bold card-title col">{{cars.year}} {{cars.make}}</h6> 
                <div >
                    <span class="d-flex p-1 btn-success align-items-center justify-content-center" style="float:right;border-radius:10px; height:35px;" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tag mr-1" viewBox="0 0 16 16">
                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
                        </svg> 
                        <span> {{"$"+Number(cars.price).toLocaleString() }}</span>
                    </span>
                </div>
            </div>

            <p class="card-text" style="margin-top:-10px;color:#95989e;">{{cars.model}}</p><br><br>
            <button style="height:40px; border-radius:10px;" @click="$router.push({ name: 'carDetails', params: { car_id: cars.id } })" class="btn btn-success w-100">View more details</button>                
        </div>
    </div>
        
        </div>

    </div>    


    </body>

    `,
    data() {
        return {
            message: '',
            errors: [],
            user:[],
            success:[],
            cars:[]
           
        }
    },
    created: function(){
            let router =this.$router;
            let user_id = JSON.parse(localStorage.getItem('id'));
            let self=this;

        
            fetch("/api/users/"+user_id+"/favourites", {
                method: "GET",
                headers: {
                    'X-CSRFToken': token,
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                if(response.status==401){
                    router.push('/error')
                }
                return response.json();
            })
            .then(function (jsonResponse) {
                if ('data' in jsonResponse ){
                    // self.success =  jsonResponse.message.message;
                    // self.message = 'success';
                    self.cars=jsonResponse.data
                    console.log(jsonResponse)
                } else if ('errors' in jsonResponse ){
                    console.log(jsonResponse)
                    // self.errors = jsonResponse.errors.errors;
                    // self.message = 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    mounted: function(){
        let router =this.$router;
        let user_id =localStorage.getItem('id') ;
        let self=this;
        fetch("/api/users/"+user_id, {
            method: "GET",
            headers: {
                'X-CSRFToken': token,
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            if(response.status==401){
                router.push('/error')
            }
            
            return response.json();

        })
        .then(function (jsonResponse) {
            if ('data' in jsonResponse ){
                // self.success =  jsonResponse.message.message;
                // self.message = 'success';
                self.user=jsonResponse.data
                console.log(jsonResponse)
            } else if ('errors' in jsonResponse ){
                console.log(jsonResponse)
                // self.errors = jsonResponse.errors.errors;
                // self.message = 'error';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

const error = {
    name: 'error',
    template: `
    <h1 class="" style="text-align:center; font-size:64px; margin:75px 0 20px; color:#D15C95">HOLD UP!</h1>
    <h2 class="" style="text-align:center; font-size:64px; color:#F0E395">ERROR:</h2>
    <section class="error-container" style="">
        <span><span>4</span></span>
        <span>0</span>
        <span><span>1</span></span>
    </section>
    <h2 class="mt-5" style="text-align:center; font-size:64px; color:#FFB485">UNAUTHORIZED!</h2>
    <h2 class="" style="text-align:center; font-size:24px; color:#F0E395">ERROR WITH JWT TOKEN</h2>
    <router-link class="" style="margin-left:720px;" to="/logout">Please logout and login to continue!<span class="sr-only">(current)</span></router-link>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/login", component: login },

    { path: "/logout", component: logout },

    { path: "/cars/:car_id",name:'carDetails', component: getCarDetails },

    { path: "/users/:user_id",name:'profile', component: profile },

    { path: "/explore", component: explore },

    { path: "/error", component: error },

    { path: "/cars/new", component: addcars },

    { path: "/register", component: register },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');