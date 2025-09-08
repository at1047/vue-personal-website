<template>
  <p class="breadcrumb">~ / projects</p>
  
  <div class="projects-container">
    <!-- Section Headers -->
    <div class="section-headers">
      <h2 class="section-title hardware-title">Hardware</h2>
      <h2 class="section-title software-title">Software</h2>
    </div>
    
    <!-- Background Divider -->
    <div class="background-divider"></div>
    
    <!-- All Projects Container -->
    <div class="all-projects">
      <div class="card" style="--bias-left: 0%; --bias-right: 20%;">
        <router-link to="/projects/clarent">
          <div class="menu-item">
            <h3 class="text text-h3">Clarent</h3>
            <div class="right-content">
              <p>A Split, Tented, Columnar, Bistable, Ergonomic Keyboard for Typing & Gaming</p>
              <p>Tech used: fdsa</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 0%; --bias-right: 50%;">
        <router-link to="/projects/tripod">
          <div class="menu-item">
            <h3 class="text text-h3">Tripod</h3>
            <div class="right-content">
              <p>An indestructible tripod for recording volleyball</p>
              <p>Tech used: CAD, FEA</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 60%; --bias-right: 0%;">
        <router-link to="/projects/carwennan">
          <div class="menu-item">
            <h3 class="text text-h3">Carwennan</h3>
            <div class="right-content">
              <p>Software development project</p>
              <p>Tech used: fdsa</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 10%; --bias-right: 10%;">
        <router-link to="/projects/home_automation">
          <div class="menu-item">
            <h3 class="text text-h3">Home Automation</h3>
            <div class="right-content">
              <p>IoT solutions for smart home control and weather monitoring</p>
              <p>Tech used: Go, Arduino, ESP8266, Docker</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <!-- Dynamic Popup Project Cards -->
      <div 
        v-for="project in popupProjects" 
        :key="project.id"
        class="card" 
        :class="project.cardClass"
        :style="`--bias-left: ${project.biasLeft}; --bias-right: ${project.biasRight};`"
      >
        <div class="menu-item" @click="openPopup(project.id)" :class="{ 'long-title-layout': isTitleLong(project.title) }">
          <h3 class="text text-h3">{{ project.title }}</h3>
          <div class="right-content" v-if="!isTitleLong(project.title)">
            <p>{{ project.description }}</p>
            <p>Tech used: {{ project.technologies }}</p>
          </div>
          <div class="below-title-content" v-if="isTitleLong(project.title)">
            <p>{{ project.description }}</p>
            <p>Tech used: {{ project.technologies }}</p>
          </div>
        </div>
      </div>
      
      <!-- <div class="card" style="--bias-left: 50%; --bias-right: 0%;">
        <router-link to="/projects/recipes-api">
          <div class="menu-item">
            <h3 class="text text-h3">Recipes API</h3>
            <p>Backend API in Go</p>
          </div>
        </router-link>
      </div>
      
      <div class="card" style="--bias-left: 70%; --bias-right: 0%;">
        <router-link to="/projects/renju">
          <div class="menu-item">
            <h3 class="text text-h3">Renju Game</h3>
            <p>Multiplayer game</p>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 0%; --bias-right: 20%;">
        <router-link to="/projects/iot-project">
          <div class="menu-item">
            <h3 class="text text-h3">IoT Project</h3>
            <div class="right-content">
              <p>Hardware + Software integration</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 15%; --bias-right: 15%;">
        <router-link to="/projects/embedded-system">
          <div class="menu-item">
            <h3 class="text text-h3">Embedded System</h3>
            <div class="right-content">
              <p>Firmware + Hardware design</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="card cross-card-spanning" style="--bias-left: 10%; --bias-right: 10%;">
        <router-link to="/projects/robotics">
          <div class="menu-item">
            <h3 class="text text-h3">Robotics Platform</h3>
            <div class="right-content">
              <p>Mechanical + Software + Electronics</p>
            </div>
          </div>
        </router-link>
      </div> -->

    </div>
  </div>

  <!-- Project Popup Modal -->
  <div v-if="showPopup" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <div class="popup-header">
        <h2>{{ popupProject.title }}</h2>
        <button class="popup-close" @click="closePopup">&times;</button>
      </div>
      <div class="popup-body">
        <p><strong>Description:</strong> {{ popupProject.description }}</p>
        <p><strong>Technologies:</strong> {{ popupProject.technologies }}</p>
        <!-- <p><strong>Status:</strong> {{ popupProject.status }}</p> -->
        <div v-if="popupProject.details" class="popup-details">
          <h3>Additional Details</h3>
          <div class="popup-details-content" v-html="formatDetails(popupProject.details)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import { defineComponent } from 'vue';
    // import axios from 'axios';
    import { RouterLink, RouterView } from 'vue-router'

    // console.log(import.meta.env)

    export default defineComponent({
        name: 'Projects',
        components: {
        //    RouterView,
            RouterLink,
        },
        data() {
            return {
                showPopup: false,
                popupProject: {
                    title: '',
                    description: '',
                    technologies: '',
                    status: '',
                    details: ''
                },
                // Popup project data - you can expand this for multiple projects
                popupProjects: [
                    {
                         id: 'macropad',
                         title: 'Macropad',
                         description: 'Macropad for Backlight and Home Automation',
                         technologies: 'Arduino C, Networking, CAD, 3D Printing',
                         status: 'Completed',
                         details: `- Based on Arduino, sends Serial communication to another Arduino which has HID support, to imitate keystrokes to send to my computer
- Utilizes key matrix scanning, where 5 GPIO pins control 6 keys, was a prototype for my keyboard where 12 GPIO pins control 32 keys
- Connects to local network to control smart lights around the house via API calls to service on RaspberryPi
- Controls monitor backlight LED strip
[img:macropad_1.png:300]
`,
                         // Card positioning and styling
                         biasLeft: '20%',
                         biasRight: '0%',
                         cardClass: '', // Can be 'cross-card-spanning' for cross-discipline projects
                         category: 'cross' // 'hardware', 'software', or 'cross'
                     },
                     {
                         id: 'civic-si-shift-boot-collar',
                         title: 'Civic SI Shift Boot Collar',
                         description: 'OEM Plus Shift Collar for Civic SI',
                         technologies: 'CAD, 3D Printing',
                         status: 'Completed',
                         details: `The problem:
- Shift boot collar of 2012 Honda Civic SI is extremely fragile (four thin prongs)
- OEM replacement doesn't improve design, so would break again
- Aftermarket shift boot collars don't imitate the design exactly, with the leather fold around the collar

[img:shift_boot_collar_1.png:300]

My solution:
- Design parts out of TPU, taking advantage of increased flexibility to add support to previously fragile parts
- Allows the shift boot collar to be indexed on the nut to keep leather stitching aligned
`,
                         // Card positioning and styling
                         biasLeft: '0%',
                         biasRight: '50%',
                         cardClass: '', // Can be 'cross-card-spanning' for cross-discipline projects
                         category: 'hardware' // 'hardware', 'software', or 'cross'
                     },
                    {
                        id: 'webcam-and-monitor-light-mount',
                        title: 'Webcam and Monitor Light Mount',
                        description: 'Mount for webcam and monitor light',
                        technologies: 'CAD, 3D Printing',
                        status: 'Completed',
                        details: `Need a way to mount webcam and monitor light above monitor. Designed custom mounting bracket.
                        [img:webcam_1.png:300]
                        `,
                        // Card positioning and styling
                        biasLeft: '0%',
                        biasRight: '50%',
                        cardClass: '', // Can be 'cross-card-spanning' for cross-discipline projects
                        category: 'hardware' // 'hardware', 'software', or 'cross'
                    },
                    {
                        id: 'csv-to-table-converter',
                        title: 'CSV to Table Converter',
                        description: 'Webapp to convert CSVs to HTML tables',
                        technologies: 'Javascript, Regex',
                        status: 'Completed',
                        details: 'Needed a way to process CSVs quickly while iterating on the CSV generator itself. Need the ability to set custom delimiters dynamically.Uses javascript and regex to convert CSVs to HTML tables with custom pattern matching.',
                        // Card positioning and styling
                        biasLeft: '50%',
                        biasRight: '0%',
                        cardClass: '', // Can be 'cross-card-spanning' for cross-discipline projects
                        category: 'software' // 'hardware', 'software', or 'cross'
                    },
                    {
                        id: 'sql-analyser',
                        title: 'SQL Analyser',
                        description: 'Parses output from SSMS about physical and logical IO activity',
                        technologies: 'Javascript, SQL, Cursor AI',
                        status: 'Completed',
                        details: 'Needed a way to aggregate physical and logical IO activity from SSMS output to identify places for optimization. Used Cursor AI to create parser that aggregates statistics for each table',
                        biasLeft: '50%',
                        biasRight: '0%',
                        cardClass: '',
                        category: 'software'
                    },
                    {
                        id: '',
                        title: 'Grass Scoreboard',
                        description: 'Scoreboard specifically for outdoor volleyball',
                        technologies: 'Javascript',
                        status: 'Completed',
                        details: 'Mobile friendly scoreboard webapp that has a reminder to switch sides for outdoor volleyball, as well as the ability to switch the scores between sides',
                        biasLeft: '50%',
                        biasRight: '0%',
                        cardClass: '',
                        category: 'software'
                    }
                ]
            };
        },
        methods: {
            openPopup(projectId) {
                const project = this.popupProjects.find(p => p.id === projectId);
                if (project) {
                    this.popupProject = {
                        title: project.title,
                        description: project.description,
                        technologies: project.technologies,
                        status: project.status,
                        details: project.details
                    };
                    this.showPopup = true;
                }
            },
            closePopup() {
                this.showPopup = false;
            },
            isTitleLong(title) {
                // Consider title long if it's more than 20 characters
                return title && title.length > 20;
            },
            formatDetails(details) {
                if (!details) return '';
                
                // Convert line breaks to <br> tags and handle bullet points
                let formatted = details
                    .replace(/\n\n/g, '</p><p>') // Double line breaks = new paragraphs
                    .replace(/\n/g, '<br>')      // Single line breaks = line breaks
                    .replace(/• /g, '&bull; ')   // Convert bullet points to HTML entities
                    .replace(/^/, '<p>')         // Start with opening paragraph tag
                    .replace(/$/, '</p>');       // End with closing paragraph tag
                
                // Handle image tags - convert [img:filename] or [img:filename:height] to proper img tags
                formatted = formatted.replace(/\[img:([^:\]]+)(?::(\d+))?\]/g, (match, filename, height) => {
                    const heightStyle = height ? `style="height: ${height}px;"` : '';
                    return `<div class="popup-image-container"><img src="/${filename}" alt="Project image" class="popup-image" ${heightStyle} /></div>`;
                });
                
                return formatted;
            }
        },
        // async created() {
        //     try {
        //         this.projects = await axios.get("//" + import.meta.env.VITE_API
        //             + "/projects")
        //             .then((res) => res.data)
        //     } catch(e) {
        //         console.error(e);
        //     };
        //     this.loading = false
        // },
    });
