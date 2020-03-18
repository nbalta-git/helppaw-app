<template>
    <div class="edit-pet">
        <h2 class="center light-blue-text">Uredi ljubimca</h2>
         <br>
        <br>
        <div v-if="userPet" class="pet-info">
            <div class="field name">
            <label for="name">Ime:</label>
            <input type="text" name="name" v-model="userPet.name">
            </div>
            <div class="field breed">
            <label for="breed">Pasmina:</label>
            <input type="text" name="breed" v-model="userPet.breed">
            </div>
            <div class="field sex">
            <label for="sex">Spol:</label>
            <input type="text" name="sex" v-model="userPet.sex">
            </div>
            <div class="field age">
            <label for="age">Starost:</label>
            <input type="text" name="age" v-model="userPet.age">
            </div>
            
        </div>
        <div v-if="userPet" class="add-info">
            <p>Dodatne informacije o ljubimcu:</p>
            
            <textarea name="add-info-text"
                      class="add-info-text" 
                      v-model="userPet.addinfo">
            </textarea>
            <button class="btn light-blue" @click="saveChangesPet()">Spremi promjene</button>
        </div>
    </div>
</template>

<script>
import slugify from 'slugify'
import Signup from '@/components/auth/Signup'
import db from '@/firebase/init'

export default {

    name: 'EditPet',
    components: {Signup},
    data() {
        return {
            userPet: {},
            user: null
        }
    },
    created() {
        let ref = db.collectionGroup("userPet")
            ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.userPet = doc.data()
                this.userPet.id = doc.id
            })
        })
    },
    methods: {
        saveChangesPet() {
                db.collection('users').doc(this.user.id).collection("userPet").add({
                 
                name: this.userPet.name,
                breed: this.userPet.breed,
                sex: this.userPet.sex,
                age: this.userPet.age,
                addinfo: this.userPet.addinfo
            })
            .then(() =>  {
                this.$router.push({ name: 'HPHome' })
            })
            .catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
.edit-pet {
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
    width:400px; 
    height:100px;
}
</style>