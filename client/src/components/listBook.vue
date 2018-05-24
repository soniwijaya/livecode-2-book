<template>
        <b-col cols="3">
            <b-card :title=viewlist.judul
                :img-src=viewlist.image
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
            <p class="card-text">
            Penerbit: {{ viewlist.penerbit }} 
            <br>
            Penulis: {{ viewlist.penulis }}
            <br>
            Post by: {{ viewlist.user.fullname }}
            </p>
            <router-link :to="{ name: 'detailbook', params: { id: viewlist._id }}"> <b-button variant="primary">Detail</b-button></router-link>
            </b-card>
         </b-col>
</template>

<script>
export default {
    name: 'listbook',
    props: ['viewlist']
}
</script>

<style>

</style>
