import admin from 'firebase-admin'
import functions from 'firebase-functions'

class FirestoreService {
  constructor() {
    this.app = admin.initializeApp(functions.config().firebase)
    this.store = admin.firestore()
    // this.store.settings({
    //   timestampsInSnapshots: true
    // })
  }

  async getAnnouncements() {
    const ref = this.store.collection('tv').doc('announcement')
    ref.get().then(doc => {
      return doc.data().announcements
    })
  }
}

export { FirestoreService }
