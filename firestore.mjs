import CONFIGS from './configs.mjs'
import admin from 'firebase-admin'

class FirestoreService {
  constructor() {
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(CONFIGS.firebase),
          databaseURL: 'https://my-covenant.firebaseio.com',
        })
      }
    } catch (e) {
      console.log(e)
    }
    this.store = admin.firestore()
  }

  async getAnnouncements() {
    try {
      const ref = this.store.collection('tv').doc('announcement')
      const doc = await ref.get()
      return doc.data().announcements
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async getClosetData() {
    try {
      let data = []
      const ref = this.store.collection('closet_temps')
      const snapshot = await ref.orderBy('date', 'desc').limit(168).get()
      snapshot.forEach((doc) => {
        data.push(doc.data())
      })
      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export { FirestoreService }
