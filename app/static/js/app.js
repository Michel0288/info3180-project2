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
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item active">
            <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
            </li>
      </ul>
      </div>
    </nav>
    `
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
                    <button style="width:150px;" type="button" class="btn btn-primary btn-lg rounded">Register</button>
                    <button style="width:150px; margin-left :15px" type="button" class="btn btn-info btn-lg rounded">Login</button>
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
    name: 'login',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 5rem; height: 100vh; margin: 0; ">
        <div class="d-flex align-items-center justify-content-center h-100" style="margin-top:-120px;" >
            <div class="">
            <h2 class="font-weight-bold text-center" >Login to your account</h2>
            <br>
                <div class="card p-3 mb-5" style="width: 30rem; border-radius:10px;">
                    <div class="card-body">
                    <div class="form-group">
                        <label class="font-weight-bold" for="username">Username</label>
                        <br>
                        <input name="username" style="height:50px; border-radius:10px;" class="form-control " type="text">
                    </div>
                    <div class="form-group">
                        <label class="font-weight-bold" for="password">Password</label>
                        <input name="password" style="height:50px;  border-radius:10px; " class="form-control " type="password">
                    </div>
                    <br>
                    <button type="submit" style="height:40px; border-radius:10px;" class="btn btn-success w-100">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    `,
    data() {
        return {}
    }
};

const register = {
    name: 'register',
    template: `
    <body style="background-color:#f3f4f6;padding-top: 6rem; height: 100vh; ">
        <div class="d-flex align-items-center justify-content-center h-100" style="margin-top:0px;" >
            <div class="">
                <h2 class="font-weight-bold " >Register New User</h2>
                <br>
                <form @submit.prevent="register" id="register">
                    <div class="card p-4 mb-5" style="width: 55rem; border-radius:10px;">
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label  class="font-weight-bold" for="username">Username</label>
                                    <input name="username" type="text" class="form-control " style="height:50px; width:370px; border-radius:10px;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-bold" for="password">Password</label>
                                    <input name="password" type="password" class="form-control" style="height:50px; width:370px; border-radius:10px;">
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
        return {}
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

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/login", component: login },
    
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