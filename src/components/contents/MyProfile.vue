<template>
    <div v-if="user" class="myprofile container">
        <h2 v-if="user" class="center light-blue-text">{{user.name}}s profile</h2>
        <br>
        <br>
        <div v-if="user" class="card">
            <div v-if="user" class="card-content">
                <span><b>Ime : </b></span>
                <span>{{user.name}}</span>
                <br>
                <span><b>Prezime : </b></span>
                <span>{{user.lastname}}</span>
                <br>
                <span><b>Adresa : </b></span>
                <span>{{user.address}}</span>
                <br>
                <span><b>Kontakt : </b></span>
                <span>{{user.phone}}</span>
                <br>
                <span><b>Radno mjesto : </b></span>
                <span>{{user.work}}</span>
                <br>
                <span><b>Radno vrijeme : </b></span>
                <span>{{user.workhours}}</span>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'MyProfile',
    data() {
        return {
        user: null
        }
    },
    methods: {
        
    },
    
     created(){
            let ref = db.collection('users').where('nickname','==', this.$route.params.id)
            ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })
      }
}
</script>

<style scoped>

.myprofile {
    width: 100%;
    overflow: hidden;
}
.info {
    width: 500px; 
    float: left;
    padding-left: 15px;
}
.work-info {
    max-width: 500px;
    margin-left: 620px;
    padding-left: 5px;
    padding-right: 20px;
}
.workhours {
    width:400px; 
    height:120px;
}
</style>