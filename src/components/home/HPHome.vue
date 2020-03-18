<template>
    <div class="hphome" :style="image">
        <strong><h2 class="title center">Helppaw Home</h2></strong>
        <hr>
        <ul class="list"  v-for="user in users" :key="user.id">
            <li><router-link :to="{ name: 'EditProfile', params: {id: user.nickname}}">Uredi profil</router-link></li>
            <li><router-link :to="{ name: 'EditPet', params: {id: user.nickname}}">Uredi ljubimca</router-link></li>
            <li><router-link :to="{ name: 'MyProfile', params: {id: user.nickname}}">Moj profil</router-link></li>
            <li><router-link :to="{ name: 'MyPet', params: {id: user.nickname}}">Moj ljubimac</router-link></li>
        </ul> <br>
     <div class="container">
        <div class="card" v-for="user in users" :key="user.id">
            <div class="card-content">
                <h3 class="light-blue-text">{{user.nickname}}</h3>
                <hr>
                <br>
                <button class="waves-effect waves-light btn grey lighten-1"> 
                <router-link class="link" name="link" :to="{name: 'MyProfile', params: {id: user.nickname}}">    
                     Profil 
                </router-link><br>
                </button><br>
                <br>
                <button class="waves-effect waves-light btn grey lighten-1">
                <router-link class="link" name="link" :to="{name: 'MyPet', params: {id: user.nickname}}">    
                    Ljubimac
                </router-link>
                </button>
            </div>
        </div>
     </div>
</div>
</template>

<script>
import Signup from '@/components/auth/Signup'
import slugify from 'slugify'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'HPHome',
    components: {Signup},
    data() {
        return {
            user: null,
            users: [],
            userPet: {},
            image: { backgroundImage: "url(https://cuddleclones.com/wp-content/uploads/2019/08/LightBlue-Solid-CAT.jpg)" }
        }
    },
        created() {
            db.collection('users').get()
            .then(snapshot => {
             snapshot.forEach(doc =>{
             let user = doc.data()
             user.id = doc.id
             this.users.push(user)
         })
      })
    }
}
</script>

<style scoped>

ul {
  list-style-type: none;
  position: fixed;
  top: 10;
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: darkgray;
}

li {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 16px;
  text-decoration: none;
  border-right: 1px solid #bbb;

}

li :hover {
    color: black;
}

li :last-child {
  border-right: none;
}

.container { 
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}

.btn :hover {
    color: black;
}

</style>