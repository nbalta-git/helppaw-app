<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
        <h2 class="center light-blue-text">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div class="field">
        <label for="nickname">Nickname</label>
        <input id="nickname" type="text" v-model="nickname">
      </div>
        <div class="field">
            <button class="btn light-blue">
                Signup
            </button>
        </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import slugify from 'slugify'
import db from '@/firebase/init'
export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            feedback: null,
            nickname: null,
            slug: null,
            
        }
    },
    methods: {
        signup() {
            if(this.nickname && this.email && this.password) {
                this.feedback = null
                this.slug = slugify(this.nickname, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                    this.feedback = 'This nickname already exists'
                } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    ref.set({
                        nickname: this.nickname,
                        user_id: cred.user.uid,
                        name: null,
                        lastname: null,
                        address: null,
                        phone: null,
                        work: null,
                        workhours: null
                    })
                    this.$router.push({ name: 'HPHome'})
                })
                //.then(() => { 
                 //this.$router.push({name: 'EditProfile'})
                //})
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message 
                    })
                }
            })
            } else {
                this.feedback = 'You must enter a valid email and password'
            }
        }
    }
}
</script>

<style scoped>

.signup {
    max-width: 400px;
    margin-top: 60px;
}
.signup h2 {
    font-size: 2.5em;
}
.signup .field {
    margin-bottom: 15px;
}
</style>