</script>


<style scope>
/*
.menu-item:hover {
  opacity: 0.3 ;
}
*/

.menu-item {
background-color: var(--color-menu-item);
border-radius: 5px;
margin-top: 0;
padding: 15px 10px;
transition: background-color 100ms ease-out;
display: flex;
align-items: flex-start;
justify-content: space-between;
min-height: 40px;
}

.menu-item:hover {
background-color: var(--color-menu-item-hover);
}

.projects-container {
  position: relative;
  margin-bottom: 60px;
}

.section-headers {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 3;
  gap: 50%;
}

.background-divider {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%,
    var(--color-gradient-start) 10%,
    var(--color-gradient-purple-start) 90%,
    transparent 100%
  );
  z-index: 1;
}

.all-projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 32px;
  margin: 0;
  text-align: center;
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.hardware-title {
  color: var(--color-gradient-start);
}

.software-title {
  color: var(--color-gradient-purple-start);
}

.cross-title {
  color: var(--color-gradient-pink-start);
}

/* Flexible Bias System using CSS Custom Properties */
.card {
  margin-left: var(--bias-left, 0%);
  margin-right: var(--bias-right, 0%);
  position: relative;
}

/* Border indicators based on bias direction with fade effect */
.card[style*="--bias-left: 0%"] {
  position: relative;
}

