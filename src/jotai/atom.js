import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'
const storage = {
    user: atomWithStorage("user", null)
};

export default storage