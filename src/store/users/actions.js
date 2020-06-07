/*
export function someAction (context) {
}
*/
import axios from 'axios';

export function hola(){

    return new Promise( (resolve,reject) => {
        resolve("hola")
        commit('setUserDetails',{})
    })
}

export function getUser({},id){
    return new Promise( (resolve,reject) => {
        axios.get('http://localhost:3001/api/users/'+id)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(user)
        })
    })
}
export function saveUser({commit,dispatch},user){
    
    return new Promise( async (resolve,reject) => {
        // let userExist = this.getUser(user.id);
        let userExist = await dispatch('users/getUser',user.id ,{root:true})
        console.log("EXISTE EL USER??",userExist)

        if (!userExist.data) {
            axios.post('http://localhost:3001/api/users',user)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(user)
            })
        }else{
            await dispatch('users/setOnline',user.id ,{root:true}).then(res =>{
                resolve()
            })
            .catch(err =>{
                reject()
            })
        }
        
    })
    
}

export function setOffline({},id){
    return new Promise( (resolve,reject) => {
        axios.put('http://localhost:3001/api/users/'+id+'/setOffline')
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(user)
        })
    })
}
export function setOnline({},id){
    return new Promise( (resolve,reject) => {
        axios.put('http://localhost:3001/api/users/'+id+'/setOnline')
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(user)
        })
    })
}