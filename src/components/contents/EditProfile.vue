<template>
    <div v-if="user" class="edit-profile container">
        <h2 class="center light-blue-text">Uredi {{user.nickname}} profil</h2>
        <br>
        <form @submit.prevent="saveChanges">
        <br>
        <div v-if="user" class="info">
            <p>Osobni podaci</p>
            <div class="field name">
            <label for="name">Ime:</label>
            <input type="text" name="name" v-model="user.name">
            </div>
            <div class="field lastname">
            <label for="lastname">Prezime:</label>
            <input type="text" name="lastname" v-model="user.lastname">
            </div>
            <div class="field address">
            <label for="address">Adresa:</label>
            <input type="text" name="address" v-model="user.address">
            </div>
            <div class="field phone">
            <label for="phone">Kontakt:</label>
            <input type="text" name="phone" v-model="user.phone">
            </div>
        </div>
        
        <div v-if="user" class="work-info">
            <p>Informacije o poslu</p>
            <div class="field">
            <label for="work">Radno mjesto:</label>
            <input type="text" name="work" v-model="user.work">
            </div>
            <br>
            <label for="workhours">Radno vrijeme:</label>
            <textarea name="workhours" class="workhours" v-model="user.workhours">
            </textarea>
            <button class="btn light-blue" @click="saveChanges()">Spremi promjene</button>
        </div>
    </form>  
</div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'

export default {
    name: 'EditProfile',
    data() {
        return {
            user: null,

        }
    },
    created() {
        let ref = db.collection('users').where('nickname','==', this.$route.params.id)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })
    },
    methods: {
        saveChanges() {
              db.collection('users').doc(this.user.id).update({
                    name: this.user.name,
                    lastname: this.user.lastname,
                    address: this.user.address,
                    phone: this.user.phone,
                    work: this.user.work,
                    workhours: this.user.workhours
              })
              .then(() => {
                this.$router.push({ name: 'HPHome'})
              })
              .catch(err => {
                  console.log(err)
              })
           }
    },
}
</script>

<style scoped>

.edit-profile {
    width: 100%;
    overflow: hidden;
}
.info {
    width: 500px; 
    float: left;
    padding-left: 15px;
}
.work-info {
    max-width: 400px;
    margin-left: 620px;
    padding-left: 5px;
    padding-right: 20px;
}
.workhours {
    width:400px; 
    height:120px;
}
</style>