.card[style*="--bias-left: 0%"]::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent 0%,
    var(--color-gradient-start) 20%,
    var(--color-gradient-start) 80%,
    transparent 100%
  );
  z-index: 1;
}

.card[style*="--bias-right: 0%"] {
  position: relative;
}

.card[style*="--bias-right: 0%"]::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent 0%,
    var(--color-gradient-purple-start) 20%,
    var(--color-gradient-purple-start) 80%,
    transparent 100%
  );
  z-index: 1;
}

/* Cross-discipline projects get both borders with fade */
.cross-card-spanning {
  position: relative;
}

.cross-card-spanning::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%,
    var(--color-gradient-start) 20%,
    var(--color-gradient-start) 80%,
    transparent 100%
  );
  z-index: 1;
}

.cross-card-spanning::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%,
    var(--color-gradient-purple-start) 20%,
    var(--color-gradient-purple-start) 80%,
    transparent 100%
  );
  z-index: 1;
}

.card {
  border-radius: 0px;
  padding: .5rem;
}

/* Removed card-img styling since images are no longer used */

.breadcrumb {
    font-size: 16px;
}

h2 {
  font-size: 60px;
  margin-bottom: 3px;
}

.text-h3 {
  font-size: 20px;
  color: var(--color-text-tertiary);
  margin: 0;
  font-weight: 600;
}

