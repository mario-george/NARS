import { store} from "@/components/store/store";


const token = store.getState().user.token

export default token;