import { setStoItem } from '../utils/storage'
export default {
  setUser(state,data){
    state.user = data
    setStoItem('user',state.user)
  }
}