import CONFIGS from 'data:application/json,"./configs.json"'
import firebase from 'firebase/app'
import 'firebase/firestore'

class FirestoreService {
  constructor() {
    this.app = firebase.initializeApp(CONFIGS.firebase)
    this.store = this.app.firestore()
    this.store.settings({
      timestampsInSnapshots: true
    })
  }

  getAnnouncements() {
    const ref = this.store.collection('tv').doc('announcement')
    ref.get().then(doc => {
      return doc.data().announcements
    })
  }
}

export { FirestoreService }
