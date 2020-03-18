<template>
    <div v-if="userPet" class="mypet">
        <h2 v-if="userPet" class="center light-blue-text">{{userPet.name}}s profile</h2>
         <br>

        <br>
        <div v-if="userPet" class="card">
            <div v-if="userPet" class="card-content">
                <span><b>Ime : </b></span>
                <span>{{userPet.name}}</span>
                <br>
                <span><b>Pasmina : </b></span>
                <span>{{userPet.breed}}</span>
                <br>
                <span><b>Spol : </b></span>
                <span>{{userPet.sex}}</span>
                <br>
                <span><b>Starost : </b></span>
                <span>{{userPet.age}}</span>
                <br>
                <span><b>Dodatne informacije : </b></span>
                <span>{{userPet.addinfo}}</span>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Signup from '@/components/auth/Signup'
import db from '@/firebase/init'

export default {
    name: 'MyPet',
    components: {Signup},
    data() {
        return {
            userPet: {},
            
        }
    },
    methods: {  
    },

    created(){
            let ref = db.collectionGroup("userPet")
            ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.userPet = doc.data()
                this.userPet.id = doc.id
            })
        })
      }
}
</script>

<style scoped>
.mypet {
    width: 100%;
    overflow: hidden;
}
.pet-info {
    width: 500px; 
    float: left;
    margin-top: 60px;
    padding-left: 15px;
}
.add-info {
    max-width: 500px;
    margin-top: 60px;
    margin-left: 620px;
    padding-left: 10px;
}
.add-info-text {
    width:300px; 
    height:250px;
}
</style>