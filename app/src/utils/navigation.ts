import { ABOUT_ME, HOME, PROFILE_SETUP } from '../routing/routes'
import { User } from '../models/users.model'

export const getNextScreenFromLogin = (user: User) => {
  if (user.contactPreference !== undefined && user.profileType !== undefined) {
    return HOME
  }

  if (user.contactPreference !== undefined) {
    return ABOUT_ME
  }

  return PROFILE_SETUP
}
