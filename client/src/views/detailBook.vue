<template>
    <div class="detailbook">
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
            <h4>Detail Book</h4>
            <br>
            <b-row>
                <b-col col sm="3">
                    <img :src="listDetail.image" alt="done" />
                </b-col>
                <b-col col sm="7">
                    <h5><b>Judul buku</b> : {{ listDetail.judul }}</h5>
                    <br>
                    <h6>Penerbit buku : {{ listDetail.penerbit }}</h6>
                    <h6>Penulis buku : {{ listDetail.penulis }}</h6>
                    <br>
                    <b>Deskripsi buku</b> : <p v-html="listDetail.content"></p>
                </b-col>
            </b-row>
            <br>
            <br>
            <hr>
            <h4>Ulasan Anda</h4>
            <editor api-key="63vjifsaffdfz1yprll9c495cigwzg7perds1xpz9en3ltqk" :init="{plugins: 'wordcount'}"></editor>
            <hr>
            <b-button variant="success">Tambah Ulasan</b-button>

        </b-container>

    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'detailbook',
    components: {
         'editor': Editor
    },
    data: function () {
        return {
            idBook: this.$route.params.id,
            listDetail: [],
            signLogin: localStorage.getItem('signLogin'),
        }
    },
    methods : {
        showDetail: function () {
            let self = this
            axios.get(`http://apilivecodedua.thismylife.net/books/${this.idBook}`)
            .then(response => {
                self.listDetail = response.data.data
            })
            .catch(function (err) { 
                swal('Your error', err.response.data.message, 'error')
            })
        },
    },
    mounted: function () {
        this.showDetail()
    }
}
</script>

<style>

</style>