h4 {
  font-size: 16px;
}

.menu-item .right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  flex: 1;
  margin-left: 20px;
}

.menu-item .right-content p {
  font-size: 14px;
  color: var(--color-text-light-gray);
  margin: 0;
  line-height: 1.3;
}

.menu-item .right-content p:first-child {
  margin-bottom: 4px;
}

/* Long title layout - description below title */
.menu-item.long-title-layout {
  flex-direction: column;
  align-items: flex-start;
}

.menu-item.long-title-layout h3 {
  margin-bottom: 8px;
  width: 100%;
}

.below-title-content {
  width: 100%;
}

.below-title-content p {
  font-size: 14px;
  color: var(--color-text-light-gray);
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.below-title-content p:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-headers {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .background-divider {
    display: none;
  }
  
  .card {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* Show borders based on original bias direction with fade on mobile */
  .card[style*="--bias-left: 0%"] {
    border-right: none;
  }
  
  .card[style*="--bias-right: 0%"] {
    border-left: none;
  }
}

@media (max-width: 500px) {
  .projects-container {
    gap: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .project-cards {
    gap: 15px;
  }
}

/* Popup Modal Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.popup-content {
  background-color: var(--color-card-background);
  border-radius: 10px;
  padding: 0;
  width: 80%;
  height: 80%;
  max-width: none;
  max-height: none;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-background-light);
}

/* Dark mode shadow - lighter shadow for dark backgrounds */
.dark-mode .popup-content {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid var(--color-background-light);
  background-color: var(--color-menu-item);
  border-radius: 10px 10px 0 0;
}

.popup-header h2 {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: 24px;
  font-weight: 600;
}

.popup-close {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.popup-close:hover {
  background-color: var(--color-menu-item-hover);
}

.popup-body {
  padding: 25px;
}

.popup-body p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: var(--color-text);
}

.popup-body strong {
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.popup-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-background-light);
}

.popup-details h3 {
  margin: 0 0 10px 0;
  color: var(--color-text-tertiary);
  font-size: 18px;
  font-weight: 600;
}

.popup-details-content {
  line-height: 1.6;
}

.popup-details-content p {
  margin: 0 0 15px 0;
  color: var(--color-text);
}

.popup-details-content p:last-child {
  margin-bottom: 0;
}

.popup-image-container {
  margin: 15px 0;
  text-align: center;
}

.popup-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-background-light);
  object-fit: contain;
}

/* Fixed height images */
.popup-image[style*="height:"] {
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.dark-mode .popup-image {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

/* Responsive popup */
@media (max-width: 768px) {
  .popup-content {
    width: 95%;
    height: 90%;
    margin: 20px;
  }
  
  .popup-header {
    padding: 15px 20px;
  }
  
  .popup-header h2 {
    font-size: 20px;
  }
  
  .popup-body {
    padding: 20px;
  }
}

</style>
