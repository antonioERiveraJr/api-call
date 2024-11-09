<template>
    <div class="background">
        <h1 class="title">Valorant Agents</h1>
        <div class="agent-grid">
            <router-link v-for="agent in paginatedAgents" :key="agent.uuid"
                :to="{ name: 'AgentDetails', params: { id: agent.uuid } }" class="agent-card">
                <div class="agent-portrait">
                    <img :src="agent.displayIcon" alt="Agent Icon" class="agent-icon" />
                    <img :src="agent.fullPortrait" alt="Agent Portrait" class="agent-portrait-img" />
                    <h3 class="agent-name">{{ agent.displayName }}</h3>

                </div>
            </router-link>
        </div>

        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
            <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
        </div>
    </div>
</template>

<script>
import { fetchAgents } from '../apiService'; 

export default {
    data() {
        return {
            agents: [],
            currentPage: 1,
            agentsPerPage: 6,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.agents.length / this.agentsPerPage);
        },
        paginatedAgents() {
            const start = (this.currentPage - 1) * this.agentsPerPage;
            return this.agents.slice(start, start + this.agentsPerPage);
        },
    },
    mounted() {
        this.loadAgents();
    },
    methods: {
        async loadAgents() {
            try {
                const agentsData = await fetchAgents();
                this.agents = agentsData;
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
};
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
}

.background {
    background-color: #222;
    color: #fff;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 20px;
}

.agent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.agent-card {
    position: relative;
    width: 250px;
    height: 350px;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(51, 51, 51, 0.8);

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s;
}

.agent-card:hover {
    transform: scale(1.05);
}

.agent-portrait {
    position: relative;
    width: 100%;
    height: 100%;
}
.agent-portrait:hover {
    transform: scale(1.08); 
}

.agent-icon {
    width: 100%;
    height: 80px;
    object-fit: cover;
}

.agent-portrait-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    object-fit: cover;
}

.agent-name {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.2em;
    color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1.2em; 
  font-weight: bold; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
}

.pagination-button:disabled {   
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

.pagination-info {
  margin: 0 10px;
  font-size: 1.1em;
  color: #fff;
}
</style>