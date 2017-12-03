
import { AsyncStorage } from 'react-native';

export const DECK_KEY = 'UDACITY:Mobile_flashcards';

export function setUpAsyncStorage () {
    AsyncStorage.setItem(DECK_KEY, {})
}