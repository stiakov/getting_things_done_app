import '../semantic/dist/semantic';
import '../semantic/dist/semantic.css';
import './css/style.css';
import setup from '../src/js/setup';
import layout from '../src/js/layout';
import trigger from '../src/js/trigger';

setup.setFavicon();
setup.setColumnInit(setup.setProjectInit());

trigger.setEdit();
trigger.setDone();
trigger.setDelete();
