export default function (state=null, action) {
    switch(action.type) {
        case "SELECT_PRODUCT":
            return action.payload;
        break;
    }
    return state;
}