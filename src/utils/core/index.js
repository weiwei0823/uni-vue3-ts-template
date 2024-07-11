import coreWeb from "./web/index"

export default {


    init(){
        //#ifdef H5
            coreWeb.init();
        //#endif
    },

    updateDomAfterConfigFresh(){
        //#ifdef H5
            coreWeb.updateDomAfterConfigFresh();
        //#endif
    }



}