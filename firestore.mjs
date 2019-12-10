import admin from 'firebase-admin'
import functions from 'firebase-functions'

class FirestoreService {
  constructor() {
    try {
      admin.initializeApp(functions.config().firebase)
    } catch (err) {
      console.log(err)
    }
    this.store = admin.firestore()
  }

  async getAnnouncements() {
    const ref = this.store.collection('tv').doc('announcement')
    ref.get().then(doc => {
      return doc.data().announcements
    })
  }
}

export { FirestoreService }
