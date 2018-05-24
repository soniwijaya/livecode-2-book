<template>
    <div class="addbook">
        <b-navbar toggleable="md" type="light" variant="light" fixed>
            <b-container class="bv-example-row">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <router-link to="/" ><b-navbar-brand>Buy Book</b-navbar-brand></router-link>
                <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav v-if="signLogin=='show'" class="ml-auto">
                    <b-nav-item ><router-link to="addbook">Add Book</router-link></b-nav-item>
                    <b-nav-item @click="logoutButton">Logout</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-else class="ml-auto">
                    <b-nav-item v-b-modal.login>Login</b-nav-item>
                    <b-nav-item v-b-modal.register>Register</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>

        <b-container class="bv-example-row">
            <br>
            <h4>List Book</h4>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Penulis</th>
                        <th>Penerbit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in listbook" :key="list._id">
                        <td>{{ list.judul }}</td>
                        <td v-html="list.content"></td>
                        <td>{{ list.penulis }}</td>
                        <td>{{ list.penerbit }}</td>
                        <td>
                            <b-button @click="deleteButton(list._id)" variant="danger" size="sm">Delete</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <br>
            <h4>Tambah Book</h4>
            <div class="progress">
                <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="progresbar" aria-valuemin="0" aria-valuemax="100" :style="{width: progresbar + '%'}">
                    {{ progresbar }}%
                </div>
            </div>
            <b-form-group label="Penulis">
                <b-form-input v-model="addbuku.penulis" type="text" placeholder="Input penulis"></b-form-input>
            </b-form-group>
            <b-form-group label="Penerbit">
                <b-form-input v-model="addbuku.penerbit" type="text" placeholder="Input penerbit"></b-form-input>
            </b-form-group>
            <b-form-group label="Judul">
                <b-form-input v-model="addbuku.judul" type="text" placeholder="Input judul"></b-form-input>
            </b-form-group>
            <b-form-group label="Gambar Buku">
                <input type="file" @change="postimageHandler" />
            </b-form-group>
            <editor v-model="addbuku.content" api-key="63vjifsaffdfz1yprll9c495cigwzg7perds1xpz9en3ltqk" :init="{plugins: 'wordcount'}"></editor>
            <br>
            <b-button @click="addButton" variant="success">Tambah Buku</b-button>
        </b-container>

    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'addbook',
    components: {
        'editor': Editor
    },
    data: function () {
        return {
            addbuku: {
                penulis: null,
                penerbit: null,
                judul: null,
                image: null,
                content: null
            },
            listbook: [],
            progresbar: 0,
            signLogin: localStorage.getItem('signLogin'),
        }
    },
    created: function (){
        if(!localStorage.getItem('apptoken')){
            this.$router.push({ name: 'home' })
        }
    },
    methods: {
        showlistBook: function () {
            let id = localStorage.getItem('id')
            let self = this
            axios.get(`http://localhost:3000/books/view/book`,
                {
                    headers: {
                        id
                    }
                }
            )
            .then(response => {
                self.listbook = response.data.data.book
            })
            .catch(function (err) { 
                swal('Your error', err.response.data.message, 'error')
            })
        },
        addButton: function (){
            let apptoken = localStorage.getItem('apptoken')
            let id = localStorage.getItem('id')

            let formData = new FormData()
            formData.append('judul', this.addbuku.judul)
            formData.append('penerbit', this.addbuku.penerbit)
            formData.append('penulis', this.addbuku.penulis)
            formData.append('image', this.addbuku.image)
            formData.append('content', this.addbuku.content)
            let self = this
            axios.post('http://localhost:3000/books', formData, {
                headers: {
                    apptoken,
                    id
                },
                'Content-Type': 'multipart/form-data',
                onUploadProgress: function (progressEvent) {
                    let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    self.progresbar = percent
                },
            })
            .then(response => {
                swal('Congrats', response.data.message,'success')
                self.progresbar = 0
                self.addbuku.judul = ''
                self.addbuku.penerbit = ''
                self.addbuku.penulis = ''
                self.addbuku.content = null
                this.listbook.push(response.data.data)
            })
            .catch(err => {
                swal('Your error', err.response.data.message, 'error')
                self.progresbar = 0
            })
        },
        postimageHandler: function (event) {
            this.addbuku.image = event.target.files[0]
        },
        deleteButton: function (idBooks) {
            let apptoken = localStorage.getItem('apptoken')
            let id = localStorage.getItem('id')
            swal({
                title: "Are you sure?",
                text: "After delete, you can't get this data again!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                axios.delete(`http://localhost:3000/books/${idBooks}`,
                    {
                        headers: {
                            apptoken,
                            id
                        }
                    }
                )
                .then(response => {
                    swal(response.data.message, {
                        icon: "success",
                    })
                    let index = this.listbook.findIndex(data => data._id == response.data.data._id)
                    this.listbook.splice(index, 1)
                })
                .catch(err => {
                    swal("Your error", err.response.data.data.message, "error")
                })
                } else {
                swal("Failed remove")
                }
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
        this.showlistBook()
    }
}
</script>

<style>

</style>
