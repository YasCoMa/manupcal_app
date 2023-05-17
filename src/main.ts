import { createApp, markRaw } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import'@/assets/css/style.css'

import {axiosConfig} from './utils/axios'
axiosConfig()

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)
app.use(VueToast, { "position": "top-right", "duration": 4000 });

import 'jquery'
import 'bootstrap'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

app.use(BootstrapVue3)

/*import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
app.component('QuillEditor', QuillEditor)*/

import PrimeVue from 'primevue/config';
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

import Badge from 'primevue/badge';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Breadcrumb from 'primevue/breadcrumb';
import InputSwitch from 'primevue/inputswitch';
import CascadeSelect from 'primevue/cascadeselect';
import Steps from 'primevue/steps';
import Toast from 'primevue/toast';
import SpeedDial from 'primevue/speeddial';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';
import InputMask from 'primevue/inputmask';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import TabMenu from 'primevue/tabmenu';
import Timeline from 'primevue/timeline';
import Checkbox from 'primevue/checkbox';
import Skeleton from 'primevue/skeleton';
import ProgressSpinner from 'primevue/progressspinner';
import PickList from 'primevue/picklist';
import SplitButton from 'primevue/splitbutton';
import AutoComplete from 'primevue/autocomplete';
import ColorPicker from 'primevue/colorpicker';
import Panel from 'primevue/panel';
import Sidebar from 'primevue/sidebar';
import DynamicDialog from 'primevue/dynamicdialog'
import DialogService from 'primevue/dialogservice'
import Chips from 'primevue/chips';
import Chip from 'primevue/chip';
import Ripple from 'primevue/ripple';
import Message from 'primevue/message';
import Paginator from 'primevue/paginator';
import Tooltip from 'primevue/tooltip';
import SelectButton from 'primevue/selectbutton';

app.use(PrimeVue, {
    ripple:true,
    locale: {
         closeText : 'Fechar',
        prevText : 'Anterior',
        nextText : 'Próximo',
        currentText : 'Começo',
        monthNames : [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
        monthNamesShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago','Set', 'Out', 'Nov', 'Des' ],
        dayNames : [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta','Sábado' ],
        dayNamesShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
        dayNamesMin : [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        weekHeader : 'Semana',
        firstDay : 1,
        isRTL : false,
        showMonthAfterYear : false,
        yearSuffix : '',
        timeOnlyTitle : 'Só Horas',
        timeText : 'Tempo',
        hourText : 'Hora',
        minuteText : 'Minuto',
        secondText : 'Segundo',
        ampm : false,
        month : 'Mês',
        week : 'Semana',
        day : 'Dia',
        allDayText : 'Todo Dia',
    }
    

});

app.component('pm-Badge', Badge);
app.component('pm-Button', Button);
app.component('pm-SplitButton', SplitButton);
app.component('pm-DataTable', DataTable);
app.component('pm-Column', Column);
app.component('pm-ColumnGroup', ColumnGroup);
app.component('pm-Row', Row);
app.component('pm-InputText', InputText);
app.component('pm-Card', Card);
app.component('pm-Breadcrumb', Breadcrumb);
app.component('pm-InputSwitch', InputSwitch);
app.component('pm-CascadeSelect', CascadeSelect);
app.component('pm-Steps', Steps);
app.component('pm-Toast', Toast);
app.component('pm-SpeedDial', SpeedDial);
app.component('pm-Toolbar', Toolbar);
app.component('pm-TabView', TabView);
app.component('pm-TabPanel', TabPanel);
app.component('pm-InputNumber', InputNumber);
app.component('pm-Password', Password);
app.component('pm-RadioButton', RadioButton);
app.component('pm-InputMask', InputMask);
app.component('pm-Calendar', Calendar);
app.component('pm-Dropdown', Dropdown);
app.component('pm-Dialog', Dialog);
app.component('pm-ConfirmDialog', ConfirmDialog);
app.component('pm-Accordion', Accordion);
app.component('pm-AccordionTab', AccordionTab);
app.component('pm-FileUpload', FileUpload);
app.component('pm-MultiSelect', MultiSelect);
app.component('pm-Textarea', Textarea);
app.component('pm-Avatar', Avatar);
app.component('pm-Menu', Menu);
app.component('pm-TabMenu', TabMenu);
app.component('pm-Timeline', Timeline);
app.component('pm-Checkbox', Checkbox);
app.component('pm-Skeleton', Skeleton);
app.component('pm-ProgressSpinner', ProgressSpinner);
app.component('pm-PickList', PickList);
app.component('pm-AutoComplete', AutoComplete);
app.component('pm-ColorPicker', ColorPicker);
app.component('pm-Panel', Panel);
app.component('pm-Sidebar', Sidebar);
app.component('pm-DynamicDialog', DynamicDialog);
app.component('pm-Chips',Chips);
app.component('pm-Chip',Chip);
app.component('pm-Message',Message);
app.component('pm-Paginator',Paginator);
app.component('pm-SelectButton',SelectButton);

app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);

import ConfirmationService from 'primevue/confirmationservice';

import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(({ store }) => {
    store.$router = markRaw(router)
});

//var CryptoJS = require("crypto-js");

app.use(pinia).use(router).use(DialogService).use(ConfirmationService).mount('#app')

//createApp(App).use(store).use(router).mount('#app')
