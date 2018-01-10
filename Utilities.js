export default class Utilities {
    /**
     * Will format the scan date to 'XX/XX/XXXX' and return it as a string.
     */
    static getCurrentFormattedDate = () => {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1 // January is 0
        const yyyy = today.getFullYear()

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        } 

        return mm + '/' + dd + '/' + yyyy
    }
}