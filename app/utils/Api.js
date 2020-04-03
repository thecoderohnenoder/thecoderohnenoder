import * as firebase from 'firebase'

export const reauthenticate = (password)=>{
    const user =firebase.auth().currentUser
    const credendtials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    )
    return user.reauthenticateWithCredential(credendtials)
}