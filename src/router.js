import { createRouter, createWebHistory } from 'vue-router';
import AgentList from './components/AgentList.vue';
import AgentDetails from './components/AgentDetails.vue';

const routes = [
  {
    path: '/',
    name: 'AgentList',
    component: AgentList,
  },
  {
    path: '/agent/:id',
    name: 'AgentDetails',
    component: AgentDetails,
    props: true,  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;