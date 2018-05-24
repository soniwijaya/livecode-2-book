<template>
  <div class="home">
    <b-navbar toggleable="md" type="light" variant="light" fixed>
      <b-container class="bv-example-row">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/" ><b-navbar-brand>Buy Book</b-navbar-brand></router-link>
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="signLogin=='show'" class="ml-auto">
          <b-nav-item style="color:black;"><router-link to="addbook">Add Book</router-link></b-nav-item>
          <b-nav-item @click="logoutButton">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item v-b-modal.login>Login</b-nav-item>
          <b-nav-item v-b-modal.register>Register</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-modal id="login" title="Login" @ok="loginButton">
      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input v-model="login.email" type="email" placeholder="email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="login.password" type="password" placeholder="password"></b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal id="register" title="Register" @ok="registerButton">
      <b-form-group>
        <b-form-input v-model="register.fullname" type="text" placeholder="fullname"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="register.email" type="email" placeholder="email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="register.password" type="password" placeholder="password"></b-form-input>
      </b-form-group>
    </b-modal>
    
    <b-container class="bv-example-row">
      <br>
      <h3>Books Store list</h3>
      <b-row>
      <listBook v-for="list in listbook" :key="list._id"
        :viewlist="list"
      />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import listBook from '@/components/listBook.vue'

export default {
  name: 'home',
  components: {
    listBook
  },
  data: function () {
    return {
      login: {
        email: null,
        password: null
      },
      register: {
        fullname: null,
        email: null,
        password: null
      },
      listbook: [],
      signLogin: localStorage.getItem('signLogin'),
    }
  },
  methods: {
    showBook: function () {
      let self = this
      axios.get(`http://apilivecodedua.thismylife.net/books`)
      .then(function(response) {
         self.listbook = response.data.data
      })
      .catch(function(err){
        console.log(err)
      })
    },
    loginButton: function () {
        let self = this
        axios.post('http://apilivecodedua.thismylife.net/users/login', {
            email: this.login.email,
            password: this.login.password
        })
        .then(response => {
            swal("Welcome", response.data.message, "success")
            .then(() => {
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('name', response.data.fullname)
                localStorage.setItem('apptoken', response.data.access)
                localStorage.setItem('signLogin', 'show')
                this.$router.push({ name: 'addbook' })
            })
        })
        .catch(err => {
            swal("Your error", err.response.data.message, "error")
        })
    },
    registerButton: function () {
        axios.post('http://apilivecodedua.thismylife.net/users/', {
            fullname: this.register.fullname,
            email: this.register.email,
            password: this.register.password
        })
        .then(response => {
            swal("Welcome", response.data.message, "success")
        })
        .catch(err => {
            swal("Your error", err.response.data.data.message, "error")
        })
    },
    logoutButton: function () {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('apptoken')
      localStorage.removeItem('signLogin')
      this.signLogin = 'hide'
      swal('Success', 'Log-out', 'success')
      this.$router.push({ name: 'home' })
    }
  },
  mounted: function () {
    this.showBook()
  }
}
</script>
