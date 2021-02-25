import Vue from "vue";
import Antd from "ant-design-vue";
import '@/assets/css/antd-variables.less';
Vue.use(Antd);

Vue.prototype.$message.config({
    maxCount: 1
});
Vue.prototype.$Modal = {};
const types = ["info", "success", "error", "warning", "confirm"];
const dftOption = { centered: true, okText: "确定", cancelText: "取消" };
types.forEach(fn => {
    Vue.prototype.$Modal[fn] = option => {
        return Vue.prototype[`$${fn}`]({ ...dftOption, ...option });
    };
});
