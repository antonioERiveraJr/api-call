<template>
    <div v-if="agent" class="background">
        <div class="back-button-container">
            <button @click="goBack" class="nav-button back-button">
                &#8592; <!-- Back arrow -->
            </button>
        </div>
        <div class="agent-container">
            <button @click="prevAgent" class="nav-button" :disabled="isFirstAgent">
                &#9664; <!-- Left arrow -->
            </button>
            <img :src="agent.fullPortrait" alt="Full Portrait" class="full-portrait" />
            <h2 class="agent-name">{{ agent.displayName }}</h2> <!-- Moved here -->
            <div class="agent-details">
                <p>{{ agent.description }}</p>
                <h3>Abilities:</h3>
                <ul class="ability-list">
                    <li v-for="ability in agent.abilities" :key="ability.slot">
                        <img 
                            :src="ability.displayIcon" 
                            alt="Ability Icon" 
                            class="ability-icon" 
                            @click="showAbilityDetails(ability)" 
                        />
                    </li>
                </ul>
                <div v-if="selectedAbility">
                    <h4>{{ selectedAbility.displayName }}</h4>
                    <p>{{ selectedAbility.description }}</p>
                </div>
            </div>
            <button @click="nextAgent" class="nav-button" :disabled="isLastAgent">
                &#9654; <!-- Right arrow -->
            </button>
        </div>
    </div>
</template>

<script>
import { fetchAgents } from '../apiService'; 

export default {
    data() {
        return {
            agent: null,
            agents: [], 
            selectedAbility: null, 
        };
    },
    computed: {
        isFirstAgent() {
            return this.agents.indexOf(this.agent) === 0;
        },
        isLastAgent() {
            return this.agents.indexOf(this.agent) === this.agents.length - 1;
        },
    },
    async mounted() {
        await this.loadAgents();
        this.findAgent();
    },
    methods: {
        async loadAgents() {
            this.agents = await fetchAgents(); 
        },
        findAgent() {
            const agentId = this.$route.params.id;
            this.agent = this.agents.find(agent => agent.uuid === agentId); 
        },
        nextAgent() {
            const currentIndex = this.agents.indexOf(this.agent);
            if (currentIndex < this.agents.length - 1) {
                this.agent = this.agents[currentIndex + 1];
                this.$router.push({ name: 'AgentDetails', params: { id: this.agent.uuid } });
            }
        },
        prevAgent() {
 const currentIndex = this.agents.indexOf(this.agent);
            if (currentIndex > 0) {
                this.agent = this.agents[currentIndex - 1];
                this.$router.push({ name: 'AgentDetails', params: { id: this.agent.uuid } });
            }
        },
        showAbilityDetails(ability) {
            this.selectedAbility = ability;
        },
        goBack() {
            this.$router.push({ name: 'AgentList' }); 

        },
    },
};
</script>
<style>
html, body {
    margin: 0; 
    padding: 0; 
    height: 100%; 
}

.background {
    background-image: url('@/assets/valorantBackground.png'); 
    background-size: cover; 
    background-position: center; 
    height: 100vh; 
    color: rgb(243, 237, 237); 
    font-size: large; 
}

.full-portrait {
    width: 50.25%; 
    border-radius: 12px;
    margin-right: 0px; 
    transition: transform 0.3s ease; 

}

.full-portrait:hover {
    transform: scale(1.05); 
}

.ability-icon {
    width: 40px; 
    height: 40px; 
    margin-left: 10px; 
    cursor: pointer; 
    transition: transform 0.3s ease; 
}

.ability-icon:hover{
    transform: scale(1.2); 
}

.back-button-container {
    position: absolute; 
    top: 20px; 
    left: 20px; 
    z-index: 10; 
}

.back-button {
    background-color: rgba(0, 123, 255, 0.7); 
    color: white; 
    border: none; 
    border-radius: 5px; 
    padding: 10px 15px; 
    font-size: 18px; 
    cursor: pointer; 
    transition: background-color 0.3s, transform 0.3s; 
}

.back-button:hover {
    background-color: rgba(0, 123, 255, 1); 
    transform: scale(1.1); 
}

.navigation {
    display: flex;
    align-items: center; 
    justify-content: center; 
    margin-bottom: 20px;
}

.nav-button {
    background: none;
    border: none;
    font-size: 24px; 
    cursor: pointer;
    transition: transform 0.3s, color 0.3s;
    color: #007bff; 
    margin: 0 10px; 
    padding: 10px; 
}

.nav-button:hover {
    transform: scale(1.2); 
    color: #0056b3; 
}

.nav-button:disabled {
    color: #ccc; 
    cursor: not-allowed; 
}

.agent-container {
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden; 
}
.agent-name {
    font-size: 2.5rem; 
    font-weight: bold; 
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
    color: #ffcc00; 
    letter-spacing: 1px; 
    text-align: center; 
    margin: 20px 0; 
    font-family: 'Cursive', sans-serif; 
}
.agent-details {
    width: 68.75%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5)); 
    border-radius: 12px; 
    padding: 20px; 
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(10px); 
}

.ability-list {
    display: flex; 
    list-style-type: none; 
    padding : 0; 
}
</style>