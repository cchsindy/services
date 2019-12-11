import CONFIGS from 'data:application/json,"./configs.json"'
import admin from 'firebase-admin'

class FirestoreService {
  constructor() {
    try {
      admin.initializeApp(CONFIGS.firebase)
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
