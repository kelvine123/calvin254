// State management
let formData = {
  clientName: "",
  clientAddress: "",
  projectLocation: "",
  projectCoordinator: "",
  contractorName: "",
  contractorAddress: "",
  drillingLicense: "",
  drillingPermit: "",
  wrmaPermit: "",
  wrmaLicense: "",
  environmentalImpact: "",
  waterAllocation: "",
  wrmaCompliance: "",
 introductionText: "",
  projectScope: "",
 drillingProcess: "",
  boreholeCoordinates: "",
  groundElevation: "",
  totalDepth: "",
  drillingMethod: "",
  drillingStart: "",
  drillingEnd: "",
  casingInstallationDesc: "",
gravelPackDesc: "",
boreholeCleaning: "",
testPumping: "",
 // Borehole Parameters (3.0)
purposeScope: "",
aquiferAnalysis: "",
aquiferTestDetails: "",
recoveryMonitoring: "",
analysisObjectives: "",
// Aquifer Test Analysis Table
aquiferBoreholeDepth: "",
aquiferPumpType: "",
aquiferPumpSetting: "",
aquiferStaticLevel: "",
aquiferPumpingLevel: "",
aquiferDischarge: "",
aquiferCumulativeDrawdown: "",
aquiferResidualDrawdown: "",
aquiferCumulativePercent: "",
aquiferRechargeDuration: "",
aquiferTestDuration: "",
aquiferTestDate: "",
  staticWaterLevel: "",
  dynamicWaterLevel: "",
  drawdown: "",
  yield: "",
  specificCapacity: "",
  pumpingTestDuration: "",
  // Calculations Section
transmissivityIntro: "",
transmissivityFormula: "",
transmissivityConclusion: "",
specificCapacityIntro: "",
specificCapacityFormula: "",
specificCapacityConclusion: "",
pumpSafeIntro: "",
pumpSafeFormula: "",
pumpSafeConclusion: "",
  recommendations: "",
  conclusions: "",
  preparedBy: "",
  reportDate: "",
  // Pumping Test Header Data
boreholeNo: "",
datumLevel: "",
pumpClientName: "",
pumpLevel: "",
pumpLocation: "",
pumpTypeTest: "",
staticLevelTest: "",
pipeTypeSize: "",
pumpingLevelTest: "",
powerSource: "",
totalDrawdownTest: "",
waterColumn: "",
boreholeDepthTest: "",
// Recovery Test Header Data
recoveryBoreholeNo: "",
recoveryDatumLevel: "",
recoveryClientName: "",
recoveryPumpLevel: "",
recoveryLocation: "",
recoveryPumpType: "",
recoveryStaticLevel: "",
recoveryPipeType: "",
recoveryPumpingLevel: "",
recoveryPowerSource: "",
recoveryTotalDrawdown: "",
recoveryWaterColumn: "",
recoveryBoreholeDepth: "",
recoveryAnalysis: "",
 // WRMA Fields
  wrmaApplicantName: "",
  wrmaCategory: "",
  wrmaIdNumber: "",
  wrmaPinNumber: "",
  wrmaPhysicalAddress: "",
  wrmaLrNumber: "",
  wrmaVillageWard: "",
  wrmaSubLocation: "",
  wrmaLocation: "",
  wrmaDivision: "",
  wrmaDistrict: "",
  wrmaContractorName: "",
  wrmaLicenseNumber: "",
  wrmaGazettedDate: "",
  wrmaDrillingSupervisor: "",
  wrmaDrillRigType: "",
  wrmaBoreholeType: "",
  wrmaWaterUse: "",
  wrmaDrillingStart: "",
  wrmaDrillingEnd: "",
  wrmaTotalDepth: "",
  wrmaHoleDiameter1: "",
  wrmaHoleFrom1: "",
  wrmaHoleTo1: "",
  wrmaHoleDiameter2: "",
  wrmaHoleFrom2: "",
  wrmaHoleTo2: "",
  wrmaScreenOpenings: "",
  wrmaGravelSize: "",
  wrmaGravelRoundness: "",
  wrmaGravelVolume: "",
  wrmaGravelFrom: "",
  wrmaGravelTo: "",
  wrmaFirstWaterStruck: "",
  wrmaMainAquiferStruck: "",
  wrmaWaterBearingMaterial: "",
  wrmaAquiferFrom: "",
  wrmaAquiferTo: "",
  wrmaSwl: "",
  wrmaPwl: "",
  wrmaDischarge: "",
  wrmaPumpingHours: "",
  wrmaRecoveryTime: "",
  wrmaExpectedDischarge: "",
  wrmaPumpSetting: "",
  wrmaSampleCollected: "",
  wrmaSampleTime: "",
  wrmaSampleDate: "",
  wrmaSediment: "",
  wrmaTaste: "",
  wrmaOdour: "",
  wrmaRemarks: "",
  wrmaDrillingSupervisorSignature: "",
  wrmaDrillingSupervisorName: "",
  wrmaDrillingSupervisorDate: "",
  wrmaContractorSignature: "",
  wrmaContractorName: "",
  wrmaContractorDate: "",
  //maps fields
  nearestTownName: "",
  nearestTownLatitude: "",
  nearestTownLongitude: "",
  boreholeLatitude: "",
  boreholeLongitude: "",
};


let casings = [];
let pumpingTestData = [];
let recoveryData = [];
let reportGenerated = false;
let pumpingTestChart = null;
let recoveryDataChart = null;
let reportPumpingTestChart = null;
let reportRecoveryDataChart = null;
let wrmaPlainCasing = [];
let wrmaSlottedCasing = [];
let reportData = {};
// API and Authentication
const API_BASE_URL = "https://app.bookerinvestment.org";
let authToken = localStorage.getItem("authToken");
let currentUser = null;
let currentReportId = localStorage.getItem("currentReportId");

// DOM elements
let activeTab = "client";

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  addInitialCasingRow();
  addInitialPumpingTestRow();
  addInitialRecoveryDataRow();
   initializeWrmaTables();

  // Set default report date to today
  document.getElementById("report-date").value = new Date()
    .toISOString()
    .split("T")[0];
// Prefill introduction sections
prefillIntroductionSections();
// Prefill borehole sections
prefillBoreholeSections();
// Prefill borehole parameters sections
prefillBoreholeParameters();
// Prefill calculations sections
prefillCalculations();
  // Current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => menu.classList.toggle("show"));

    // Close mobile menu after clicking a link (optional)
    [...menu.querySelectorAll("a")].forEach((a) =>
      a.addEventListener("click", () => {
        if (menu.classList.contains("show")) menu.classList.remove("show");
      })
    );
  }

  // Check authentication status on load
  checkAuthStatus();
});
// Prefill introduction sections with default content
function prefillIntroductionSections() {
  // Introduction text
  const introText = `This report presents the findings of borehole drilling works for [Client Name]'s borehole located in [Location] in [Sub-County], [County]. The project is aimed at supplying water for community use within by the client.`;
  document.getElementById("introduction-text").value = introText;
  formData.introductionText = introText;

  // Scope of the project
  const scopeText = `The works carried out in this project include:
- Hydrogeological Survey and Reporting
- Application and Processing of Water Resources Authority (WRA) Drilling Permit
- National Environment Management Authority's (NEMA) Environmental Audit and Impact Assessment (E.A.I.A.) and Reporting
- NEMA Authorization License
- Borehole drilling
- Installation of casing and gravel pack
- Borehole Cleaning (Development)
- Test-Pumping
- Water sampling and analysis
- Preparation of Borehole completion report
- Construction of Pad/Apron
- Installation of Hand Pump (Afridev or equivalent)`;
  document.getElementById("project-scope").value = scopeText;
  formData.projectScope = scopeText;

  // Drilling Process and Activities
  const drillingProcessText = `Mobilization to the site was done on [Date]. Borehole drilling commenced on the following day in the presence of the contractor's, the client's and community's representative. A [Diameter]mm diameter borehole was drilled using rotary drilling.

Geological logging was done during drilling after every 2 meters and a lithological description of the encountered strata was done to the bottom of the borehole by the supervising hydrogeologist.

The drilling was completed on [Date] at a terminal depth of [Depth] bgl.`;
  document.getElementById("drilling-process").value = drillingProcessText;
  formData.drillingProcess = drillingProcessText;
}
// Prefill borehole sections with default content
function prefillBoreholeSections() {
  // 2.1 Casing Installation Description
  const casingDesc = `An 8" borehole was successfully drilled to 60m bgl and 160mm outer diameter uPVC casings installed to the final depth. The casings were both blind and slotted depending on the aquifer zones before being installed as detailed in the table 1 below.`;
  document.getElementById("casing-installation-desc").value = casingDesc;
  formData.casingInstallationDesc = casingDesc;

  // Gravel Pack Description
  const gravelDesc = `The 44mm annular space between the borehole wall and the casings was filled by select grade 2-4mm quartz gravel, which acts as filters. The gravel covers the entire space from 0 m to 60m.`;
  document.getElementById("gravel-pack-desc").value = gravelDesc;
  formData.gravelPackDesc = gravelDesc;

  // 2.2 Borehole Cleaning/Development
  const cleaningDesc = `Development was done on 4th July, 2025 using air lifting and air jetting methods prior to test pumping. This was done for 2 hours.`;
  document.getElementById("borehole-cleaning").value = cleaningDesc;
  formData.boreholeCleaning = cleaningDesc;

  // 2.3 Test-Pumping
  const testPumpingDesc = `The borehole was test pumped constantly for 24-hours in order to characterize and define the optimal pumping capacity of the borehole. This was done between 13th and 14th July, 2025.`;
  document.getElementById("test-pumping").value = testPumpingDesc;
  formData.testPumping = testPumpingDesc;
}
// Prefill borehole parameters with default content
function prefillBoreholeParameters() {
  // 3.1 Purpose and Scope
  const purposeScope = `This report documents the test pumping data for [Client Name]'s borehole facility, analyzed to determine the hydraulic parameters, identify the distribution of hydraulic characteristics and to categorize the potential of aquifers within the area of study for hydrogeological mapping and planned groundwater modeling.`;
  document.getElementById("purpose-scope").value = purposeScope;
  formData.purposeScope = purposeScope;

  // Aquifer Analysis
  const aquiferAnalysis = `The aquifer test consisted of pumping groundwater, performed during the period 13th and 14th July, 2025 to a final test rate of 4.0m³/hr.`;
  document.getElementById("aquifer-analysis").value = aquiferAnalysis;
  formData.aquiferAnalysis = aquiferAnalysis;

  // Aquifer Test Details - removed as it's redundant with above

  // Recovery Monitoring
  const recoveryMonitoring = `Upon completion of the pumping phase of the aquifer test, the recovery of groundwater levels was also monitored. In addition to groundwater level monitoring, groundwater sample was collected and analyzed for water-quality parameters.`;
  document.getElementById("recovery-monitoring").value = recoveryMonitoring;
  formData.recoveryMonitoring = recoveryMonitoring;

  // Main Objectives
  const objectives = `The main objectives of the analysis can be summarized as follows:
1) To determine hydraulic parameters such as specific capacity, transmissivity, permeability and the yield of borehole.
2) To identify the distribution of hydraulic characteristics of aquifers and aquitards in the study area.
3) To provide important input for the hydrogeological modelling of the groundwater systems & the determination of their potential & sustainable yields.
4) To identify additional hydraulic information required.`;
  document.getElementById("analysis-objectives").value = objectives;
  formData.analysisObjectives = objectives;

  // Prefill Aquifer Test Analysis Table
  document.getElementById("aquifer-borehole-depth").value = "60m";
  formData.aquiferBoreholeDepth = "60m";

  document.getElementById("aquifer-pump-type").value = "DSD3-18 GENSET-20KVA";
  formData.aquiferPumpType = "DSD3-18 GENSET-20KVA";

  document.getElementById("aquifer-pump-setting").value = "52m";
  formData.aquiferPumpSetting = "52m";

  document.getElementById("aquifer-static-level").value = "2.00m";
  formData.aquiferStaticLevel = "2.00m";

  document.getElementById("aquifer-pumping-level").value = "12.66m";
  formData.aquiferPumpingLevel = "12.66m";

  document.getElementById("aquifer-discharge").value = "4m³/hr";
  formData.aquiferDischarge = "4m³/hr";

  document.getElementById("aquifer-cumulative-drawdown").value = "10.66m out of 58.00m";
  formData.aquiferCumulativeDrawdown = "10.66m out of 58.00m";

  document.getElementById("aquifer-residual-drawdown").value = "%";
  formData.aquiferResidualDrawdown = "%";

  document.getElementById("aquifer-cumulative-percent").value = "18.4%";
  formData.aquiferCumulativePercent = "18.4%";

  document.getElementById("aquifer-recharge-duration").value = "60minutes";
  formData.aquiferRechargeDuration = "60minutes";

  document.getElementById("aquifer-test-duration").value = "24hours";
  formData.aquiferTestDuration = "24hours";

  document.getElementById("aquifer-test-date").value = "13th to 14th of July, 2025";
  formData.aquiferTestDate = "13th to 14th of July, 2025";
}
// Prefill calculations with default content
function prefillCalculations() {
  // TRANSMISSIVITY OF THE AQUIFER
  const transmissivityIntro = `This is the rate of flow of water under a unit hydraulic gradient through across sectional unit width across the entire saturated of the aquifer. This can be calculated using the logans and Thesis method to estimate it.
The logans formular reads as follows:`;
  
  document.getElementById("transmissivity-intro").value = transmissivityIntro;
  formData.transmissivityIntro = transmissivityIntro;

  const transmissivityFormula = `T = 1.22Qds
Where T= Transmissivity (m²/day)
Δs=change in water level (drawdown per log cycle of time in meters.)
Q= Tested yield (4m³/hr.)
Therefore Δs= (12.66 – 2.00)
           = 10.66m
           Q= 4m³/hr.
           T=1.22QΔS ÷24h
           = (1.22 x 4M³/Hr.) 24 ÷ 10.66M
           = 10.99M²/DAY`;
  
  document.getElementById("transmissivity-formula").value = transmissivityFormula;
  formData.transmissivityFormula = transmissivityFormula;

  const transmissivityConclusion = `This value is moderately high and suggests that the aquifer is porous and the recharge was also good.`;
  
  document.getElementById("transmissivity-conclusion").value = transmissivityConclusion;
  formData.transmissivityConclusion = transmissivityConclusion;

  // SPECIFIC CAPACITY
  const specificCapacityIntro = `This is a crude indication of the efficiency of the borehole as an engineered structure and is calculated by dividing the discharge rate (m³/day) by the total drawdown. High specific capacities generally indicate high transmissivity and low specific capacities the opposite.

It is therefore calculated as follows:`;
  
  document.getElementById("specific-capacity-intro").value = specificCapacityIntro;
  formData.specificCapacityIntro = specificCapacityIntro;

  const specificCapacityFormula = `Q (24hrs) = (4M³/hr. x 24) ÷ 10.66m = 9.01m²/day
SPC = 9.01m²/day
Specific capacity of this borehole = 9.01m²/day`;
  
  document.getElementById("specific-capacity-formula").value = specificCapacityFormula;
  formData.specificCapacityFormula = specificCapacityFormula;

  const specificCapacityConclusion = ``;
  document.getElementById("specific-capacity-conclusion").value = specificCapacityConclusion;
  formData.specificCapacityConclusion = specificCapacityConclusion;

  // PUMP SAFE DESIGN
  const pumpSafeIntro = `This is the safe optimal pumping regime of the borehole for a long period of time without causing detrimental effects to the aquifer. Based on the hydraulic characteristics it is therefore to be fitted of at least 80% of the constant discharge rate`;
  
  document.getElementById("pump-safe-intro").value = pumpSafeIntro;
  formData.pumpSafeIntro = pumpSafeIntro;

  const pumpSafeFormula = `Safe yield = 0.8 × 4m³/hr.
            = 3.2m³/hr.`;
  
  document.getElementById("pump-safe-formula").value = pumpSafeFormula;
  formData.pumpSafeFormula = pumpSafeFormula;

  const pumpSafeConclusion = ``;
  document.getElementById("pump-safe-conclusion").value = pumpSafeConclusion;
  formData.pumpSafeConclusion = pumpSafeConclusion;
}
// Initialize event listeners
function initializeEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", function () {
      switchTab(this.dataset.tab);
    });
  });

  // Form inputs
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.name && formData.hasOwnProperty(this.name)) {
        formData[this.name] = this.value;
      }
    });
  });

  // Auth form submissions
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
  // Reports tabs
  document.querySelectorAll(".reports-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      switchReportsTab(tabName);
    });
  });

  // Auth tabs
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      switchAuthTab(tabName);
    });
  });
}

// Authentication functions
function checkAuthStatus() {
  if (authToken) {
    fetchProfile();
  } else {
    showAuthButtons();
  }
}

async function fetchProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      currentUser = data.data.user;
      showUserInfo();
      loadUserReports();
    } else {
      localStorage.removeItem("authToken");
      authToken = null;
      showAuthButtons();
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    showNotification("Error checking authentication status", "error");
  }
}

function showAuthModal() {
  document.getElementById("auth-modal").classList.remove("hidden");
}

function hideAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
}

function switchAuthTab(tabName) {
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".auth-form").forEach((form) => {
    form.classList.remove("active");
  });

  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`${tabName}-form`).classList.add("active");
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.data.token;
      localStorage.setItem("authToken", authToken);
      currentUser = data.data.user;
      hideAuthModal();
      showUserInfo();
      showNotification("Login successful!", "success");
      loadUserReports();
    } else {
      showNotification(data.message || "Login failed", "error");
    }
  } catch (error) {
    console.error("Login error:", error);
    showNotification("Error during login", "error");
  }
}

async function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById("register-firstname").value;
  const lastName = document.getElementById("register-lastname").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const company = document.getElementById("register-company").value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password, company }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification("Registration successful! Please login.", "success");
      switchAuthTab("login");
      // Pre-fill login form
      document.getElementById("login-email").value = email;
    } else {
      showNotification(data.message || "Registration failed", "error");
    }
  } catch (error) {
    console.error("Registration error:", error);
    showNotification("Error during registration", "error");
  }
}

function logout() {
  authToken = null;
  currentUser = null;
  currentReportId = null;
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentReportId");

  // Ensure UI shows login/auth buttons immediately
  showAuthButtons();

  // Notify user and then refresh the page so only the login button is visible and state is clean
  showNotification("Logged out successfully", "success");
  setTimeout(() => {
    // Reload the page to reset application state (authToken will be absent so login will be shown)
    location.reload();
  }, 600);
}

function showUserInfo() {
  document.getElementById("auth-buttons").style.display = "none";
  document.getElementById("user-info").style.display = "block";

  // Safely access user properties to prevent "undefined"
  const firstName = currentUser?.first_name || "";
  const lastName = currentUser?.last_name || "";

  document.getElementById("user-name").textContent = `${firstName} ${lastName}`;
  document.getElementById("reports-management").classList.remove("hidden");
}

function showAuthButtons() {
  document.getElementById("auth-buttons").classList.remove("hidden");
  document.getElementById("user-info").classList.add("hidden");
  document.getElementById("reports-management").classList.add("hidden");
}

// Tab management
function switchTab(tabName) {
  // Update active tab
  activeTab = tabName;

  // Update tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(`${tabName}-tab`).classList.add("active");
}
/**
 * Generate location map preview
 */
async function generateLocationMapPreview() {
  if (!authToken) {
    showNotification("Please login to generate location map", "info");
    return;
  }

  try {
    // Collect location data
    const locationData = {
      nearestTownName: formData.nearestTownName || "Nearest Town",
      nearestTownLat: formData.nearestTownLatitude,
      nearestTownLng: formData.nearestTownLongitude,
      boreholeLat: formData.boreholeLatitude,
      boreholeLng: formData.boreholeLongitude,
      boreholeName: formData.projectLocation || "Borehole Site"
    };

    // Validate coordinates
    if (!locationData.nearestTownLat || !locationData.nearestTownLng ||
        !locationData.boreholeLat || !locationData.boreholeLng) {
      showNotification("Please enter all GPS coordinates", "error");
      return;
    }

    // Validate coordinate ranges
    if (!isValidCoordinate(locationData.nearestTownLat, locationData.nearestTownLng) ||
        !isValidCoordinate(locationData.boreholeLat, locationData.boreholeLng)) {
      showNotification("Invalid coordinates. Please check latitude (-90 to 90) and longitude (-180 to 180)", "error");
      return;
    }

    console.log("Generating location map with data:", locationData);
    showNotification("Generating location map... Please wait", "info");

    const response = await fetch(`${API_BASE_URL}/api/reports/location-map/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(locationData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      // Display map in preview
      displayLocationMapInPreview(imageUrl);
      showNotification("Location map generated successfully!", "success");
    } else {
      const errorData = await response.json();
      console.error("Map generation failed:", errorData);
      showNotification(errorData.message || "Failed to generate location map", "error");
    }
  } catch (error) {
    console.error("Location map generation error:", error);
    showNotification("Error generating location map", "error");
  }
}

/**
 * Validate coordinate values
 */
function isValidCoordinate(lat, lng) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  return !isNaN(latitude) && !isNaN(longitude) &&
         latitude >= -90 && latitude <= 90 &&
         longitude >= -180 && longitude <= 180;
}

/**
 * Display location map in report preview
 */
function displayLocationMapInPreview(imageUrl) {
  const previewContent = document.getElementById("preview-content");

  // Remove placeholder if it exists
  const placeholder = previewContent.querySelector(".preview-placeholder");
  if (placeholder) {
    placeholder.remove();
  }

  // Find or create location map section
  let locationMapSection = previewContent.querySelector("#location-map");

  if (!locationMapSection) {
    locationMapSection = document.createElement("div");
    locationMapSection.className = "report-section location-map-section";
    locationMapSection.id = "location-map";
    previewContent.appendChild(locationMapSection);
  }

  locationMapSection.innerHTML = `
    <h2 class="section-title-doc">LOCATION SKETCH MAP</h2>
    <div class="map-container" style="text-align: center; padding: 20px;">
      <img src="${imageUrl}"
           alt="Location Sketch Map"
           style="max-width: 100%; height: auto; border: 2px solid #333; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
           id="location-map-img">
    </div>
    <p style="text-align: center; font-style: italic; color: #666; margin-top: 10px;">
      Figure: Location sketch showing route from ${formData.nearestTownName || 'nearest town'} to borehole drilling site (Not Drawn To Scale)
    </p>
  `;
}

/**
 * Load location map for existing report
 */
async function loadReportLocationMap(reportId) {
  if (!authToken || !reportId) return;

  // Check if report has location coordinates
  if (!formData.nearestTownLatitude || !formData.boreholeLatitude) {
    console.log("No location coordinates in report");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}/location-map`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      displayLocationMapInPreview(imageUrl);
    }
  } catch (error) {
    console.error("Error loading location map:", error);
  }
}

/**
 * Update generateReport to include location map
 */
const originalGenerateReportFunc = generateReport;
generateReport = async function() {
  // Call original function
  originalGenerateReportFunc();
  
  // Generate sketch if report has WRMA data
  if (formData.wrmaTotalDepth || formData.totalDepth) {
    await generateSketchPreview();
  }

  // Generate location map if coordinates exist
  if (formData.nearestTownLatitude && formData.nearestTownLongitude &&
      formData.boreholeLatitude && formData.boreholeLongitude) {
    
    // Wait a bit for report to render
    setTimeout(async () => {
      if (currentReportId) {
        await loadReportLocationMap(currentReportId);
      } else {
        await generateLocationMapPreview();
      }
    }, 500);
  }
};

/**
 * Update loadReport to load location map
 */
const originalLoadReportFunc = loadReport;
loadReport = async function(reportId) {
  await originalLoadReportFunc(reportId);
  
  // Load sketch
  await loadReportSketch(reportId);

  // Load location map if coordinates exist
  if (formData.nearestTownLatitude && formData.boreholeLatitude) {
    await loadReportLocationMap(reportId);
  }
};
//WRMA management
function addWrmaPlainCasingRow() {
  const newCasing = {
    type: "",
    diameter: "",
    length: "",
    from: "",
    to: ""
  };
  wrmaPlainCasing.push(newCasing);
  renderWrmaPlainCasingTable();
}

function addWrmaSlottedCasingRow() {
  const newCasing = {
    type: "",
    diameter: "",
    length: "",
    from: "",
    to: ""
  };
  wrmaSlottedCasing.push(newCasing);
  renderWrmaSlottedCasingTable();
}

function removeWrmaPlainCasingRow(index) {
  wrmaPlainCasing.splice(index, 1);
  renderWrmaPlainCasingTable();
}

function removeWrmaSlottedCasingRow(index) {
  wrmaSlottedCasing.splice(index, 1);
  renderWrmaSlottedCasingTable();
}
function updateWrmaPlainCasing(index, field, value) {
  if (wrmaPlainCasing[index]) {
    wrmaPlainCasing[index][field] = value;
    console.log(`Updated plain casing ${index}.${field} = ${value}`, wrmaPlainCasing[index]);
  }
}

function updateWrmaSlottedCasing(index, field, value) {
  if (wrmaSlottedCasing[index]) {
    wrmaSlottedCasing[index][field] = value;
    console.log(`Updated slotted casing ${index}.${field} = ${value}`, wrmaSlottedCasing[index]);
  }
}

function renderWrmaPlainCasingTable() {
  const tbody = document.getElementById("wrma-plain-casing-tbody");
  if (!tbody) {
    console.error("Plain casing tbody not found!");
    return;
  }
  
  tbody.innerHTML = "";

  wrmaPlainCasing.forEach((casing, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input type="text" value="${casing.type || ""}" 
          oninput="updateWrmaPlainCasing(${index}, 'type', this.value)" 
          placeholder="uPVC">
      </td>
      <td>
        <input type="number" value="${casing.diameter || ""}" 
          oninput="updateWrmaPlainCasing(${index}, 'diameter', this.value)" 
          placeholder="152.4">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.length || ""}" 
          oninput="updateWrmaPlainCasing(${index}, 'length', this.value)" 
          placeholder="Length">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.from || ""}" 
          oninput="updateWrmaPlainCasing(${index}, 'from', this.value)" 
          placeholder="From">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.to || ""}" 
          oninput="updateWrmaPlainCasing(${index}, 'to', this.value)" 
          placeholder="To">
      </td>
      <td>
        <button type="button" class="btn-remove" onclick="removeWrmaPlainCasingRow(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  console.log("Rendered plain casing table with", wrmaPlainCasing.length, "rows");
}

function renderWrmaSlottedCasingTable() {
  const tbody = document.getElementById("wrma-slotted-casing-tbody");
  if (!tbody) {
    console.error("Slotted casing tbody not found!");
    return;
  }
  
  tbody.innerHTML = "";

  wrmaSlottedCasing.forEach((casing, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input type="text" value="${casing.type || ""}" 
          oninput="updateWrmaSlottedCasing(${index}, 'type', this.value)" 
          placeholder="uPVC">
      </td>
      <td>
        <input type="number" value="${casing.diameter || ""}" 
          oninput="updateWrmaSlottedCasing(${index}, 'diameter', this.value)" 
          placeholder="152.4">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.length || ""}" 
          oninput="updateWrmaSlottedCasing(${index}, 'length', this.value)" 
          placeholder="Length">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.from || ""}" 
          oninput="updateWrmaSlottedCasing(${index}, 'from', this.value)" 
          placeholder="From">
      </td>
      <td>
        <input type="number" step="0.01" value="${casing.to || ""}" 
          oninput="updateWrmaSlottedCasing(${index}, 'to', this.value)" 
          placeholder="To">
      </td>
      <td>
        <button type="button" class="btn-remove" onclick="removeWrmaSlottedCasingRow(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  console.log("Rendered slotted casing table with", wrmaSlottedCasing.length, "rows");
}

// Initialize WRMA tables with one default row each
function initializeWrmaTables() {
  console.log("Initializing WRMA tables...");
  
  // Initialize with one empty row each if arrays are empty
  if (!wrmaPlainCasing || wrmaPlainCasing.length === 0) {
    wrmaPlainCasing = [{
      type: "",
      diameter: "",
      length: "",
      from: "",
      to: ""
    }];
  }
  
  if (!wrmaSlottedCasing || wrmaSlottedCasing.length === 0) {
    wrmaSlottedCasing = [{
      type: "",
      diameter: "",
      length: "",
      from: "",
      to: ""
    }];
  }
  
  renderWrmaPlainCasingTable();
  renderWrmaSlottedCasingTable();
  
  console.log("WRMA tables initialized");
}
// Casing management
function addInitialCasingRow() {
  // Prefill with the data from the screenshot
  const initialCasings = [
    {
      from: "0.00",
      to: "24.00",
      material: "Blind uPVC casings",
      type: "Blind",
      remarks: "",
    },
    {
      from: "24.00",
      to: "30.00",
      material: "Slotted uPVC casings",
      type: "Slotted",
      remarks: "Aquiferous",
    },
    {
      from: "30.00",
      to: "36.00",
      material: "Blind uPVC casings",
      type: "Blind",
      remarks: "",
    },
    {
      from: "36.00",
      to: "42.00",
      material: "Slotted uPVC casings",
      type: "Slotted",
      remarks: "Aquiferous",
    },
    {
      from: "42.00",
      to: "48.00",
      material: "Blind uPVC casings",
      type: "Blind",
      remarks: "",
    },
    {
      from: "48.00",
      to: "54.00",
      material: "Slotted uPVC casings",
      type: "Slotted",
      remarks: "Aquiferous",
    },
    {
      from: "54.00",
      to: "60.00",
      material: "Blind uPVC casings",
      type: "Blind",
      remarks: "",
    },
  ];
  
  casings = initialCasings;
  renderCasingTable();
}

function addCasingRow() {
  const newCasing = {
    from: "",
    to: "",
    material: "",
    type: "",
    remarks: "",
  };
  casings.push(newCasing);
  renderCasingTable();
}

function removeCasingRow(index) {
  if (casings.length > 1) {
    casings.splice(index, 1);
    renderCasingTable();
  }
}

function updateCasing(index, field, value) {
  if (casings[index]) {
    casings[index][field] = value;
  }
}
function updateCasingDepth(index, value) {
  if (casings[index]) {
    // Parse the depth range (e.g., "0.00-24.00")
    const parts = value.split("-");
    if (parts.length === 2) {
      casings[index].from = parts[0].trim();
      casings[index].to = parts[1].trim();
    }
  }
}

function renderCasingTable() {
  const tbody = document.getElementById("casing-tbody");
  tbody.innerHTML = "";

  casings.forEach((casing, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input 
          type="text" 
          value="${casing.from}-${casing.to}" 
          onchange="updateCasingDepth(${index}, this.value)"
          placeholder="0.00-24.00"
          style="width: 100%;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${casing.material}" 
          onchange="updateCasing(${index}, 'material', this.value)"
          placeholder="Material description"
          style="width: 100%;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${casing.remarks}" 
          onchange="updateCasing(${index}, 'remarks', this.value)"
          placeholder="Remarks"
          style="width: 100%;"
        >
      </td>
      <td>
        <button 
          type="button" 
          class="btn-remove" 
          onclick="removeCasingRow(${index})"
          ${casings.length <= 1 ? "disabled" : ""}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
// Add these functions to your script.js file

/**
 * Generate and preview borehole sketch
 */
async function generateSketchPreview() {
  if (!authToken) {
    showNotification("Please login to generate sketch", "info");
    return;
  }

  try {
    // Log current casing arrays for debugging
    console.log("=== Frontend Casing Data ===");
    console.log("wrmaPlainCasing:", wrmaPlainCasing);
    console.log("wrmaSlottedCasing:", wrmaSlottedCasing);
    
    // Collect sketch data from form with robust filtering
    const sketchData = {
      totalDepth: formData.wrmaTotalDepth || formData.totalDepth || 60,
      diameter: formData.wrmaHoleDiameter1 || 152.4,
      plainCasings: (wrmaPlainCasing || [])
        .filter(c => {
          const hasValidFrom = c && c.from !== null && c.from !== undefined && c.from !== "";
          const hasValidTo = c && c.to !== null && c.to !== undefined && c.to !== "";
          return hasValidFrom && hasValidTo;
        })
        .map(c => ({
          from: parseFloat(c.from),
          to: parseFloat(c.to)
        })),
      slottedCasings: (wrmaSlottedCasing || [])
        .filter(c => {
          const hasValidFrom = c && c.from !== null && c.from !== undefined && c.from !== "";
          const hasValidTo = c && c.to !== null && c.to !== undefined && c.to !== "";
          return hasValidFrom && hasValidTo;
        })
        .map(c => ({
          from: parseFloat(c.from),
          to: parseFloat(c.to)
        })),
      drillingStart: formData.wrmaDrillingStart || formData.drillingStart || "",
      drillingEnd: formData.wrmaDrillingEnd || formData.drillingEnd || ""
    };
    
    console.log("Prepared sketchData:", sketchData);
    console.log("Plain casings to send:", sketchData.plainCasings.length);
    console.log("Slotted casings to send:", sketchData.slottedCasings.length);

    showNotification("Generating sketch preview...", "info");

    const response = await fetch(`${API_BASE_URL}/api/reports/sketch/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(sketchData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      // Display sketch in preview
      displaySketchInPreview(imageUrl);
      
      if (sketchData.plainCasings.length === 0 && sketchData.slottedCasings.length === 0) {
        showNotification("Sketch generated (no casing data provided)", "success");
      } else {
        showNotification(`Sketch generated with ${sketchData.plainCasings.length} plain and ${sketchData.slottedCasings.length} slotted casings`, "success");
      }
    } else {
      const errorText = await response.text();
      console.error("Sketch generation failed:", errorText);
      showNotification("Failed to generate sketch", "error");
    }
  } catch (error) {
    console.error("Sketch generation error:", error);
    showNotification("Error generating sketch", "error");
  }
}

/**
 * Display sketch in report preview
 */
function displaySketchInPreview(imageUrl) {
  const previewContent = document.getElementById("preview-content");

  // Remove placeholder if it exists
  const placeholder = previewContent.querySelector(".preview-placeholder");
  if (placeholder) {
    placeholder.remove();
  }

  // Find or create sketch section
  let sketchSection = previewContent.querySelector("#borehole-sketch");

  if (!sketchSection) {
    sketchSection = document.createElement("div");
    sketchSection.className = "report-section sketch-section";
    sketchSection.id = "borehole-sketch";
    previewContent.appendChild(sketchSection);
  }

  sketchSection.innerHTML = `
    <h2 class="section-title-doc">BOREHOLE DESIGN SKETCH</h2>
    <div class="sketch-container" style="text-align: center; padding: 20px;">
      <img src="${imageUrl}"
           alt="Borehole Design Sketch"
           style="max-width: 100%; height: auto; border: 1px solid #ddd;"
           id="borehole-sketch-img">
    </div>
  `;
}

/**
 * Load sketch for existing report
 */
async function loadReportSketch(reportId) {
  if (!authToken || !reportId) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}/sketch`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      displaySketchInPreview(imageUrl);
    }
  } catch (error) {
    console.error("Error loading sketch:", error);
  }
}

/**
 * Add sketch button to WRMA section
 */
function addSketchGenerationButton() {
  const wrmaTab = document.getElementById("wrma-form-tab");
  if (!wrmaTab) return;

  // Check if button already exists
  if (document.getElementById("generate-sketch-btn")) return;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "sketch-button-container";
  buttonContainer.style.cssText = "margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px;";
  
  buttonContainer.innerHTML = `
    <button 
      id="generate-sketch-btn" 
      onclick="generateSketchPreview()" 
      class="btn" 
      style="width: 100%; padding: 12px; font-size: 16px;">
      <i class="fa-solid fa-image"></i> Generate Borehole Design Sketch
    </button>
    <p style="margin-top: 10px; font-size: 12px; color: #666; text-align: center;">
      Generate a visual representation of your borehole design based on the entered data
    </p>
  `;

  wrmaTab.appendChild(buttonContainer);
}

// Initialize sketch button when page loads
document.addEventListener("DOMContentLoaded", function() {
  // Add sketch generation button after WRMA form loads
  setTimeout(addSketchGenerationButton, 500);
});


// change listeners for location fields
  const locationFields = [
    'nearest-town-name',
    'nearest-town-latitude',
    'nearest-town-longitude',
    'borehole-latitude',
    'borehole-longitude'
  ];
  
  locationFields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.addEventListener('input', function() {
        const fieldName = this.name;
        if (fieldName && formData.hasOwnProperty(fieldName)) {
          formData[fieldName] = this.value;
        }
      });
    }
  });
// Pumping test data management
function addInitialPumpingTestRow() {
  // Start with one empty row
  const initialData = {
    date: "",
    clockTime: "",
    elapsedTime: "",
    waterLevel: "",
    drawdown: "",
    yield: "",
    ec: "",
    remarks: "",
  };
  pumpingTestData.push(initialData);
  renderPumpingTestTable();
}

function addPumpingTestRow() {
  const newData = {
    date: "",
    clockTime: "",
    elapsedTime: "",
    waterLevel: "",
    drawdown: "",
    yield: "",
    ec: "",
    remarks: "",
  };
  pumpingTestData.push(newData);
  renderPumpingTestTable();
}

function removePumpingTestRow(index) {
  if (pumpingTestData.length > 1) {
    pumpingTestData.splice(index, 1);
    renderPumpingTestTable();
    updatePumpingTestChart();
  }
}

function updatePumpingTestData(index, field, value) {
  if (pumpingTestData[index]) {
    pumpingTestData[index][field] = value;
    updatePumpingTestChart();
  }
}

function renderPumpingTestTable() {
  const tbody = document.getElementById("pumping-test-tbody");
  tbody.innerHTML = "";

  pumpingTestData.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input 
          type="text" 
          value="${data.date || ""}" 
          onchange="updatePumpingTestData(${index}, 'date', this.value)"
          placeholder="13-Jul-25"
          style="width: 100%; min-width: 80px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.clockTime || ""}" 
          onchange="updatePumpingTestData(${index}, 'clockTime', this.value)"
          placeholder="11:39"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="1" 
          value="${data.elapsedTime || ""}" 
          onchange="updatePumpingTestData(${index}, 'elapsedTime', this.value)"
          placeholder="0"
          style="width: 100%; min-width: 60px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="0.01" 
          value="${data.waterLevel || ""}" 
          onchange="updatePumpingTestData(${index}, 'waterLevel', this.value)"
          placeholder="2.00"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="0.01" 
          value="${data.drawdown || ""}" 
          onchange="updatePumpingTestData(${index}, 'drawdown', this.value)"
          placeholder="0.00"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="0.1" 
          value="${data.yield || ""}" 
          onchange="updatePumpingTestData(${index}, 'yield', this.value)"
          placeholder="5.2"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.ec || ""}" 
          onchange="updatePumpingTestData(${index}, 'ec', this.value)"
          placeholder=""
          style="width: 100%; min-width: 60px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.remarks || ""}" 
          onchange="updatePumpingTestData(${index}, 'remarks', this.value)"
          placeholder="Clear Water"
          style="width: 100%; min-width: 100px;"
        >
      </td>
      <td>
        <button 
          type="button" 
          class="btn-remove" 
          onclick="removePumpingTestRow(${index})"
          ${pumpingTestData.length <= 1 ? "disabled" : ""}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Recovery data management
function addInitialRecoveryDataRow() {
  const initialData = {
    date: "",
    clockTime: "",
    elapsedTime: "",
    waterLevel: "",
    recovery: "",
    efficiency: "",
    comment: "",
  };
  recoveryData.push(initialData);
  renderRecoveryDataTable();
}
function addRecoveryDataRow() {
  const newData = {
    date: "",
    clockTime: "",
    elapsedTime: "",
    waterLevel: "",
    recovery: "",
    efficiency: "",
    comment: "",
  };
  recoveryData.push(newData);
  renderRecoveryDataTable();
}
function removeRecoveryDataRow(index) {
  if (recoveryData.length > 1) {
    recoveryData.splice(index, 1);
    renderRecoveryDataTable();
    updateRecoveryDataChart();
  }
}

function updateRecoveryData(index, field, value) {
  if (recoveryData[index]) {
    recoveryData[index][field] = value;
    updateRecoveryDataChart();
  }
}

function renderRecoveryDataTable() {
  const tbody = document.getElementById("recovery-data-tbody");
  tbody.innerHTML = "";

  recoveryData.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input 
          type="text" 
          value="${data.date || ""}" 
          onchange="updateRecoveryData(${index}, 'date', this.value)"
          placeholder="14-Jul-25"
          style="width: 100%; min-width: 80px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.clockTime || ""}" 
          onchange="updateRecoveryData(${index}, 'clockTime', this.value)"
          placeholder="11:39"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="1" 
          value="${data.elapsedTime || ""}" 
          onchange="updateRecoveryData(${index}, 'elapsedTime', this.value)"
          placeholder="0"
          style="width: 100%; min-width: 60px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="0.01" 
          value="${data.waterLevel || ""}" 
          onchange="updateRecoveryData(${index}, 'waterLevel', this.value)"
          placeholder="14.66"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="number" 
          step="0.01" 
          value="${data.recovery || ""}" 
          onchange="updateRecoveryData(${index}, 'recovery', this.value)"
          placeholder="0.00"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.efficiency || ""}" 
          onchange="updateRecoveryData(${index}, 'efficiency', this.value)"
          placeholder="0.00%"
          style="width: 100%; min-width: 70px;"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${data.comment || ""}" 
          onchange="updateRecoveryData(${index}, 'comment', this.value)"
          placeholder="Comment"
          style="width: 100%; min-width: 100px;"
        >
      </td>
      <td>
        <button 
          type="button" 
          class="btn-remove" 
          onclick="removeRecoveryDataRow(${index})"
          ${recoveryData.length <= 1 ? "disabled" : ""}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
// Chart functions
function updatePumpingTestChart() {
  const ctx = document.getElementById("pumping-test-chart");
  if (!ctx) return;

  const validData = pumpingTestData.filter((d) => d.elapsedTime && d.waterLevel);

  if (pumpingTestChart) {
    pumpingTestChart.destroy();
  }

  pumpingTestChart = new Chart(ctx, {
    type: "line", // Changed from "bar" to "line"
    data: {
      labels: validData.map((d) => d.elapsedTime),
      datasets: [
        {
          label: "Water Level (m)",
          data: validData.map((d) => d.waterLevel),
          backgroundColor: "rgba(255, 99, 71, 0.2)", // Light fill under curve
          borderColor: "rgba(255, 99, 71, 1)",
          borderWidth: 3,
          fill: true, // Fill area under curve
          tension: 0.4, // This creates the smooth curve effect (0 = straight lines, 1 = very curved)
          pointRadius: 4, // Size of points on the line
          pointHoverRadius: 6, // Size when hovering
          pointBackgroundColor: "rgba(255, 99, 71, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Elapsed Time (minutes)",
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        y: {
          title: {
            display: true,
            text: "Water Level (m)",
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          beginAtZero: true,
          max: 16,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
      },
      plugins: {
        title: {
          display: true,
          text: "WATER LEVEL VS TIME",
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 13
          },
          bodyFont: {
            size: 12
          },
          callbacks: {
            label: function(context) {
              return `Water Level: ${context.parsed.y} m`;
            }
          }
        }
      },
    },
  });
}
function updateRecoveryDataChart() {
  const ctx = document.getElementById("recovery-data-chart");
  if (!ctx) return;

  const validData = recoveryData.filter((d) => d.elapsedTime && d.waterLevel);

  if (recoveryDataChart) {
    recoveryDataChart.destroy();
  }

  // Calculate residual drawdown (static level - current water level)
  const staticLevel = parseFloat(formData.recoveryStaticLevel || formData.staticLevelTest || 2.0);
  
  recoveryDataChart = new Chart(ctx, {
    type: "line", // Changed from "bar" to "line"
    data: {
      labels: validData.map((d) => d.elapsedTime),
      datasets: [
        {
          label: "Residual Drawdown (m)",
          data: validData.map((d) => {
            const waterLevel = parseFloat(d.waterLevel);
            return waterLevel - staticLevel; // Residual drawdown
          }),
          backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue fill
          borderColor: "rgba(54, 162, 235, 1)", // Blue line
          borderWidth: 3,
          fill: true,
          tension: 0.4, // Smooth curve
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time (minutes)",
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        y: {
          title: {
            display: true,
            text: "Residual Drawdown (m)",
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          beginAtZero: false,
          max: 16,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
      },
      plugins: {
        title: {
          display: true,
          text: "RESIDUAL DRAWDOWN VS TIME",
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 13
          },
          bodyFont: {
            size: 12
          },
          callbacks: {
            label: function(context) {
              return `Residual Drawdown: ${context.parsed.y.toFixed(2)} m`;
            }
          }
        }
      },
    },
  });
}
// Create charts for report preview with smaller size
function createReportCharts() {
  // Create pumping test chart in report
  const reportPumpingCtx = document.getElementById("report-pumping-test-chart");
  if (reportPumpingCtx) {
    try {
      const validPumpingData = pumpingTestData.filter(
        (d) => d.elapsedTime && d.waterLevel
      );

      if (reportPumpingTestChart) {
        reportPumpingTestChart.destroy();
      }

      if (validPumpingData.length > 0) {
        reportPumpingTestChart = new Chart(reportPumpingCtx, {
          type: "line", // Changed from "bar" to "line"
          data: {
            labels: validPumpingData.map((d) => d.elapsedTime),
            datasets: [
              {
                label: "Water Level (m)",
                data: validPumpingData.map((d) => parseFloat(d.waterLevel)),
                backgroundColor: "rgba(255, 99, 71, 0.2)",
                borderColor: "rgba(255, 99, 71, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Smooth curve
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: "rgba(255, 99, 71, 1)",
                pointBorderColor: "#fff",
                pointBorderWidth: 1,
              },
            ],
          },
          options: {
            animation: {
              duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Elapsed Time (minutes)",
                  font: { size: 10 },
                },
                ticks: { font: { size: 9 } },
              },
              y: {
                title: {
                  display: true,
                  text: "Water Level (m)",
                  font: { size: 10 },
                },
                ticks: { font: { size: 9 } },
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: { font: { size: 10 } },
              },
              title: {
                display: true,
                text: "WATER LEVEL VS TIME",
                font: { size: 11 },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error creating pumping test chart:", error);
    }
  }

  // Create recovery data chart in report
  const reportRecoveryCtx = document.getElementById("report-recovery-data-chart");
  if (reportRecoveryCtx) {
    try {
      const validRecoveryData = recoveryData.filter((d) => d.elapsedTime && d.waterLevel);

      if (reportRecoveryDataChart) {
        reportRecoveryDataChart.destroy();
      }

      if (validRecoveryData.length > 0) {
        const staticLevel = parseFloat(formData.recoveryStaticLevel || formData.staticLevelTest || 2.0);
        
        reportRecoveryDataChart = new Chart(reportRecoveryCtx, {
          type: "line", // Changed from "bar" to "line"
          data: {
            labels: validRecoveryData.map((d) => d.elapsedTime),
            datasets: [
              {
                label: "Residual Drawdown (m)",
                data: validRecoveryData.map((d) => {
                  const waterLevel = parseFloat(d.waterLevel);
                  return waterLevel - staticLevel;
                }),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Smooth curve
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                pointBorderColor: "#fff",
                pointBorderWidth: 1,
              },
            ],
          },
          options: {
            animation: {
              duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time (minutes)",
                  font: { size: 10 },
                },
                ticks: { font: { size: 9 } },
              },
              y: {
                title: {
                  display: true,
                  text: "Residual Drawdown (m)",
                  font: { size: 10 },
                },
                ticks: { font: { size: 9 } },
                beginAtZero: false,
                max: 16,
              },
            },
            plugins: {
              legend: {
                labels: { font: { size: 10 } },
              },
              title: {
                display: true,
                text: "RESIDUAL DRAWDOWN VS TIME",
                font: { size: 11 },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error creating recovery chart:", error);
    }
  }
}
  // Create recovery data chart in report
const reportRecoveryCtx = document.getElementById("report-recovery-data-chart");
if (reportRecoveryCtx) {
  const validRecoveryData = recoveryData.filter((d) => d.elapsedTime && d.waterLevel);

  if (reportRecoveryDataChart) {
    reportRecoveryDataChart.destroy();
  }

  if (validRecoveryData.length > 0) {
    const staticLevel = parseFloat(formData.recoveryStaticLevel || formData.staticLevelTest || 2.0);
    
    reportRecoveryDataChart = new Chart(reportRecoveryCtx, {
      type: "bar",
      data: {
        labels: validRecoveryData.map((d) => d.elapsedTime),
        datasets: [
          {
            label: "Residual Drawdown (m)",
            data: validRecoveryData.map((d) => {
              const waterLevel = parseFloat(d.waterLevel);
              return waterLevel - staticLevel;
            }),
            backgroundColor: "rgba(255, 99, 71, 0.7)",
            borderColor: "rgba(255, 99, 71, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (minutes)",
              font: { size: 10 },
            },
            ticks: { font: { size: 9 } },
          },
          y: {
            title: {
              display: true,
              text: "Residual Drawdown (m)",
              font: { size: 10 },
            },
            ticks: { font: { size: 9 } },
            beginAtZero: false,
            max: 16,
          },
        },
        plugins: {
          legend: {
            labels: { font: { size: 10 } },
          },
          title: {
            display: true,
            text: "RESIDUAL DRAWDOWN VS TIME",
            font: { size: 11 },
          },
        },
      },
    });
  }
}

// Notification functions
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification-text");

  notificationText.textContent = message;
  notification.className = `notification ${type}`;

  setTimeout(() => {
    hideNotification();
  }, 5000);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  notification.className = "notification hidden";
}

// Report management functions
async function saveDraft() {
  if (!authToken) {
    showAuthModal();
    showNotification("Please login to save drafts", "info");
    return;
  }

  updateFormDataFromInputs();

  const payload = {
    title: formData.clientName
      ? `${formData.clientName} - ${formData.projectLocation}`
      : "Untitled Report",
    status: "draft",

    // 🔥 FIX: everything goes inside reportData
    reportData: {
      ...formData,
      nearestTownName: formData.nearestTownName || null,
      nearestTownLatitude: parseFloat(formData.nearestTownLatitude) || null,
      nearestTownLongitude: parseFloat(formData.nearestTownLongitude) || null,
      boreholeLatitude: parseFloat(formData.boreholeLatitude) || null,
      boreholeLongitude: parseFloat(formData.boreholeLongitude) || null,
    },

    // Casing data
    casings: casings.map((c) => ({
      depthFrom: c.from === "" || c.from === null ? null : parseFloat(c.from),
      depthTo: c.to === "" || c.to === null ? null : parseFloat(c.to),
      casingType: c.type || "",
      diameter: "",
      material: c.material || "",
      remarks: c.remarks || "",
    })),

    // WRMA casing tables
    wrmaPlainCasing: wrmaPlainCasing,
    wrmaSlottedCasing: wrmaSlottedCasing,

    pumpingTestData: pumpingTestData.map((p) => ({
      date: p.date || "",
      clockTime: p.clockTime || "",
      timeMinutes: parseFloat(p.elapsedTime) || null,
      waterLevel: parseFloat(p.waterLevel) || null,
      drawdown: parseFloat(p.drawdown) || null,
      yieldValue: parseFloat(p.yield) || null,
      ec: p.ec || "",
      remarks: p.remarks || "",
    })),

    recoveryData: recoveryData.map((r) => ({
      date: r.date || "",
      clockTime: r.clockTime || "",
      timeMinutes: parseFloat(r.elapsedTime) || null,
      waterLevel: parseFloat(r.waterLevel) || null,
      recovery: parseFloat(r.recovery) || null,
      efficiency: r.efficiency || "",
      comment: r.comment || "",
    })),
  };

  console.log("Saving draft with:", payload);

  try {
    let response;

    if (currentReportId) {
      // Update existing report
      response = await fetch(`${API_BASE_URL}/api/reports/${currentReportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
    } else {
      // Create new report
      response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
    }

    const data = await response.json();

    if (response.ok) {
      currentReportId = data.data.report.id;
      localStorage.setItem("currentReportId", currentReportId);
      showNotification("Draft saved successfully!", "success");
      loadUserReports();
    } else {
      console.error("Server error response:", data);
      showNotification(data.message || "Failed to save draft", "error");
    }
  } catch (error) {
    console.error("Save draft error:", error);
    showNotification("Error saving draft", "error");
  }
}

async function completeReport() {
  if (!authToken) {
    showAuthModal();
    showNotification("Please login to complete reports", "info");
    return;
  }

  updateFormDataFromInputs();

  const reportData = {
    title: formData.clientName
      ? `${formData.clientName} - ${formData.projectLocation}`
      : "Untitled Report",
    status: "completed",
    reportData: formData,
    casings: casings.map((casing) => ({
      depthFrom: casing.from === "" || casing.from === null ? null : parseFloat(casing.from),
      depthTo: casing.to === "" || casing.to === null ? null : parseFloat(casing.to),
      casingType: casing.type || "",
      diameter: "",
      material: casing.material || "",
      remarks: casing.remarks || "",
    })),
    pumpingTestData: pumpingTestData.map((p) => ({
      date: p.date || "",
      clockTime: p.clockTime || "",
      timeMinutes: parseFloat(p.elapsedTime) || null,
      waterLevel: parseFloat(p.waterLevel) || null,
      drawdown: parseFloat(p.drawdown) || null,
      yieldValue: parseFloat(p.yield) || null,
      ec: p.ec || "",
      remarks: p.remarks || "",
    })),
    recoveryData: recoveryData.map((r) => ({
      date: r.date || "",
      clockTime: r.clockTime || "",
      timeMinutes: parseFloat(r.elapsedTime) || null,
      waterLevel: parseFloat(r.waterLevel) || null,
      recovery: parseFloat(r.recovery) || null,
      efficiency: r.efficiency || "",
      comment: r.comment || "",
    })),
  };

  console.log("Submitting report data:", JSON.stringify(reportData, null, 2));

  try {
    let response;
    if (currentReportId) {
      response = await fetch(`${API_BASE_URL}/api/reports/${currentReportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(reportData),
      });
    } else {
      response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...reportData, status: "completed" }),
      });
    }

    const data = await response.json();

    if (response.ok) {
      currentReportId = null;
      localStorage.removeItem("currentReportId");
      showNotification("Report marked as complete!", "success");
      loadUserReports();
    } else {
      console.error("Server error response:", data);
      if (data.errors) {
        showNotification(
          `Validation errors: ${data.errors.map((e) => e.message).join(", ")}`,
          "error"
        );
      } else {
        showNotification(data.message || "Failed to complete report", "error");
      }
    }
  } catch (error) {
    console.error("Complete report error:", error);
    showNotification("Error completing report", "error");
  }
}
async function loadUserReports() {
  if (!authToken) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      displayReports(data.data.reports);
    } else {
      console.error("Failed to load reports");
    }
  } catch (error) {
    console.error("Load reports error:", error);
  }
}

function displayReports(reports) {
  console.log("Displaying reports:", reports);
  const draftsList = document.getElementById("drafts-list");
  const completedList = document.getElementById("completed-list");

  // Clear existing lists
  draftsList.innerHTML = "";
  completedList.innerHTML = "";

  if (reports.length === 0) {
    draftsList.innerHTML = '<p class="no-reports">No drafts found</p>';
    completedList.innerHTML =
      '<p class="no-reports">No completed reports found</p>';
    return;
  }

  const drafts = reports.filter((report) => report.status === "draft");
  const completed = reports.filter((report) => report.status === "completed");

  if (drafts.length === 0) {
    draftsList.innerHTML = '<p class="no-reports">No drafts found</p>';
  } else {
    drafts.forEach((report) => {
      draftsList.appendChild(createReportCard(report));
    });
  }

  if (completed.length === 0) {
    completedList.innerHTML =
      '<p class="no-reports">No completed reports found</p>';
  } else {
    completed.forEach((report) => {
      completedList.appendChild(createReportCard(report));
    });
  }
}

function createReportCard(report) {
  const card = document.createElement("div");
  card.className = "report-card";
  card.innerHTML = `
    <h3>${report.title}</h3>
    <p>Status: <span class="status-${report.status}">${report.status}</span></p>
    <p>Last updated: ${new Date(report.updatedAt).toLocaleDateString()}</p>
    <div class="report-actions">
      <button onclick="loadReport('${report.id}')" class="btn-action">
        <i class="fa-solid fa-pencil"></i> Edit
      </button>
      ${
        report.status === "completed"
          ? `
        <button onclick="downloadReport('${report.id}')" class="btn-action">
          <i class="fa-solid fa-download"></i> Download
        </button>
      `
          : ""
      }
      <button onclick="deleteReport('${report.id}')" class="btn-action danger">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </div>
  `;
  return card;
}
async function loadReport(reportId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const report = data.data.report;
// Populate WRMA fields
  if (report.reportData) {
    populateForm(report.reportData);
    
    // Populate WRMA casing data
    if (report.wrmaPlainCasing) {
      wrmaPlainCasing = report.wrmaPlainCasing;
      renderWrmaPlainCasingTable();
    }
    
    if (report.wrmaSlottedCasing) {
      wrmaSlottedCasing = report.wrmaSlottedCasing;
      renderWrmaSlottedCasingTable();
    }
  }
  
      // Populate form with report data
      populateForm(report.reportData);

      // Populate casings
      casings =
        report.casings.map((c) => ({
          from: c.depth_from || "",
          to: c.depth_to || "",
          material: c.material || "",
          type: c.casing_type || "",
          remarks: c.remarks || "",
        })) || [];

      // If casings are empty after loading, add one initial row
      if (casings.length === 0) addInitialCasingRow();

      renderCasingTable();

      // Populate pumping test data
     pumpingTestData =
  report.pumpingTestData.map((p) => ({
    date: p.date || "",
    clockTime: p.clock_time || "",
    elapsedTime: p.time_minutes || "",
    waterLevel: p.water_level || "",
    drawdown: p.drawdown || "",
    yield: p.yield_value || "",
    ec: p.ec || "",
    remarks: p.remarks || "",
  })) || [];

      if (pumpingTestData.length === 0) addInitialPumpingTestRow();

      renderPumpingTestTable();
      updatePumpingTestChart(); // This call is crucial
      // Populate recovery data
      recoveryData =
  report.recoveryData.map((r) => ({
    date: r.date || "",
    clockTime: r.clock_time || "",
    elapsedTime: r.time_minutes || "",
    waterLevel: r.water_level || "",
    recovery: r.recovery || "",
    efficiency: r.efficiency || "",
    comment: r.comment || "",
  })) || [];

      if (recoveryData.length === 0) addInitialRecoveryDataRow();

      renderRecoveryDataTable();
      updateRecoveryDataChart(); // This call is crucial

      currentReportId = reportId;
      localStorage.setItem("currentReportId", reportId);

      showNotification("Report loaded successfully", "success");
    } else {
      showNotification("Failed to load report", "error");
    }
  } catch (error) {
    console.error("Load report error:", error);
    showNotification("Error loading report", "error");
  }
}

function populateForm(reportData) {
  // Iterate through formData keys and set values
  for (const key in reportData) {
    if (formData.hasOwnProperty(key)) {
      formData[key] = reportData[key] || "";

      // Update form fields
      const element = document.querySelector(`[name="${key}"]`);
      if (element) {
        element.value = reportData[key] || "";
      }
    }
  }
}

async function downloadReport(reportId) {
  try {
    // First, load the report data
    showNotification("Loading report...", "info");
    
    const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    if (!response.ok) {
      showNotification("Failed to load report", "error");
      return;
    }
    
    const data = await response.json();
    const report = data.data.report;
    
    // Populate all form data
    populateForm(report.reportData);
    if (report.reportData.nearestTownName) formData.nearestTownName = report.reportData.nearestTownName;
    if (report.reportData.nearestTownLatitude) formData.nearestTownLatitude = report.reportData.nearestTownLatitude;
    if (report.reportData.nearestTownLongitude) formData.nearestTownLongitude = report.reportData.nearestTownLongitude;
    if (report.reportData.boreholeLatitude) formData.boreholeLatitude = report.reportData.boreholeLatitude;
    if (report.reportData.boreholeLongitude) formData.boreholeLongitude = report.reportData.boreholeLongitude;

    // Populate WRMA casing data
    if (report.reportData.wrmaPlainCasing) {
      wrmaPlainCasing = report.reportData.wrmaPlainCasing;
      renderWrmaPlainCasingTable();
    }
    
    if (report.reportData.wrmaSlottedCasing) {
      wrmaSlottedCasing = report.reportData.wrmaSlottedCasing;
      renderWrmaSlottedCasingTable();
    }
    
    // Populate casings
    casings = report.casings.map((c) => ({
      from: c.depth_from || "",
      to: c.depth_to || "",
      material: c.material || "",
      type: c.casing_type || "",
      remarks: c.remarks || "",
    })) || [];
    
    if (casings.length === 0) casings = [{ from: "", to: "", material: "", type: "", remarks: "" }];
    renderCasingTable();
    
    // Populate pumping test data
    pumpingTestData = report.pumpingTestData.map((p) => ({
      date: p.date || "",
      clockTime: p.clock_time || "",
      elapsedTime: p.time_minutes || "",
      waterLevel: p.water_level || "",
      drawdown: p.drawdown || "",
      yield: p.yield_value || "",
      ec: p.ec || "",
      remarks: p.remarks || "",
    })) || [];
    
    if (pumpingTestData.length === 0) {
      pumpingTestData = [{ date: "", clockTime: "", elapsedTime: "", waterLevel: "", drawdown: "", yield: "", ec: "", remarks: "" }];
    }
    renderPumpingTestTable();
    
    // Populate recovery data
    recoveryData = report.recoveryData.map((r) => ({
      date: r.date || "",
      clockTime: r.clock_time || "",
      elapsedTime: r.time_minutes || "",
      waterLevel: r.water_level || "",
      recovery: r.recovery || "",
      efficiency: r.efficiency || "",
      comment: r.comment || "",
    })) || [];
    
    if (recoveryData.length === 0) {
      recoveryData = [{ date: "", clockTime: "", elapsedTime: "", waterLevel: "", recovery: "", efficiency: "", comment: "" }];
    }
    renderRecoveryDataTable();
    
    // Update all charts
    updatePumpingTestChart();
    updateRecoveryDataChart();
    
    // Wait for everything to render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate the report preview
    generateReport();
    
    // Wait for report to be fully generated
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Now download the PDF
    await downloadPDF();
    
  } catch (error) {
    console.error("Download report error:", error);
    showNotification("Error downloading report", "error");
  }
}

async function deleteReport(reportId) {
  if (!confirm("Are you sure you want to delete this report?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      showNotification("Report deleted successfully", "success");
      loadUserReports(); // Refresh the list

      // If we deleted the current report, clear the form
      if (currentReportId === reportId) {
        currentReportId = null;
        localStorage.removeItem("currentReportId");
        clearForm();
      }
    } else {
      showNotification("Failed to delete report", "error");
    }
  } catch (error) {
    console.error("Delete report error:", error);
    showNotification("Error deleting report", "error");
  }
}

// Forgot password functions
document.getElementById("forgot-password-link").addEventListener("click", (e) => {
  e.preventDefault();
  hideAuthModal();
  showForgotPasswordModal();
});

document.getElementById("forgot-password-form").addEventListener("submit", handleForgotPassword);

function showForgotPasswordModal() {
  document.getElementById("forgot-password-modal").classList.remove("hidden");
}

function hideForgotPasswordModal() {
  document.getElementById("forgot-password-modal").classList.add("hidden");
}

async function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      hideForgotPasswordModal();
      showNotification(data.message, "success");
    } else {
      showNotification(data.message || "Failed to send reset link", "error");
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    showNotification("Error sending reset link", "error");
  }
}

function clearForm() {
  // Clear all form fields
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.value = "";
  });

  // Clear tables
  casings = [];
  pumpingTestData = [];
  recoveryData = [];

  // Re-render tables
  addInitialCasingRow();
  addInitialPumpingTestRow();
  addInitialRecoveryDataRow();
}

function switchReportsTab(tabName) {
  document.querySelectorAll(".reports-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".reports-list").forEach((list) => {
    list.classList.add("hidden");
  });

  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`${tabName}-list`).classList.remove("hidden");
}

// Report generation
function generateReport() {
  // Update form data with current values
  updateFormDataFromInputs();

  // Generate report HTML
  const reportHTML = generateReportHTML();

  // Update preview
  const previewContent = document.getElementById("preview-content");
  previewContent.innerHTML = reportHTML;

  // Enable buttons
  document.getElementById("print-btn").disabled = false;
  document.getElementById("download-btn").disabled = false;

  // Initialize charts after DOM is updated
  setTimeout(() => {
    try {
      updatePumpingTestChart();
      updateRecoveryDataChart();
      createReportCharts();
      reportGenerated = true;
      showNotification("Report generated successfully!");
    } catch (error) {
      console.error("Error generating charts:", error);
      showNotification("Report generated, but some charts may not display", "warning");
      reportGenerated = true;
    }
  }, 200);
}

function updateFormDataFromInputs() {
  document.querySelectorAll("input, textarea").forEach((input) => {
    if (input.name && formData.hasOwnProperty(input.name)) {
      formData[input.name] = input.value;
    }
  });
}

function generateTocHTML() {
  let tocHTML = "<ol>";

  if (formData.clientName || formData.projectCoordinator || formData.clientAddress || formData.projectLocation) {
    tocHTML += '<li><a href="#client-info">CLIENT INFORMATION</a></li>';
  }
  if (formData.contractorName || formData.drillingLicense || formData.contractorAddress || formData.drillingPermit) {
    tocHTML += '<li><a href="#contractor-info">CONTRACTOR INFORMATION</a></li>';
  }
  
  tocHTML += '<li><a href="#wrma-section">WRMA COMPLETION RECORD</a></li>';
  
  if (formData.introductionText || formData.projectScope || formData.drillingProcess) {
    tocHTML += '<li><a href="#project-intro">PROJECT INTRODUCTION</a></li>';
  }
  if (formData.boreholeCoordinates || formData.groundElevation || formData.totalDepth || formData.drillingMethod || formData.drillingStart || formData.drillingEnd) {
    tocHTML += '<li><a href="#borehole-details">BOREHOLE DETAILS</a></li>';
  }
  if (formData.purposeScope || formData.aquiferAnalysis || formData.recoveryMonitoring || formData.analysisObjectives) {
    tocHTML += '<li><a href="#borehole-params">BOREHOLE PARAMETERS</a></li>';
  }
  if (pumpingTestData.length > 0 && pumpingTestData.some((p) => p.date || p.clockTime || p.elapsedTime || p.waterLevel || p.drawdown || p.yield)) {
    tocHTML += '<li><a href="#pumping-test">PUMPING TEST DATA</a></li>';
  }
  if (recoveryData.length > 0 && recoveryData.some((r) => r.date || r.clockTime || r.elapsedTime || r.waterLevel || r.recovery)) {
    tocHTML += '<li><a href="#recovery-test">RECOVERY TEST DATA</a></li>';
  }
  if (formData.transmissivityIntro || formData.transmissivityFormula || formData.transmissivityConclusion || formData.specificCapacityIntro || formData.specificCapacityFormula || formData.specificCapacityConclusion || formData.pumpSafeIntro || formData.pumpSafeFormula || formData.pumpSafeConclusion) {
    tocHTML += '<li><a href="#calculations">CALCULATIONS</a></li>';
  }
  if (formData.recommendations || formData.conclusions) {
    tocHTML += '<li><a href="#recommendations">RECOMMENDATIONS & CONCLUSIONS</a></li>';
  }
  if (formData.preparedBy || formData.reportDate) {
    tocHTML += '<li><a href="#report-details">REPORT DETAILS</a></li>';
  }
  if (formData.wrmaTotalDepth || formData.totalDepth) {
    tocHTML += '<li><a href="#borehole-sketch">BOREHOLE DESIGN SKETCH</a></li>';
  }
  if (formData.nearestTownLatitude && formData.boreholeLatitude) {
    tocHTML += '<li><a href="#location-map">LOCATION SKETCH MAP</a></li>';
  }

  tocHTML += "</ol>";
  return tocHTML;
}

function generateWrmaSectionHTML() {
  const wrmaPlainCasingRows = wrmaPlainCasing
    .map(
      (casing) =>
        `<tr>
            <td>${casing.type || ""}</td>
            <td>${casing.diameter || ""}</td>
            <td>${casing.length || ""}</td>
            <td>${casing.from || ""}</td>
            <td>${casing.to || ""}</td>
        </tr>`
    )
    .join("");

  const wrmaSlottedCasingRows = wrmaSlottedCasing
    .map(
      (casing) =>
        `<tr>
            <td>${casing.type || ""}</td>
            <td>${casing.diameter || ""}</td>
            <td>${casing.length || ""}</td>
            <td>${casing.from || ""}</td>
            <td>${casing.to || ""}</td>
        </tr>`
    )
    .join("");

  return `
    <div class="report-section" id="wrma-section">
      <h2 class="section-title-doc">3.0 WRMA BOREHOLE COMPLETION RECORD</h2>

      <h3 class="section-subtitle-doc">PARTICULARS OF APPLICANT</h3>
      <table class="info-table-doc">
        <tr><td>Full name of applicant(s)</td><td>${formData.wrmaApplicantName || ""}</td></tr>
        <tr><td>Category of Applicant</td><td>${formData.wrmaCategory || ""}</td></tr>
        <tr><td>ID Number/Certificate</td><td>${formData.wrmaIdNumber || ""}</td></tr>
        <tr><td>PIN number</td><td>${formData.wrmaPinNumber || ""}</td></tr>
        <tr><td>Physical Address</td><td>${formData.wrmaPhysicalAddress || ""}</td></tr>
        <tr><td>L.R. Number</td><td>${formData.wrmaLrNumber || ""}</td></tr>
        <tr><td>Village/Ward</td><td>${formData.wrmaVillageWard || ""}</td></tr>
        <tr><td>Sub-location</td><td>${formData.wrmaSubLocation || ""}</td></tr>
        <tr><td>Location</td><td>${formData.wrmaLocation || ""}</td></tr>
        <tr><td>Division</td><td>${formData.wrmaDivision || ""}</td></tr>
        <tr><td>District</td><td>${formData.wrmaDistrict || ""}</td></tr>
      </table>

      <h3 class="section-subtitle-doc">PARTICULARS OF CONTRACTOR</h3>
      <table class="info-table-doc">
        <tr><td>Contractor Name</td><td>${formData.wrmaContractorName || ""}</td></tr>
        <tr><td>License Number</td><td>${formData.wrmaLicenseNumber || ""}</td></tr>
        <tr><td>Gazetted On</td><td>${formData.wrmaGazettedDate || ""}</td></tr>
        <tr><td>Drilling Supervisor</td><td>${formData.wrmaDrillingSupervisor || ""}</td></tr>
        <tr><td>Drill Rig Type</td><td>${formData.wrmaDrillRigType || ""}</td></tr>
      </table>

      <h3 class="section-subtitle-doc">BOREHOLE CONSTRUCTION</h3>
      <table class="info-table-doc">
        <tr><td>Type of Borehole</td><td>${formData.wrmaBoreholeType || ""}</td></tr>
        <tr><td>Intended Use</td><td>${formData.wrmaWaterUse || ""}</td></tr>
        <tr><td>Drilling Start</td><td>${formData.wrmaDrillingStart || ""}</td></tr>
        <tr><td>Drilling End</td><td>${formData.wrmaDrillingEnd || ""}</td></tr>
        <tr><td>Total Depth</td><td>${formData.wrmaTotalDepth ? formData.wrmaTotalDepth + " m" : ""}</td></tr>
      </table>

      ${(formData.wrmaHoleDiameter1 || formData.wrmaHoleDiameter2) ? `
      <h3 class="section-subtitle-doc">Hole Diameter</h3>
      <table class="casing-table-doc">
        <thead>
          <tr>
            <th>Hole Diameter (mm)</th>
            <th>From (m)</th>
            <th>To (m)</th>
          </tr>
        </thead>
        <tbody>
          ${formData.wrmaHoleDiameter1 ? `<tr><td>${formData.wrmaHoleDiameter1} mm</td><td>${formData.wrmaHoleFrom1 || ""}</td><td>${formData.wrmaHoleTo1 || ""}</td></tr>` : ""}
          ${formData.wrmaHoleDiameter2 ? `<tr><td>${formData.wrmaHoleDiameter2} mm</td><td>${formData.wrmaHoleFrom2 || ""}</td><td>${formData.wrmaHoleTo2 || ""}</td></tr>` : ""}
        </tbody>
      </table>` : ""}

      ${wrmaPlainCasing.length > 0 && wrmaPlainCasing.some(c => c.type || c.diameter || c.length || c.from || c.to) ? `
      <h3 class="section-subtitle-doc">Plain Casing Details</h3>
      <table class="casing-table-doc">
        <thead>
          <tr>
            <th>Type</th>
            <th>Diam (mm)</th>
            <th>Length (m)</th>
            <th>From (m)</th>
            <th>To (m)</th>
          </tr>
        </thead>
        <tbody>
          ${wrmaPlainCasingRows}
        </tbody>
      </table>` : ""}

      ${wrmaSlottedCasing.length > 0 && wrmaSlottedCasing.some(c => c.type || c.diameter || c.length || c.from || c.to) ? `
      <h3 class="section-subtitle-doc">Slotted Casing Details</h3>
      <table class="casing-table-doc">
        <thead>
          <tr>
            <th>Type</th>
            <th>Diam (mm)</th>
            <th>Length (m)</th>
            <th>From (m)</th>
            <th>To (m)</th>
          </tr>
        </thead>
        <tbody>
          ${wrmaSlottedCasingRows}
        </tbody>
      </table>` : ""}

      ${formData.wrmaGravelSize ? `
      <h3 class="section-subtitle-doc">GRAVEL PACK</h3>
      <table class="info-table-doc">
        <tr><td>Size of grains (mm)</td><td>${formData.wrmaGravelSize || ""}</td></tr>
        <tr><td>Roundness</td><td>${formData.wrmaGravelRoundness || ""}</td></tr>
        <tr><td>Volume (KG)</td><td>${formData.wrmaGravelVolume || ""}</td></tr>
        <tr><td>From (m)</td><td>${formData.wrmaGravelFrom || ""}</td></tr>
        <tr><td>To (m)</td><td>${formData.wrmaGravelTo || ""}</td></tr>
      </table>` : ""}

      <h3 class="section-subtitle-doc">AQUIFER INFORMATION</h3>
      <table class="info-table-doc">
        <tr><td>1st Water Struck at (m)</td><td>${formData.wrmaFirstWaterStruck || ""}</td></tr>
        <tr><td>Main Aquifer Struck at (m)</td><td>${formData.wrmaMainAquiferStruck || ""}</td></tr>
        <tr><td>Water bearing material</td><td>${formData.wrmaWaterBearingMaterial || ""}</td></tr>
        <tr><td>From (m)</td><td>${formData.wrmaAquiferFrom || ""}</td></tr>
        <tr><td>To (m)</td><td>${formData.wrmaAquiferTo || ""}</td></tr>
      </table>

      <h3 class="section-subtitle-doc">YIELD INFORMATION</h3>
      <table class="info-table-doc">
        <tr><td>Static Water Level (SWL)</td><td>${formData.wrmaSwl ? formData.wrmaSwl + " m" : ""}</td></tr>
        <tr><td>Pumping Water Level (PWL)</td><td>${formData.wrmaPwl ? formData.wrmaPwl + " m" : ""}</td></tr>
        <tr><td>Discharge</td><td>${formData.wrmaDischarge ? formData.wrmaDischarge + " l/min" : ""}</td></tr>
        <tr><td>Pumping Duration</td><td>${formData.wrmaPumpingHours ? formData.wrmaPumpingHours + " hrs" : ""}</td></tr>
        <tr><td>Recovery Time</td><td>${formData.wrmaRecoveryTime ? formData.wrmaRecoveryTime + " min" : ""}</td></tr>
        <tr><td>Expected Discharge</td><td>${formData.wrmaExpectedDischarge ? formData.wrmaExpectedDischarge + " l/hr" : ""}</td></tr>
        <tr><td>Pump Setting</td><td>${formData.wrmaPumpSetting ? formData.wrmaPumpSetting + " m" : ""}</td></tr>
      </table>

      <h3 class="section-subtitle-doc">WATER QUALITY</h3>
      <table class="info-table-doc">
        <tr><td>Sample Collected</td><td>${formData.wrmaSampleCollected || ""}</td></tr>
        <tr><td>Collection Time</td><td>${formData.wrmaSampleTime || ""}</td></tr>
        <tr><td>Collection Date</td><td>${formData.wrmaSampleDate || ""}</td></tr>
        <tr><td>Sediment</td><td>${formData.wrmaSediment || ""}</td></tr>
        <tr><td>Taste</td><td>${formData.wrmaTaste || ""}</td></tr>
        <tr><td>Odour</td><td>${formData.wrmaOdour || ""}</td></tr>
      </table>

      <div class="remarks-section" style="margin-top: 1rem;">
        <h3>Remarks:</h3>
        <p>${formData.wrmaRemarks || "N/A"}</p>
      </div>

      <div class="signature-section" style="display: flex; justify-content: space-between; margin-top: 2rem;">
        <div class="signature-block">
          <p>Drilling Supervisor: ${formData.wrmaDrillingSupervisorName || ""}</p>
          <p style="margin-top: 2rem;">Signature: _________________________</p>
          <p style="margin-top: 1rem;">Date: ${formData.wrmaDrillingSupervisorDate || ""}</p>
        </div>
        <div class="signature-block">
          <p>Contractor: ${formData.wrmaContractorName || ""}</p>
          <p style="margin-top: 2rem;">Signature: _________________________</p>
          <p style="margin-top: 1rem;">Date: ${formData.wrmaContractorDate || ""}</p>
        </div>
      </div>
    </div>
  `;
}


function generateReportHTML() {
  const casingTableRows = casings
    .map(
      (casing) =>
        `<tr>
                  <td>${casing.from || "-"}</td>
                  <td>${casing.to || "-"}</td>
                  <td>${casing.material || "-"}</td>
                  <td>${casing.type || "-"}</td>
                  <td>${casing.remarks || "-"}</td>
              </tr>`
    )
    .join("");

  const pumpingTestTableRows = pumpingTestData
    .map(
      (data) =>
        `<tr>
                  <td>${data.time || "-"}</td>
                  <td>${data.waterLevel || "-"}</td>
                  <td>${data.drawdown || "-"}</td>
                  <td>${data.flowRate || "-"}</td>
              </tr>`
    )
    .join("");

  const recoveryDataTableRows = recoveryData
    .map(
      (data) =>
        `<tr>
                  <td>${data.time || "-"}</td>
                  <td>${data.waterLevel || "-"}</td>
                  <td>${data.recovery || "-"}</td>
              </tr>`
    )
    .join("");

  // Check if there's valid data for charts
  const hasPumpingTestData = pumpingTestData.some((d) => d.time && d.drawdown);
  const hasRecoveryData = recoveryData.some((d) => d.time && d.recovery);

  // Format dates
  const reportDate = formData.reportDate
    ? new Date(formData.reportDate).toLocaleDateString()
    : new Date().toLocaleDateString();

  const drillingStartDate = formData.drillingStart
    ? new Date(formData.drillingStart).toLocaleDateString()
    : "N/A";

  const drillingEndDate = formData.drillingEnd
    ? new Date(formData.drillingEnd).toLocaleDateString()
    : "N/A";

  const tocHTML = generateTocHTML();
  const wrmaHTML = generateWrmaSectionHTML();

  return `
    <div class="report-document">
      <!-- Cover Page -->
      <div class="report-cover">
        <div class="cover-content">
          <div class="cover-logo">
            <img src="images/BKM.png" alt="Booker Investment Group Logo">
          </div>
          <h1>BOREHOLE COMPLETION REPORT</h1>
          <div class="cover-divider"></div>
          <h2>FOR</h2>
          <h3>${formData.clientName || "Client Name"}</h3>
          <h2>AT</h2>
          <h3>${formData.projectLocation || "Project Location"}</h3>
          <div class="cover-date">${reportDate}</div>
          <div class="cover-compiler">COMPILED BY: ${
            formData.preparedBy || "Hydrogeologist Name"
          }</div>
          <div class="cover-brand">
            <p>Booker Investment Group Ltd</p>
            <p>Professional Water Well Drilling Services</p>
          </div>
        </div>
      </div>

      <!-- Table of Contents -->
      <div class="report-toc">
        <h2>TABLE OF CONTENTS</h2>
        ${tocHTML}
      </div>
                  
      <div class="report-section" id="client-info">
        <h2 class="section-title-doc">1. CLIENT INFORMATION</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Client Name:</span>
            <span>${formData.clientName || "N/A"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Project Coordinator:</span>
            <span>${formData.projectCoordinator || "N/A"}</span>
          </div>
        </div>
        <div class="info-item">
          <span class="info-label">Client Address:</span>
          <span>${formData.clientAddress || "N/A"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Project Location:</span>
          <span>${formData.projectLocation || "N/A"}</span>
        </div>
      </div>
      
      <div class="report-section" id="contractor-info">
        <h2 class="section-title-doc">2. CONTRACTOR INFORMATION</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Contractor:</span>
            <span>${formData.contractorName || "N/A"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">License No:</span>
            <span>${formData.drillingLicense || "N/A"}</span>
          </div>
        </div>
        <div class="info-item">
          <span class="info-label">Address:</span>
          <span>${formData.contractorAddress || "N/A"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Permit No:</span>
          <span>${formData.drillingPermit || "N/A"}</span>
        </div>
      </div>

      ${wrmaHTML}
 
      ${
  formData.introductionText || formData.projectScope || formData.drillingProcess
    ? `
<div class="report-section" id="project-intro">
  <h2 class="section-title-doc">1.0 INTRODUCTION</h2>
  ${
    formData.introductionText
      ? `
  <div class="mb-4">
    <p>${formData.introductionText}</p>
  </div>`
      : ""
  }
  ${
    formData.projectScope
      ? `
  <div class="mb-4">
    <h3><strong>1.1 Scope of the Project:</strong></h3>
    <p style="white-space: pre-line;">${formData.projectScope}</p>
  </div>`
      : ""
  }
  ${
    formData.drillingProcess
      ? `
  <div class="mb-4">
    <h3><strong>1.2 Drilling Process and Activities:</strong></h3>
    <p style="white-space: pre-line;">${formData.drillingProcess}</p>
  </div>`
      : ""
  }
</div>`
    : ""
}
      
     <div class="report-section" id="borehole-details">
  <h2 class="section-title-doc">2.0 BOREHOLE DETAILS</h2>
  <div class="info-grid">
    <div class="info-item">
      <span class="info-label">GPS Coordinates:</span>
      <span>${formData.boreholeCoordinates || "N/A"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Ground Elevation:</span>
      <span>${
        formData.groundElevation ? formData.groundElevation + " m" : "N/A"
      }</span>
    </div>
    <div class="info-item">
      <span class="info-label">Total Depth:</span>
      <span>${
        formData.totalDepth ? formData.totalDepth + " m" : "N/A"
      }</span>
    </div>
    <div class="info-item">
      <span class="info-label">Drilling Method:</span>
      <span>${formData.drillingMethod || "N/A"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Start Date:</span>
      <span>${drillingStartDate}</span>
    </div>
    <div class="info-item">
      <span class="info-label">End Date:</span>
      <span>${drillingEndDate}</span>
    </div>
  </div>
  
  ${
    formData.casingInstallationDesc || casings.length > 0
      ? `
  <div class="mt-4">
    <h3><strong>2.1 Installation of Casings and Gravel Pack</strong></h3>
    ${
      formData.casingInstallationDesc
        ? `<p>${formData.casingInstallationDesc}</p>`
        : ""
    }
    
    ${
      casings.length > 0 &&
      casings.some((c) => c.from || c.to || c.material)
        ? `
    <div class="mt-2">
      <h4>Table 1: Description of types of casings installed at various depths in the borehole</h4>
      <table class="casing-table-doc">
        <thead>
          <tr>
            <th>Depth in meters</th>
            <th>Material description</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${casings
            .map(
              (casing) => `
            <tr>
              <td>${casing.from || ""}-${casing.to || ""}</td>
              <td>${casing.material || "-"}</td>
              <td>${casing.remarks || "-"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>`
        : ""
    }
    
    ${
      formData.gravelPackDesc
        ? `<p class="mt-2">${formData.gravelPackDesc}</p>`
        : ""
    }
  </div>`
      : ""
  }
  
  ${
    formData.boreholeCleaning
      ? `
  <div class="mt-4">
    <h3><strong>2.2 Borehole Cleaning/Development</strong></h3>
    <p>${formData.boreholeCleaning}</p>
  </div>`
      : ""
  }
  
  ${
    formData.testPumping
      ? `
  <div class="mt-4">
    <h3><strong>2.3 Test-Pumping</strong></h3>
    <p>${formData.testPumping}</p>
  </div>`
      : ""
  }
</div>
     <div class="report-section" id="borehole-params">
     
  <h2 class="section-title-doc">3.0 BOREHOLE PARAMETERS</h2>
  
  ${
    formData.purposeScope
      ? `
  <div class="mb-4">
    <h3><strong>3.1 Purpose and Scope</strong></h3>
    <p>${formData.purposeScope}</p>
  </div>`
      : ""
  }
  
  ${
    formData.aquiferAnalysis
      ? `
  <div class="mb-4">
    <p>${formData.aquiferAnalysis}</p>
  </div>`
      : ""
  }
  
  ${
    formData.recoveryMonitoring
      ? `
  <div class="mb-4">
    <p>${formData.recoveryMonitoring}</p>
  </div>`
      : ""
  }
  
  ${
    formData.analysisObjectives
      ? `
  <div class="mb-4">
    <p style="white-space: pre-line;">${formData.analysisObjectives}</p>
  </div>`
      : ""
  }
  
  <div class="mt-4">
    <h3><strong>AQUIFER TEST ANALYSIS</strong></h3>
    <table class="casing-table-doc">
      <thead>
        <tr>
          <th style="width: 60%;">Parameter</th>
          <th style="width: 40%;">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Borehole depth</td><td>${formData.aquiferBoreholeDepth || "N/A"}</td></tr>
        <tr><td>Pump type used</td><td>${formData.aquiferPumpType || "N/A"}</td></tr>
        <tr><td>Pump setting depth</td><td>${formData.aquiferPumpSetting || "N/A"}</td></tr>
        <tr><td>Static water level</td><td>${formData.aquiferStaticLevel || "N/A"}</td></tr>
        <tr><td>Pumping water level</td><td>${formData.aquiferPumpingLevel || "N/A"}</td></tr>
        <tr><td>Pumped-discharge capacity</td><td>${formData.aquiferDischarge || "N/A"}</td></tr>
        <tr><td>Cumulative drawdown</td><td>${formData.aquiferCumulativeDrawdown || "N/A"}</td></tr>
        <tr><td>Residual draw down (%)</td><td>${formData.aquiferResidualDrawdown || "N/A"}</td></tr>
        <tr><td>Cumulative drawdown (%)</td><td>${formData.aquiferCumulativePercent || "N/A"}</td></tr>
        <tr><td>Duration for the recharge (minutes)</td><td>${formData.aquiferRechargeDuration || "N/A"}</td></tr>
        <tr><td>Duration of test</td><td>${formData.aquiferTestDuration || "N/A"}</td></tr>
        <tr><td>Date of test 1</td><td>${formData.aquiferTestDate || "N/A"}</td></tr>
      </tbody>
    </table>
  </div>
</div>
      

     ${
  pumpingTestData.length > 0 &&
  pumpingTestData.some((d) => d.date || d.clockTime || d.elapsedTime || d.waterLevel || d.drawdown || d.yield)
    ? `
<div class="report-section" id="pumping-test">
  <h2 class="section-title-doc">PUMPING TEST DATA</h2>
  
  <!-- Test Info Table -->
  <table class="test-info-table">
    <tr>
      <td><strong>Bore hole No</strong></td>
      <td>${formData.boreholeNo || ""}</td>
      <td><strong>Datum level (m)</strong></td>
      <td>${formData.datumLevel || "0.1"}</td>
    </tr>
    <tr>
      <td><strong>Client Name</strong></td>
      <td>${formData.pumpClientName || formData.clientName || ""}</td>
      <td><strong>Pump level (m)</strong></td>
      <td>${formData.pumpLevel || "52"}</td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td>${formData.pumpLocation || formData.projectLocation || ""}</td>
      <td><strong>Pump type</strong></td>
      <td>${formData.pumpTypeTest || "DSD3-18"}</td>
    </tr>
    <tr>
      <td><strong>Static water level</strong></td>
      <td>${formData.staticLevelTest || "2.00"}</td>
      <td>Metres bgl</td>
      <td><strong>Pipe type &size</strong></td>
      <td>${formData.pipeTypeSize || 'uPVC 1.25"'}</td>
    </tr>
    <tr>
      <td><strong>Pumping water level</strong></td>
      <td>${formData.pumpingLevelTest || "12.66"}</td>
      <td>Metres bgl</td>
      <td><strong>Power source</strong></td>
      <td>${formData.powerSource || "20KVA"}</td>
    </tr>
    <tr>
      <td><strong>Total draw down</strong></td>
      <td>${formData.totalDrawdownTest || "10.66"}</td>
      <td>Metres</td>
      <td><strong>Water column (m)</strong></td>
      <td>${formData.waterColumn || "58.00"}</td>
    </tr>
    <tr>
      <td><strong>Bore hole Depth</strong></td>
      <td>${formData.boreholeDepthTest || "60.00"}</td>
      <td>Metres bgl</td>
      <td></td>
      <td></td>
    </tr>
  </table>

  <h3 style="text-align: center; margin: 1.5rem 0;">DISCHARGE DRAW DOWN TEST (24hrs)</h3>
  
  <table class="casing-table-doc">
    <thead>
      <tr>
        <th>DATE</th>
        <th>CLOCK TIME(hrs)</th>
        <th>ELAPSED TIME(min)</th>
        <th>WATER LEVEL (m)</th>
        <th>DRAW DOWN (m)</th>
        <th>YIELD (m³/h)</th>
        <th>EC (w/cm)</th>
        <th>REMARKS</th>
      </tr>
    </thead>
    <tbody>
      ${pumpingTestData
        .map(
          (data) => `
        <tr>
          <td>${data.date || "-"}</td>
          <td>${data.clockTime || "-"}</td>
          <td>${data.elapsedTime || "-"}</td>
          <td>${data.waterLevel || "-"}</td>
          <td>${data.drawdown || "-"}</td>
          <td>${data.yield || "-"}</td>
          <td>${data.ec || "-"}</td>
          <td>${data.remarks || "-"}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
  
  ${
    pumpingTestData.filter((d) => d.elapsedTime && d.waterLevel).length > 0
      ? `
  <div class="charts-row">
    <div class="report-chart-container">
      <h4>WATER LEVEL VS TIME</h4>
      <canvas id="report-pumping-test-chart" width="250" height="150"></canvas>
    </div>
  </div>`
      : ""
  }
</div>`
    : ""
}
${
  recoveryData.length > 0 &&
  recoveryData.some((d) => d.date || d.clockTime || d.elapsedTime || d.waterLevel || d.recovery)
    ? `
<div class="report-section" id="recovery-test">
  <h2 class="section-title-doc">RECOVERY TEST DATA</h2>
  
  <!-- Test Info Table -->
  <table class="test-info-table">
    <tr>
      <td><strong>Bore hole No</strong></td>
      <td>${formData.recoveryBoreholeNo || formData.boreholeNo || ""}</td>
      <td><strong>Datum level</strong></td>
      <td>${formData.recoveryDatumLevel || formData.datumLevel || "0.1"}</td>
    </tr>
    <tr>
      <td><strong>Client Name</strong></td>
      <td>${formData.recoveryClientName || formData.clientName || ""}</td>
      <td><strong>Pump level</strong></td>
      <td>${formData.recoveryPumpLevel || formData.pumpLevel || "52"}</td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td>${formData.recoveryLocation || formData.projectLocation || ""}</td>
      <td><strong>Pump type</strong></td>
      <td>${formData.recoveryPumpType || formData.pumpTypeTest || "DSD3-18"}</td>
    </tr>
    <tr>
      <td><strong>Static water level</strong></td>
      <td>${formData.recoveryStaticLevel || formData.staticLevelTest || "2.00"}</td>
      <td><strong>Pipe type &size</strong></td>
      <td>${formData.recoveryPipeType || formData.pipeTypeSize || 'uPVC 1.25"'}</td>
    </tr>
    <tr>
      <td><strong>Pumping water level</strong></td>
      <td>${formData.recoveryPumpingLevel || formData.pumpingLevelTest || "12.66"}</td>
      <td><strong>Power source</strong></td>
      <td>${formData.recoveryPowerSource || formData.powerSource || "20KVA"}</td>
    </tr>
    <tr>
      <td><strong>Total draw down</strong></td>
      <td>${formData.recoveryTotalDrawdown || formData.totalDrawdownTest || "10.66"}</td>
      <td><strong>Water column</strong></td>
      <td>${formData.recoveryWaterColumn || formData.waterColumn || "58.00"}</td>
    </tr>
    <tr>
      <td><strong>Bore hole Depth</strong></td>
      <td>${formData.recoveryBoreholeDepth || formData.boreholeDepthTest || "60.00"}</td>
      <td></td>
      <td></td>
    </tr>
  </table>

  <h3 style="text-align: center; margin: 1.5rem 0;">RECOVERY MEASUREMENT 24 HRS</h3>
  
  <table class="casing-table-doc">
    <thead>
      <tr>
        <th>DATE</th>
        <th>CLOCK TIME(hrs)</th>
        <th>ELAPSED TIME(min)</th>
        <th>WATER LEVEL(m)</th>
        <th>RECOVERY (m)</th>
        <th>EFFICIENCY%</th>
        <th>COMMENT</th>
      </tr>
    </thead>
    <tbody>
      ${recoveryData
        .map(
          (data) => `
        <tr>
          <td>${data.date || "-"}</td>
          <td>${data.clockTime || "-"}</td>
          <td>${data.elapsedTime || "-"}</td>
          <td>${data.waterLevel || "-"}</td>
          <td>${data.recovery || "-"}</td>
          <td>${data.efficiency || "-"}</td>
          <td>${data.comment || "-"}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
  
  ${
    formData.recoveryAnalysis
      ? `
  <div class="mt-4">
    <p>${formData.recoveryAnalysis}</p>
  </div>`
      : ""
  }
  
  ${
    recoveryData.filter((d) => d.elapsedTime && d.waterLevel).length > 0
      ? `
  <div class="charts-row">
    <div class="report-chart-container">
      <h4>RESIDUAL DRAWDOWN VS TIME</h4>
      <canvas id="report-recovery-data-chart" width="250" height="150"></canvas>
    </div>
  </div>`
      : ""
  }
</div>`
    : ""
}
      <div class="report-section" id="calculations">
  <h2 class="section-title-doc">CALCULATIONS</h2>
  
  <!-- TRANSMISSIVITY OF THE AQUIFER -->
  ${
    formData.transmissivityIntro || formData.transmissivityFormula || formData.transmissivityConclusion
      ? `
  <div class="mb-4">
    <h3><strong>TRANSMISSIVITY OF THE AQUIFER</strong></h3>
    ${
      formData.transmissivityIntro
        ? `<p style="white-space: pre-line;">${formData.transmissivityIntro}</p>`
        : ""
    }
    ${
      formData.transmissivityFormula
        ? `<div class="calculation-block">
             <pre style="font-family: 'Courier New', monospace; white-space: pre-wrap; background: #f5f5f5; padding: 1rem; border-radius: 4px; font-size: 0.9rem;">${formData.transmissivityFormula}</pre>
           </div>`
        : ""
    }
    ${
      formData.transmissivityConclusion
        ? `<p style="white-space: pre-line;">${formData.transmissivityConclusion}</p>`
        : ""
    }
  </div>`
      : ""
  }
  
  <!-- SPECIFIC CAPACITY -->
  ${
    formData.specificCapacityIntro || formData.specificCapacityFormula || formData.specificCapacityConclusion
      ? `
  <div class="mb-4">
    <h3><strong>SPECIFIC CAPACITY</strong></h3>
    ${
      formData.specificCapacityIntro
        ? `<p style="white-space: pre-line;">${formData.specificCapacityIntro}</p>`
        : ""
    }
    ${
      formData.specificCapacityFormula
        ? `<div class="calculation-block">
             <pre style="font-family: 'Courier New', monospace; white-space: pre-wrap; background: #f5f5f5; padding: 1rem; border-radius: 4px; font-size: 0.9rem;">${formData.specificCapacityFormula}</pre>
           </div>`
        : ""
    }
    ${
      formData.specificCapacityConclusion
        ? `<p style="white-space: pre-line;">${formData.specificCapacityConclusion}</p>`
        : ""
    }
  </div>`
      : ""
  }
  
  <!-- PUMP SAFE DESIGN -->
  ${
    formData.pumpSafeIntro || formData.pumpSafeFormula || formData.pumpSafeConclusion
      ? `
  <div class="mb-4">
    <h3><strong>PUMP SAFE DESIGN</strong></h3>
    ${
      formData.pumpSafeIntro
        ? `<p style="white-space: pre-line;">${formData.pumpSafeIntro}</p>`
        : ""
    }
    ${
      formData.pumpSafeFormula
        ? `<div class="calculation-block">
             <pre style="font-family: 'Courier New', monospace; white-space: pre-wrap; background: #f5f5f5; padding: 1rem; border-radius: 4px; font-size: 0.9rem;">${formData.pumpSafeFormula}</pre>
           </div>`
        : ""
    }
    ${
      formData.pumpSafeConclusion
        ? `<p style="white-space: pre-line;">${formData.pumpSafeConclusion}</p>`
        : ""
    }
  </div>`
      : ""
  }
</div>
      
      ${
        formData.recommendations || formData.conclusions
          ? `
      <div class="report-section" id="recommendations">
        <h2 class="section-title-doc">11. RECOMMENDATIONS & CONCLUSIONS</h2>
        ${
          formData.recommendations
            ? `
        <div class="mb-4">
          <h3><strong>Recommendations:</strong></h3>
          <p>${formData.recommendations}</p>
        </div>`
            : ""
        }
        ${
          formData.conclusions
            ? `
        <div class="mb-4">
          <h3><strong>Conclusions:</strong></h3>
          <p>${formData.conclusions}</p>
        </div>`
            : ""
        }
      </div>`
          : ""
      }
      
      <div class="report-section" id="report-details">
        <h2 class="section-title-doc">12. REPORT DETAILS</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Prepared By:</span>
            <span>${formData.preparedBy || "N/A"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Report Date:</span>
            <span>${reportDate}</span>
          </div>
        </div>
      </div>

      <div class="report-section" id="borehole-sketch"></div>
      <div class="report-section" id="location-map"></div>
      
      <div class="report-section text-center">
        <p><strong>This report is generated by Booker Investment Group Ltd</strong></p>
        <p>Professional Water Well Drilling Services</p>
        <p>Contact: bookerinvestmentgroupltd@gmail.com | +254 722 536 867</p>
      </div>
    </div>
  `;
}
function generateWrmaSection(doc, y) {
  const margin = 15;
  
  // WRMA Section Header
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("7.0 WRMA BOREHOLE COMPLETION RECORD", margin, y);
  y += 8;

  // Applicant Details Table
  const applicantData = [
    ["Full name of applicant(s)", formData.wrmaApplicantName || ""],
    ["Category of Applicant", formData.wrmaCategory || ""],
    ["ID Number/Certificate", formData.wrmaIdNumber || ""],
    ["PIN number", formData.wrmaPinNumber || ""],
    ["Physical Address", formData.wrmaPhysicalAddress || ""],
    ["L.R. Number", formData.wrmaLrNumber || ""],
    ["Village/Ward", formData.wrmaVillageWard || ""],
    ["Sub-location", formData.wrmaSubLocation || ""],
    ["Location", formData.wrmaLocation || ""],
    ["Division", formData.wrmaDivision || ""],
    ["District", formData.wrmaDistrict || ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["PARTICULARS OF APPLICANT", "DETAILS"]],
    body: applicantData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });
  
  y = doc.lastAutoTable.finalY + 5;

  // Contractor Details
  const contractorData = [
    ["Contractor Name", formData.wrmaContractorName || ""],
    ["License Number", formData.wrmaLicenseNumber || ""],
    ["Gazetted On", formData.wrmaGazettedDate || ""],
    ["Drilling Supervisor", formData.wrmaDrillingSupervisor || ""],
    ["Drill Rig Type", formData.wrmaDrillRigType || ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["PARTICULARS OF CONTRACTOR", "DETAILS"]],
    body: contractorData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 5;

  // Borehole Construction Details
  const constructionData = [
    ["Type of Borehole", formData.wrmaBoreholeType || ""],
    ["Intended Use", formData.wrmaWaterUse || ""],
    ["Drilling Start", formData.wrmaDrillingStart || ""],
    ["Drilling End", formData.wrmaDrillingEnd || ""],
    ["Total Depth", formData.wrmaTotalDepth ? formData.wrmaTotalDepth + " m" : ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["BOREHOLE CONSTRUCTION", "DETAILS"]],
    body: constructionData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 5;

  // Hole Diameter Details
  if (formData.wrmaHoleDiameter1 || formData.wrmaHoleDiameter2) {
    const holeData = [];
    if (formData.wrmaHoleDiameter1) {
      holeData.push([
        formData.wrmaHoleDiameter1 + " mm",
        formData.wrmaHoleFrom1 || "",
        formData.wrmaHoleTo1 || ""
      ]);
    }
    if (formData.wrmaHoleDiameter2) {
      holeData.push([
        formData.wrmaHoleDiameter2 + " mm",
        formData.wrmaHoleFrom2 || "",
        formData.wrmaHoleTo2 || ""
      ]);
    }

    doc.autoTable({
      startY: y,
      head: [["Hole Diameter (mm)", "From (m)", "To (m)"]],
      body: holeData,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [60, 60, 60], textColor: 255 },
      margin: { left: margin, right: margin }
    });

    y = doc.lastAutoTable.finalY + 5;
  }

  // Casing Details
  if (wrmaPlainCasing.length > 0 || wrmaSlottedCasing.length > 0) {
    // Plain Casing
    if (wrmaPlainCasing.length > 0) {
      const plainCasingData = wrmaPlainCasing.map(casing => [
        casing.type || "",
        casing.diameter || "",
        casing.length || "",
        casing.from || "",
        casing.to || ""
      ]);

      doc.autoTable({
        startY: y,
        head: [["Plain Casing - Type", "Diam (mm)", "Length (m)", "From (m)", "To (m)"]],
        body: plainCasingData,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 1.5 },
        headStyles: { fillColor: [80, 80, 80], textColor: 255 },
        margin: { left: margin, right: margin }
      });

      y = doc.lastAutoTable.finalY + 5;
    }

    // Slotted Casing
    if (wrmaSlottedCasing.length > 0) {
      const slottedCasingData = wrmaSlottedCasing.map(casing => [
        casing.type || "",
        casing.diameter || "",
        casing.length || "",
        casing.from || "",
        casing.to || ""
      ]);

      doc.autoTable({
        startY: y,
        head: [["Slotted Casing - Type", "Diam (mm)", "Length (m)", "From (m)", "To (m)"]],
        body: slottedCasingData,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 1.5 },
        headStyles: { fillColor: [80, 80, 80], textColor: 255 },
        margin: { left: margin, right: margin }
      });

      y = doc.lastAutoTable.finalY + 5;
    }
  }

  // Gravel Pack Details
  if (formData.wrmaGravelSize) {
    const gravelData = [
      ["Size of grains (mm)", formData.wrmaGravelSize || ""],
      ["Roundness", formData.wrmaGravelRoundness || ""],
      ["Volume (KG)", formData.wrmaGravelVolume || ""],
      ["From (m)", formData.wrmaGravelFrom || ""],
      ["To (m)", formData.wrmaGravelTo || ""]
    ];

    doc.autoTable({
      startY: y,
      head: [["GRAVEL PACK", "DETAILS"]],
      body: gravelData,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40], textColor: 255 },
      margin: { left: margin, right: margin }
    });

    y = doc.lastAutoTable.finalY + 5;
  }

  // Aquifer Information
  const aquiferData = [
    ["1st Water Struck at (m)", formData.wrmaFirstWaterStruck || ""],
    ["Main Aquifer Struck at (m)", formData.wrmaMainAquiferStruck || ""],
    ["Water bearing material", formData.wrmaWaterBearingMaterial || ""],
    ["From (m)", formData.wrmaAquiferFrom || ""],
    ["To (m)", formData.wrmaAquiferTo || ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["AQUIFER INFORMATION", "DETAILS"]],
    body: aquiferData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 5;

  // Yield Information
  const yieldData = [
    ["Static Water Level (SWL)", formData.wrmaSwl ? formData.wrmaSwl + " m" : ""],
    ["Pumping Water Level (PWL)", formData.wrmaPwl ? formData.wrmaPwl + " m" : ""],
    ["Discharge", formData.wrmaDischarge ? formData.wrmaDischarge + " l/min" : ""],
    ["Pumping Duration", formData.wrmaPumpingHours ? formData.wrmaPumpingHours + " hrs" : ""],
    ["Recovery Time", formData.wrmaRecoveryTime ? formData.wrmaRecoveryTime + " min" : ""],
    ["Expected Discharge", formData.wrmaExpectedDischarge ? formData.wrmaExpectedDischarge + " l/hr" : ""],
    ["Pump Setting", formData.wrmaPumpSetting ? formData.wrmaPumpSetting + " m" : ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["YIELD INFORMATION", "DETAILS"]],
    body: yieldData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 5;

  // Water Quality
  const qualityData = [
    ["Sample Collected", formData.wrmaSampleCollected || ""],
    ["Collection Time", formData.wrmaSampleTime || ""],
    ["Collection Date", formData.wrmaSampleDate || ""],
    ["Sediment", formData.wrmaSediment || ""],
    ["Taste", formData.wrmaTaste || ""],
    ["Odour", formData.wrmaOdour || ""]
  ];

  doc.autoTable({
    startY: y,
    head: [["WATER QUALITY", "DETAILS"]],
    body: qualityData,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 10;

  // Remarks
  if (formData.wrmaRemarks) {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text("Remarks:", margin, y);
    y += 4;
    
    doc.setFont("times", "normal");
    const remarksLines = doc.splitTextToSize(formData.wrmaRemarks, 180);
    doc.text(remarksLines, margin, y);
    y += remarksLines.length * 4 + 10;
  }

  // Signatures
  const signatureY = Math.max(y, 250);
  
  // Drilling Supervisor Signature
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  doc.text("Drilling Supervisor", margin, signatureY);
  doc.line(margin, signatureY + 1, margin + 40, signatureY + 1);
  doc.text(formData.wrmaDrillingSupervisorName || "", margin, signatureY + 8);
  doc.text("Date: " + (formData.wrmaDrillingSupervisorDate || ""), margin, signatureY + 16);

  // Contractor Signature
  doc.text("Contractor", margin + 100, signatureY);
  doc.line(margin + 100, signatureY + 1, margin + 140, signatureY + 1);
  doc.text(formData.wrmaContractorName || "", margin + 100, signatureY + 8);
  doc.text("Date: " + (formData.wrmaContractorDate || ""), margin + 100, signatureY + 16);

  return doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : signatureY + 30;
}
 const sketchSection = `
    ${formData.wrmaTotalDepth || formData.totalDepth ? `
    <div class="report-section" id="borehole-sketch">
      <h2 class="section-title-doc">7.1 BOREHOLE DESIGN SKETCH</h2>
      <div class="sketch-container" style="text-align: center; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <div id="sketch-placeholder" style="min-height: 400px; display: flex; align-items: center; justify-content: center;">
          <button onclick="generateSketchPreview()" class="btn" style="padding: 15px 30px;">
            <i class="fa-solid fa-image"></i> Generate Borehole Sketch
          </button>
        </div>
      </div>
      <p style="text-align: center; margin-top: 15px; font-size: 11px; color: #666;">
        Figure 1: Borehole design sketch showing the installation of casings, screens, and gravel pack.
      </p>
    </div>
    ` : ''}
    ${formData.nearestTownLatitude && formData.boreholeLatitude ? `
<div class="report-section" id="location-map">
  <h2 class="section-title-doc">7.2 LOCATION SKETCH MAP</h2>
  <div class="map-container" style="text-align: center; padding: 20px; background: #f9f9f9; border-radius: 8px;">
    <div id="location-map-placeholder" style="min-height: 400px; display: flex; align-items: center; justify-content: center;">
      <button onclick="generateLocationMapPreview()" class="btn" style="padding: 15px 30px;">
        <i class="fa-solid fa-map"></i> Generate Location Map
      </button>
    </div>
  </div>
  <p style="text-align: center; margin-top: 15px; font-size: 11px; color: #666;">
    Figure 2: Location sketch showing route from ${formData.nearestTownName || 'nearest town'} to borehole drilling site (Not Drawn To Scale)
  </p>
</div>
` : ''}
  `;
// Print and download functions
async function printReport() {
  if (!reportGenerated) {
    showNotification("Please generate the report first.", "error");
    return;
  }

  // Ensure charts are rendered in the preview
  createReportCharts();
  await new Promise(resolve => setTimeout(resolve, 500)); // Wait for charts to render

  const printContent = document.getElementById("preview-content").innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;

  // Re-initialize the UI
  location.reload();
}

// ---  BOREHOLE COMPLETION REPORT PDF GENERATOR (with charts) ---
async function downloadPDF() {
  showNotification("Generating PDF... Please wait", "info");
  
  if (!reportGenerated) {
    generateReport();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  try {
    updatePumpingTestChart();
    updateRecoveryDataChart();
    createReportCharts();
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Error rendering charts:", error);
  }
  
  // At the beginning of downloadPDF(), after chart rendering
console.log("=== PDF Generation Debug ===");
console.log("Pumping test data count:", pumpingTestData.length);
console.log("Valid pumping data:", pumpingTestData.filter(d => d.elapsedTime && d.waterLevel).length);
console.log("Recovery data count:", recoveryData.length);
console.log("Valid recovery data:", recoveryData.filter(d => d.elapsedTime && d.waterLevel).length);
console.log("Report generated:", reportGenerated);

// Check if chart canvases exist
const pumpingCanvas = document.getElementById("pumping-test-chart");
const recoveryCanvas = document.getElementById("recovery-data-chart");
console.log("Pumping chart exists:", !!pumpingCanvas);
console.log("Recovery chart exists:", !!recoveryCanvas);

if (pumpingCanvas) {
  console.log("Pumping chart dimensions:", pumpingCanvas.width, "x", pumpingCanvas.height);
}
if (recoveryCanvas) {
  console.log("Recovery chart dimensions:", recoveryCanvas.width, "x", recoveryCanvas.height);
}
 const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4", putOnlyUsedFonts: true });

  const margin = 15;
  let y = margin;
  const tocSections = [];

  const addTocEntry = (number, title, indent = 0) => {
    tocSections.push({
      number: number,
      title: title,
      page: doc.internal.getNumberOfPages(),
      indent: indent
    });
  };
  // ====== Utility Functions ======
  const addHeader = () => {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("BOOKER INVESTMENT GROUP LTD", margin, 10);
    doc.line(15, 12, 195, 12);
  };

  const addFooter = (pageNum, totalPages) => {
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Page ${pageNum} of ${totalPages}`, 105, 290, { align: "center" });
    doc.text(
      "Booker Investment Group Ltd | Good water makes life better",
      105,
      285,
      { align: "center" }
    );
  };

  const addSectionTitle = (title) => {
    doc.setFont("times", "bold");
    doc.setFontSize(13);
    y += 10;
    doc.text(title, margin, y);
    y += 6;
  };

  const addParagraph = (text, spacing = 6) => {
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, 180);
    if (y + lines.length * 6 > 270) {
      doc.addPage();
      addHeader();
      y = 20;
    }
    doc.text(lines, margin, y);
    y += lines.length * 6 + spacing;
  };

  const addLogo = async () => {
    try {
      const img = new Image();
      img.src = "images/BKM.png"; // Booker logo path
      await img.decode();
      doc.addImage(img, "PNG", 85, 15, 40, 25);
    } catch (e) {
      console.warn("Logo not found or failed to load");
    }
  };

 const addChartImage = async (canvasId, title) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn(`Canvas ${canvasId} not found`);
    return;
  }
  
  try {
    // Wait for chart to fully render
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if canvas has content
    const context = canvas.getContext('2d');
    if (!context) {
      console.warn(`Could not get context for ${canvasId}`);
      return;
    }
    
    // Get image data with error handling
    let chartImg;
    try {
      chartImg = canvas.toDataURL("image/png", 1.0);
    } catch (error) {
      console.error(`Error converting canvas ${canvasId} to data URL:`, error);
      return;
    }
    
    // Verify the image data is valid
    if (!chartImg || chartImg === "data:,") {
      console.warn(`Invalid image data for ${canvasId}`);
      return;
    }
    
    if (y > 180) {
      doc.addPage();
      addHeader();
      y = 25;
    }
    
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text(title, margin, y);
    y += 8;
    
    // Add the chart image with error handling
    try {
      doc.addImage(chartImg, "PNG", 25, y, 160, 90);
      y += 100;
    } catch (error) {
      console.error(`Error adding image ${canvasId} to PDF:`, error);
      // Add a text note instead of the image
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.text("Chart could not be generated", 25, y);
      y += 10;
    }
  } catch (error) {
    console.error(`Error in addChartImage for ${canvasId}:`, error);
  }
};
  // ====== TITLE PAGE ======
  await addLogo();
  y = 60;
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("BOREHOLE COMPLETION REPORT", 105, y, { align: "center" });

  y += 15;
  doc.setFontSize(14);
  doc.text("FOR", 105, y, { align: "center" });

  y += 10;
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text(formData.clientName || "Client Name", 105, y, { align: "center" });

  y += 12;
  doc.setFontSize(14);
  doc.text("AT", 105, y, { align: "center" });

  y += 10;
  doc.text(formData.projectLocation || "Project Location", 105, y, {
    align: "center",
  });

  y += 15;
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text(
    `Compiled by: ${formData.preparedBy || "Booker Investment Group Ltd"}`,
    105,
    y,
    { align: "center" }
  );

  y += 8;
  doc.text(
    `Date: ${formData.reportDate || new Date().toLocaleDateString()}`,
    105,
    y,
    { align: "center" }
  );

  y += 15;
  doc.setFontSize(11);
  doc.text(
    "P.O BOX 2014-40100, KISUMU | Tel: +254 722 536 867 | Email: bookerinvestment@yahoo.com",
    105,
    y,
    { align: "center" }
  );

  doc.addPage();
  addHeader();

// ====== TABLE OF CONTENTS (Placeholder - will be updated later) ======
const tocPageNumber = doc.internal.getNumberOfPages();
doc.setFont("times", "bold");
doc.setFontSize(16);
y = 25;
doc.text("TABLE OF CONTENTS", 105, y, { align: "center" });
y += 15;
const tocStartY = y;

// Reserve multiple pages for TOC if needed (estimate ~20 lines per page)
// Add blank pages for TOC
doc.addPage();
  // ====== 1.0 INTRODUCTION ======
addTocEntry("1.0", "INTRODUCTION");
addSectionTitle("1.0 INTRODUCTION");
if (formData.introductionText) {
  addParagraph(formData.introductionText);
}
if (formData.projectScope) {
  addTocEntry("1.1", "Scope of the Project", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("1.1 Scope of the Project", margin, y);
  y += 6;
  addParagraph(formData.projectScope);
}
if (formData.drillingProcess) {
  addTocEntry("1.2", "Drilling Process and Activities", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("1.2 Drilling Process and Activities", margin, y);
  y += 6;
  addParagraph(formData.drillingProcess);
}
  // ====== 2.0 CLIENT & CONTRACTOR ======
addTocEntry("2.0", "CLIENT & CONTRACTOR DETAILS");
addSectionTitle("2.0 CLIENT & CONTRACTOR DETAILS");
  addParagraph(
    `Client: ${formData.clientName || ""}\nAddress: ${
      formData.clientAddress || ""
    }\nProject Coordinator: ${formData.projectCoordinator || ""}`
  );
  addParagraph(
    `Contractor: ${formData.contractorName || ""}\nAddress: ${
      formData.contractorAddress || ""
    }\nLicense: ${formData.drillingLicense || ""}\nPermit: ${
      formData.drillingPermit || ""
    }`
  );

// ====== 3.0 BOREHOLE CONSTRUCTION ======
addTocEntry("3.0", "BOREHOLE CONSTRUCTION & DETAILS");
addSectionTitle("3.0 BOREHOLE CONSTRUCTION & DETAILS");
addParagraph(
  `Coordinates: ${formData.boreholeCoordinates || ""}\nDepth: ${
    formData.totalDepth || ""
  } m\nDrilling Method: ${
    formData.drillingMethod || ""
  }\nStart: ${formData.drillingStart || ""}\nEnd: ${
    formData.drillingEnd || ""
  }`
);

// 2.1 Installation of Casings
if (formData.casingInstallationDesc) {
  addTocEntry("3.1", "Installation of Casings and Gravel Pack", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("3.1 Installation of Casings and Gravel Pack", margin, y);
  y += 6;
  addParagraph(formData.casingInstallationDesc);
}

if (casings && casings.length > 0) {
  addTocEntry("", "Table 1: Description of types of casings", 15);
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("Table 1: Description of types of casings installed at various depths", margin, y);
  y += 5;
  
  doc.autoTable({
    startY: y,
    head: [["Depth in meters", "Material description", "Remarks"]],
    body: casings.map((c) => [
      `${c.from}-${c.to}`,
      c.material,
      c.remarks,
    ]),
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    margin: { left: margin },
  });
  y = doc.lastAutoTable.finalY + 10;
}

if (formData.gravelPackDesc) {
  addParagraph(formData.gravelPackDesc);
}

// 2.2 Borehole Cleaning
if (formData.boreholeCleaning) {
  addTocEntry("3.2", "Borehole Cleaning/Development", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("3.2 Borehole Cleaning/Development", margin, y);
  y += 6;
  addParagraph(formData.boreholeCleaning);
}

// 2.3 Test-Pumping
if (formData.testPumping) {
  addTocEntry("3.3", "Test-Pumping", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("3.3 Test-Pumping", margin, y);
  y += 6;
  addParagraph(formData.testPumping);
}
// ====== 4.0 BOREHOLE PARAMETERS ======
addTocEntry("4.0", "BOREHOLE PARAMETERS");
addSectionTitle("4.0 BOREHOLE PARAMETERS");

if (formData.purposeScope) {
  addTocEntry("4.1", "Purpose and Scope", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("4.1 Purpose and Scope", margin, y);
  y += 6;
  addParagraph(formData.purposeScope);
}

if (formData.aquiferAnalysis) {
  addParagraph(formData.aquiferAnalysis);
}

if (formData.recoveryMonitoring) {
  addParagraph(formData.recoveryMonitoring);
}

if (formData.analysisObjectives) {
  addParagraph(formData.analysisObjectives);
}

// Aquifer Test Analysis Table
addTocEntry("", "Table 2: Aquifer Test Analysis", 15);
doc.setFont("times", "bold");
doc.setFontSize(11);
if (y > 250) {
  doc.addPage();
  addHeader();
  y = 25;
}
doc.text("AQUIFER TEST ANALYSIS", margin, y);
y += 6;

const aquiferTestData = [
  ["Borehole depth", formData.aquiferBoreholeDepth || ""],
  ["Pump type used", formData.aquiferPumpType || ""],
  ["Pump setting depth", formData.aquiferPumpSetting || ""],
  ["Static water level", formData.aquiferStaticLevel || ""],
  ["Pumping water level", formData.aquiferPumpingLevel || ""],
  ["Pumped-discharge capacity", formData.aquiferDischarge || ""],
  ["Cumulative drawdown", formData.aquiferCumulativeDrawdown || ""],
  ["Residual draw down (%)", formData.aquiferResidualDrawdown || ""],
  ["Cumulative drawdown (%)", formData.aquiferCumulativePercent || ""],
  ["Duration for the recharge (minutes)", formData.aquiferRechargeDuration || ""],
  ["Duration of test", formData.aquiferTestDuration || ""],
  ["Date of test 1", formData.aquiferTestDate || ""]
];

doc.autoTable({
  startY: y,
  head: [["Parameter", "Value"]],
  body: aquiferTestData,
  theme: "grid",
  styles: { fontSize: 9, cellPadding: 3 },
  headStyles: { fillColor: [40, 40, 40], textColor: 255 },
  columnStyles: {
    0: { cellWidth: 110 },
    1: { cellWidth: 70 }
  },
  margin: { left: margin, right: margin }
});

y = doc.lastAutoTable.finalY + 10;
 /* // ====== 4.0 HYDRAULIC PARAMETERS ======
  addSectionTitle("4.0 HYDRAULIC PARAMETERS");
  addParagraph(
    `Static WL: ${formData.staticWaterLevel || ""} m\nDynamic WL: ${
      formData.dynamicWaterLevel || ""
    } m\nDrawdown: ${formData.drawdown || ""} m\nYield: ${
      formData.yield || ""
    } m³/hr`
  );
*/
 // ====== PUMPING TEST DATA ======
 console.log("Pumping test data for PDF:", pumpingTestData);
console.log("Has valid data:", pumpingTestData.some((p) => p.date || p.clockTime || p.elapsedTime));

if (pumpingTestData && pumpingTestData.length > 0 && 
    pumpingTestData.some((p) => p.date || p.clockTime || p.elapsedTime || p.waterLevel || p.drawdown || p.yield)) {
  
  addTocEntry("5.0", "PUMPING TEST DATA");
  // Add new page if needed
  if (y > 200) {
    doc.addPage();
    addHeader();
    y = 25;
  }
  
  addSectionTitle("5.0 PUMPING TEST DATA");
  // Test Info Table
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  
  const testInfoData = [
    ["Bore hole No", formData.boreholeNo || "", "Datum level (m)", formData.datumLevel || "0.1"],
    ["Client Name", formData.pumpClientName || formData.clientName || "", "Pump level (m)", formData.pumpLevel || "52"],
    ["Location", formData.pumpLocation || formData.projectLocation || "", "Pump type", formData.pumpTypeTest || "DSD3-18"],
    ["Static water level", formData.staticLevelTest || "2.00", "Metres bgl", ""],
    ["", "", "Pipe type & size", formData.pipeTypeSize || 'uPVC 1.25"'],
    ["Pumping water level", formData.pumpingLevelTest || "12.66", "Metres bgl", ""],
    ["", "", "Power source", formData.powerSource || "20KVA"],
    ["Total draw down", formData.totalDrawdownTest || "10.66", "Metres", ""],
    ["", "", "Water column (m)", formData.waterColumn || "58.00"],
    ["Bore hole Depth", formData.boreholeDepthTest || "60.00", "Metres bgl", ""]
  ];

  doc.autoTable({
    startY: y,
    body: testInfoData,
    theme: "grid",
    styles: { 
      fontSize: 8, 
      cellPadding: 2,
      lineWidth: 0.1,
      lineColor: [0, 0, 0]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 45 },
      1: { cellWidth: 35 },
      2: { fontStyle: 'bold', cellWidth: 45 },
      3: { cellWidth: 35 }
    },
    margin: { left: margin, right: margin }
  });
  
  y = doc.lastAutoTable.finalY + 10;

  // Add new page if needed for the table
  if (y > 220) {
    doc.addPage();
    addHeader();
    y = 25;
  }

  // Title for discharge test
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("DISCHARGE DRAW DOWN TEST (24hrs)", 105, y, { align: "center" });
  y += 8;

  // Pumping test data table
  const pumpingTableData = pumpingTestData.map((p) => [
    p.date || "",
    p.clockTime || "",
    p.elapsedTime || "",
    p.waterLevel || "",
    p.drawdown || "",
    p.yield || "",
    p.ec || "",
    p.remarks || ""
  ]);

  doc.autoTable({
    startY: y,
    head: [["DATE", "CLOCK TIME(hrs)", "ELAPSED TIME(min)", "WATER LEVEL (m)", "DRAW DOWN (m)", "YIELD (m³/h)", "EC (w/cm)", "REMARKS"]],
    body: pumpingTableData,
    theme: "grid",
    headStyles: { 
      fillColor: [20, 60, 150], 
      textColor: 255, 
      fontSize: 7,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 7, 
      cellPadding: 1.5,
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [0, 0, 0]
    },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 22 },
      4: { cellWidth: 22 },
      5: { cellWidth: 20 },
      6: { cellWidth: 18 },
      7: { cellWidth: 36 }
    },
    margin: { left: margin, right: margin }
  });
  
  y = doc.lastAutoTable.finalY + 10;

  // Add chart if there's valid data
 const validPumpingData = pumpingTestData.filter((d) => d.elapsedTime && d.waterLevel);
if (validPumpingData.length > 0) {
  addTocEntry("", "Chart 1: Water Level vs Time", 15);
  // Add new page for chart if needed
  if (y > 200) {
    doc.addPage();
    addHeader();
    y = 25;
  }

  await addChartImage("report-pumping-test-chart", "WATER LEVEL VS TIME");
}
}
  // ====== RECOVERY TEST DATA ======
if (recoveryData && recoveryData.length > 0 && 
    recoveryData.some((r) => r.date || r.clockTime || r.elapsedTime || r.waterLevel || r.recovery)) {
  
  addTocEntry("6.0", "RECOVERY TEST DATA");
  // Add new page if needed
  if (y > 200) {
    doc.addPage();
    addHeader();
    y = 25;
  }
  
  
  addSectionTitle("6.0 RECOVERY TEST DATA");

  // Test Info Table
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  
  const recoveryInfoData = [
    ["Bore hole No", formData.recoveryBoreholeNo || formData.boreholeNo || "", "Datum level", formData.recoveryDatumLevel || formData.datumLevel || "0.1"],
    ["Client Name", formData.recoveryClientName || formData.clientName || "", "Pump level", formData.recoveryPumpLevel || formData.pumpLevel || "52"],
    ["Location", formData.recoveryLocation || formData.projectLocation || "", "Pump type", formData.recoveryPumpType || formData.pumpTypeTest || "DSD3-18"],
    ["Static water level", formData.recoveryStaticLevel || formData.staticLevelTest || "2.00", "", ""],
    ["", "", "Pipe type & size", formData.recoveryPipeType || formData.pipeTypeSize || 'uPVC 1.25"'],
    ["Pumping water level", formData.recoveryPumpingLevel || formData.pumpingLevelTest || "12.66", "", ""],
    ["", "", "Power source", formData.recoveryPowerSource || formData.powerSource || "20KVA"],
    ["Total draw down", formData.recoveryTotalDrawdown || formData.totalDrawdownTest || "10.66", "", ""],
    ["", "", "Water column", formData.recoveryWaterColumn || formData.waterColumn || "58.00"],
    ["Bore hole Depth", formData.recoveryBoreholeDepth || formData.boreholeDepthTest || "60.00", "", ""]
  ];

  doc.autoTable({
    startY: y,
    body: recoveryInfoData,
    theme: "grid",
    styles: { 
      fontSize: 8, 
      cellPadding: 2,
      lineWidth: 0.1,
      lineColor: [0, 0, 0]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 45 },
      1: { cellWidth: 35 },
      2: { fontStyle: 'bold', cellWidth: 45 },
      3: { cellWidth: 35 }
    },
    margin: { left: margin, right: margin }
  });
  
  y = doc.lastAutoTable.finalY + 10;

  // Add new page if needed for the table
  if (y > 220) {
    doc.addPage();
    addHeader();
    y = 25;
  }

  // Title for recovery measurement
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("RECOVERY MEASUREMENT 24 HRS", 105, y, { align: "center" });
  y += 8;

  // Recovery data table
  const recoveryTableData = recoveryData.map((r) => [
    r.date || "",
    r.clockTime || "",
    r.elapsedTime || "",
    r.waterLevel || "",
    r.recovery || "",
    r.efficiency || "",
    r.comment || ""
  ]);

  doc.autoTable({
    startY: y,
    head: [["DATE", "CLOCK TIME(hrs)", "ELAPSED TIME(min)", "WATER LEVEL(m)", "RECOVERY (m)", "EFFICIENCY%", "COMMENT"]],
    body: recoveryTableData,
    theme: "grid",
    headStyles: { 
      fillColor: [20, 60, 150], 
      textColor: 255, 
      fontSize: 7,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 7, 
      cellPadding: 1.5,
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [0, 0, 0]
    },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 22 },
      2: { cellWidth: 22 },
      3: { cellWidth: 24 },
      4: { cellWidth: 22 },
      5: { cellWidth: 24 },
      6: { cellWidth: 34 }
    },
    margin: { left: margin, right: margin }
  });
  
  y = doc.lastAutoTable.finalY + 10;

  // Recovery analysis text
  if (formData.recoveryAnalysis) {
    addParagraph(formData.recoveryAnalysis);
  }

  // Add chart if there's valid data
const validRecoveryData = recoveryData.filter((d) => d.elapsedTime && d.waterLevel);
if (validRecoveryData.length > 0) {
  addTocEntry("", "Chart 2: Residual Drawdown vs Time", 15);
  // Add new page for chart if needed
  if (y > 200) {
    doc.addPage();
    addHeader();
    y = 25;
  }

  await addChartImage("report-recovery-data-chart", "RESIDUAL DRAWDOWN VS TIME");
}
    }
/*
  // ====== 7.0 WRMA FORM ======
  doc.addPage();
  addHeader();
  addSectionTitle("7.0 WRMA BOREHOLE COMPLETION RECORD");
  const wrmaFields = [
    ["Applicant Name", formData.clientName || ""],
    ["Category", "Individual / Company / Institution"],
    ["Physical Address", formData.clientAddress || ""],
    ["Borehole Name", formData.projectLocation || ""],
    ["Total Depth (m)", formData.totalDepth || ""],
    ["Drilling Method", formData.drillingMethod || ""],
    ["Start Date", formData.drillingStart || ""],
    ["End Date", formData.drillingEnd || ""],
    ["Water Use", "Domestic / Public / Irrigation"],
  ];
  doc.autoTable({
    startY: y,
    head: [["Field", "Details"]],
    body: wrmaFields,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 3 },
    margin: { left: margin },
  });
  y = doc.lastAutoTable.finalY + 10;*/
    // Add WRMA Section
// ====== Add WRMA Section (existing code) ======
  addTocEntry("7.0", "WRMA BOREHOLE COMPLETION RECORD");
  doc.addPage();
  addHeader();
  y = 25;
  y = generateWrmaSection(doc, y);

  // ====== NEW: Add Borehole Design Sketch Section ======
  addTocEntry("7.1", "BOREHOLE DESIGN SKETCH", 10);
  
  try {
    // Log casing data for debugging
    console.log("=== Casing Data Debug ===");
    console.log("wrmaPlainCasing:", wrmaPlainCasing);
    console.log("wrmaSlottedCasing:", wrmaSlottedCasing);
    
    // Generate sketch data - ensure casings are properly formatted
    const sketchData = {
      totalDepth: parseFloat(formData.wrmaTotalDepth || formData.totalDepth || 60),
      diameter: parseFloat(formData.wrmaHoleDiameter1 || 152.4),
      plainCasings: (wrmaPlainCasing || [])
        .filter(c => c && c.from !== null && c.from !== undefined && c.from !== "" && 
                     c.to !== null && c.to !== undefined && c.to !== "")
        .map(c => ({
          from: parseFloat(c.from),
          to: parseFloat(c.to)
        })),
      slottedCasings: (wrmaSlottedCasing || [])
        .filter(c => c && c.from !== null && c.from !== undefined && c.from !== "" && 
                     c.to !== null && c.to !== undefined && c.to !== "")
        .map(c => ({
          from: parseFloat(c.from),
          to: parseFloat(c.to)
        })),
      drillingStart: formData.wrmaDrillingStart || formData.drillingStart || "",
      drillingEnd: formData.wrmaDrillingEnd || formData.drillingEnd || ""
    };
    
    console.log("Prepared sketchData for PDF:", sketchData);

    // Fetch sketch from backend
    const response = await fetch(`${API_BASE_URL}/api/reports/sketch/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(sketchData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageDataUrl = await blobToDataURL(blob);

      // Add new page for sketch
      if (y > 200) {
        doc.addPage();
        addHeader();
        y = 25;
      }

      // Add sketch title
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.text("7.1 BOREHOLE DESIGN SKETCH", margin, y);
      y += 10;

      // Add sketch image
      const imgWidth = 160;
      const imgHeight = 200;
      
      // Check if image fits on current page
      if (y + imgHeight > 270) {
        doc.addPage();
        addHeader();
        y = 25;
      }

      doc.addImage(imageDataUrl, "PNG", 25, y, imgWidth, imgHeight);
      y += imgHeight + 10;

      // Add sketch description
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      const description = `Figure 1: Borehole design sketch showing the installation of casings, screens, and gravel pack. Total depth: ${sketchData.totalDepth}m, Diameter: ${sketchData.diameter}mm.`;
      const descLines = doc.splitTextToSize(description, 180);
      doc.text(descLines, margin, y);
      y += descLines.length * 5 + 10;

    } else {
      console.warn("Could not generate sketch for PDF");
      // Add placeholder text
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.text("Borehole sketch could not be generated.", margin, y);
      y += 10;
    }
  } catch (error) {
    console.error("Error adding sketch to PDF:", error);
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.text("Borehole sketch generation error.", margin, y);
    y += 10;
  }

  // ====== ADD LOCATION MAP SKETCH ======
  addTocEntry("7.2", "LOCATION SKETCH MAP", 10);

  try {
    const locationData = {
      nearestTownName: formData.nearestTownName || "Nearest Town",
      nearestTownLat: formData.nearestTownLatitude,
      nearestTownLng: formData.nearestTownLongitude,
      boreholeLat: formData.boreholeLatitude,
      boreholeLng: formData.boreholeLongitude,
      boreholeName: formData.projectLocation || "Borehole Site"
    };

    if (locationData.boreholeLat && locationData.nearestTownLat) {
      const response = await fetch(`${API_BASE_URL}/api/reports/location-map/preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(locationData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageDataUrl = await blobToDataURL(blob);

        if (y > 180) {
          doc.addPage();
          addHeader();
          y = 25;
        }

        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text("7.2 LOCATION SKETCH MAP", margin, y);
        y += 10;

        const imgWidth = 180;
        const imgHeight = 120;
        if (y + imgHeight > 270) {
          doc.addPage();
          addHeader();
          y = 25;
        }

        doc.addImage(imageDataUrl, "PNG", margin, y, imgWidth, imgHeight);
        y += imgHeight + 5;

        doc.setFont("times", "normal");
        doc.setFontSize(10);
        const description = `Figure 2: Location sketch showing route from ${locationData.nearestTownName} to borehole drilling site (Not Drawn To Scale)`;
        const descLines = doc.splitTextToSize(description, 180);
        doc.text(descLines, margin, y);
        y += descLines.length * 5 + 10;

      } else {
        console.warn("Could not generate location map for PDF");
      }
    }
  } catch (error) {
    console.error("Error adding location map to PDF:", error);
  }

// ====== CALCULATIONS ======
doc.addPage();
addHeader();
y = 25;
addTocEntry("8.0", "CALCULATIONS");
addSectionTitle("8.0 CALCULATIONS");

// TRANSMISSIVITY OF THE AQUIFER
if (formData.transmissivityIntro || formData.transmissivityFormula || formData.transmissivityConclusion) {
  addTocEntry("8.1", "Transmissivity of the Aquifer", 10);
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("TRANSMISSIVITY OF THE AQUIFER", margin, y);
  y += 8;
  
  if (formData.transmissivityIntro) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.transmissivityIntro);
  }
  
  if (formData.transmissivityFormula) {
    // Add formula in a box
    if (y > 240) {
      doc.addPage();
      addHeader();
      y = 25;
    }
    
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    const formulaLines = formData.transmissivityFormula.split('\n');
    const maxLineLength = 90;
    
    formulaLines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        addHeader();
        y = 25;
      }
      
      if (line.length > maxLineLength) {
        const wrappedLines = doc.splitTextToSize(line, 180);
        wrappedLines.forEach(wrappedLine => {
          doc.text(wrappedLine, margin + 5, y);
          y += 5;
        });
      } else {
        doc.text(line, margin + 5, y);
        y += 5;
      }
    });
    
    y += 5;
  }
  
  if (formData.transmissivityConclusion) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.transmissivityConclusion);
  }
  
  y += 5;
}

// SPECIFIC CAPACITY
if (formData.specificCapacityIntro || formData.specificCapacityFormula || formData.specificCapacityConclusion) {
  addTocEntry("8.2", "Specific Capacity", 10);
  if (y > 230) {
    doc.addPage();
    addHeader();
    y = 25;
  }
  
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("SPECIFIC CAPACITY", margin, y);
  y += 8;
  if (formData.specificCapacityIntro) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.specificCapacityIntro);
  }
  
  if (formData.specificCapacityFormula) {
    if (y > 250) {
      doc.addPage();
      addHeader();
      y = 25;
    }
    
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    const formulaLines = formData.specificCapacityFormula.split('\n');
    
    formulaLines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        addHeader();
        y = 25;
      }
      doc.text(line, margin + 5, y);
      y += 5;
    });
    
    y += 5;
  }
  
  if (formData.specificCapacityConclusion) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.specificCapacityConclusion);
  }
  
  y += 5;
}

// PUMP SAFE DESIGN
if (formData.pumpSafeIntro || formData.pumpSafeFormula || formData.pumpSafeConclusion) {
  addTocEntry("8.3", "Pump Safe Design", 10);
  if (y > 240) {
    doc.addPage();
    addHeader();
    y = 25;
  }
  
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("PUMP SAFE DESIGN", margin, y);
  y += 8;
  
  if (formData.pumpSafeIntro) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.pumpSafeIntro);
  }
  
  if (formData.pumpSafeFormula) {
    if (y > 260) {
      doc.addPage();
      addHeader();
      y = 25;
    }
    
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    const formulaLines = formData.pumpSafeFormula.split('\n');
    
    formulaLines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        addHeader();
        y = 25;
      }
      doc.text(line, margin + 5, y);
      y += 5;
    });
    
    y += 5;
  }
  
  if (formData.pumpSafeConclusion) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    addParagraph(formData.pumpSafeConclusion);
  }
}

  // ====== 9.0 RECOMMENDATIONS & CONCLUSIONS ======
if (formData.recommendations || formData.conclusions) {
  addTocEntry("9.0", "RECOMMENDATIONS & CONCLUSIONS");
  if (y > 220) {
    doc.addPage();
    addHeader();
    y = 25;
  }
  addSectionTitle("9.0 RECOMMENDATIONS & CONCLUSIONS");

  if (formData.recommendations) {
    addTocEntry("9.1", "Recommendations", 10);
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text("Recommendations", margin, y);
    y += 8;
    addParagraph(formData.recommendations);
  }

  if (formData.conclusions) {
    addTocEntry("9.2", "Conclusions", 10);
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text("Conclusions", margin, y);
    y += 8;
    addParagraph(formData.conclusions);
  }
}

// ====== 10.0 CERTIFICATION ======
addTocEntry("10.0", "CERTIFICATION");
doc.addPage();
addHeader();
y = 25;
addSectionTitle("10.0 CERTIFICATION");
  addParagraph(`Compiled by: ${formData.preparedBy || "Hydrogeologist"}`);
  addParagraph(
    `Date: ${formData.reportDate || new Date().toLocaleDateString()}`
  );
  addParagraph("Signature: ___________________________");
// ====== Generate Final TOC ======
// Go back to TOC page and fill it in
const currentPage = doc.internal.getNumberOfPages();
doc.setPage(tocPageNumber);
y = tocStartY;

doc.setFont("times", "normal");
doc.setFontSize(11);

let tocPageCount = 1;

tocSections.forEach((entry, index) => {
  // Check if we need a new page
  if (y > 270) {
    // Move to next reserved TOC page
    tocPageCount++;
    doc.setPage(tocPageNumber + tocPageCount - 1);
    addHeader();
    y = 25;
  }
  
  const xPos = margin + (entry.indent || 0);
  const textContent = entry.number ? `${entry.number} ${entry.title}` : entry.title;
  const textWidth = doc.getTextWidth(textContent);
  
  // Calculate dots to fill space
  const pageNumWidth = doc.getTextWidth(entry.page.toString());
  const availableWidth = 180 - textWidth - pageNumWidth - (entry.indent || 0);
  const dotCount = Math.floor(availableWidth / doc.getTextWidth('.'));
  const dots = '.'.repeat(Math.max(0, dotCount));
  
  // Draw TOC line
  doc.setTextColor(0, 0, 0);
  doc.text(textContent, xPos, y);
  doc.setTextColor(150, 150, 150);
  doc.text(dots, xPos + textWidth + 1, y);
  doc.setTextColor(0, 0, 0);
  doc.text(entry.page.toString(), 195, y, { align: "right" });
  
  y += 6;
});

// If TOC used fewer pages than reserved, remove extra blank pages
// This requires tracking and is complex with jsPDF, so we'll leave reserved pages

// Return to the end of the document
doc.setPage(currentPage);

  // ====== Footer for all pages ======
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  const filename = `${formData.clientName || "Borehole_Report"}_${
    formData.projectLocation || ""
  }.pdf`;
  doc.save(filename);
  
  showNotification("PDF generated successfully!", "success");
}

/**
 * Helper function to convert Blob to Data URL
 */
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
/**
 * Helper function to calculate distance for PDF
 */
function calculateHaversineDistancePDF(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}


// debugging functions 

/**
 * Debug function to check current casing data
 * Call this in browser console: debugCasingData()
 */
function debugCasingData() {
  console.log("=== CASING DATA DEBUGGING ===");
  console.log("\n1. Global Arrays:");
  console.log("wrmaPlainCasing:", wrmaPlainCasing);
  console.log("wrmaSlottedCasing:", wrmaSlottedCasing);
  
  console.log("\n2. Casing Table Contents:");
  
  // Check plain casing table
  const plainTbody = document.getElementById("wrma-plain-casing-tbody");
  if (plainTbody) {
    const plainRows = plainTbody.querySelectorAll("tr");
    console.log(`Plain casing table has ${plainRows.length} rows`);
    plainRows.forEach((row, index) => {
      const inputs = row.querySelectorAll("input");
      console.log(`  Row ${index}:`, {
        type: inputs[0]?.value,
        diameter: inputs[1]?.value,
        length: inputs[2]?.value,
        from: inputs[3]?.value,
        to: inputs[4]?.value
      });
    });
  }
  
  // Check slotted casing table
  const slottedTbody = document.getElementById("wrma-slotted-casing-tbody");
  if (slottedTbody) {
    const slottedRows = slottedTbody.querySelectorAll("tr");
    console.log(`Slotted casing table has ${slottedRows.length} rows`);
    slottedRows.forEach((row, index) => {
      const inputs = row.querySelectorAll("input");
      console.log(`  Row ${index}:`, {
        type: inputs[0]?.value,
        diameter: inputs[1]?.value,
        length: inputs[2]?.value,
        from: inputs[3]?.value,
        to: inputs[4]?.value
      });
    });
  }
  
  console.log("\n3. Form Data:");
  console.log("formData.wrmaTotalDepth:", formData.wrmaTotalDepth);
  console.log("formData.wrmaHoleDiameter1:", formData.wrmaHoleDiameter1);
  
  console.log("\n4. Filtered Casings (ready for API):");
  const plainFiltered = (wrmaPlainCasing || [])
    .filter(c => c && c.from && c.to)
    .map(c => ({ from: parseFloat(c.from), to: parseFloat(c.to) }));
  console.log("Plain casings (filtered):", plainFiltered);
  
  const slottedFiltered = (wrmaSlottedCasing || [])
    .filter(c => c && c.from && c.to)
    .map(c => ({ from: parseFloat(c.from), to: parseFloat(c.to) }));
  console.log("Slotted casings (filtered):", slottedFiltered);
  
  console.log("\n=== END DEBUG ===");
  
  return {
    plainCasings: plainFiltered,
    slottedCasings: slottedFiltered,
    totalDepth: formData.wrmaTotalDepth || formData.totalDepth,
    diameter: formData.wrmaHoleDiameter1
  };
}

/**
 * Test sketch generation with sample data
 */
async function testSketchGeneration() {
  const sampleData = {
    totalDepth: 60,
    diameter: 152.4,
    plainCasings: [
      { from: 0, to: 24 },
      { from: 30, to: 36 },
      { from: 42, to: 48 },
      { from: 54, to: 60 }
    ],
    slottedCasings: [
      { from: 24, to: 30 },
      { from: 36, to: 42 },
      { from: 48, to: 54 }
    ],
    drillingStart: "2025-07-04",
    drillingEnd: "2025-07-10"
  };
  
  console.log("Testing sketch with sample data:", sampleData);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/sketch/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(sampleData),
    });
    
    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      console.log("✅ Test successful! Image URL:", imageUrl);
      
      // Display in preview
      displaySketchInPreview(imageUrl);
      showNotification("Test sketch generated successfully!", "success");
      
      return true;
    } else {
      const errorText = await response.text();
      console.error("❌ Test failed:", errorText);
      showNotification("Test sketch generation failed", "error");
      return false;
    }
  } catch (error) {
    console.error("❌ Test error:", error);
    showNotification("Test sketch generation error", "error");
    return false;
  }
}

/**
 * Force sync casing data from DOM to arrays
 * Call this before generating sketch if data seems out of sync
 */
function syncCasingDataFromDOM() {
  console.log("Syncing casing data from DOM...");
  
  // Sync plain casings
  const plainTbody = document.getElementById("wrma-plain-casing-tbody");
  if (plainTbody) {
    wrmaPlainCasing = [];
    const plainRows = plainTbody.querySelectorAll("tr");
    plainRows.forEach((row, index) => {
      const inputs = row.querySelectorAll("input");
      if (inputs.length >= 5) {
        wrmaPlainCasing.push({
          type: inputs[0].value,
          diameter: inputs[1].value,
          length: inputs[2].value,
          from: inputs[3].value,
          to: inputs[4].value
        });
      }
    });
    console.log("Synced plain casings:", wrmaPlainCasing);
  }
  
  // Sync slotted casings
  const slottedTbody = document.getElementById("wrma-slotted-casing-tbody");
  if (slottedTbody) {
    wrmaSlottedCasing = [];
    const slottedRows = slottedTbody.querySelectorAll("tr");
    slottedRows.forEach((row, index) => {
      const inputs = row.querySelectorAll("input");
      if (inputs.length >= 5) {
        wrmaSlottedCasing.push({
          type: inputs[0].value,
          diameter: inputs[1].value,
          length: inputs[2].value,
          from: inputs[3].value,
          to: inputs[4].value
        });
      }
    });
    console.log("Synced slotted casings:", wrmaSlottedCasing);
  }
  
  console.log("Sync complete!");
}

/**
 * Enhanced generateSketchPreview with sync
 */
async function generateSketchPreviewWithSync() {
  // Force sync data from DOM first
  syncCasingDataFromDOM();
  
  // Then generate sketch
  await generateSketchPreview();
}

// Make functions available globally for console debugging
window.debugCasingData = debugCasingData;
window.testSketchGeneration = testSketchGeneration;
window.syncCasingDataFromDOM = syncCasingDataFromDOM;
window.generateSketchPreviewWithSync = generateSketchPreviewWithSync;

console.log("💡 Sketch debugging helpers loaded! Try these in console:");
console.log("  - debugCasingData() - Check current casing data");
console.log("  - testSketchGeneration() - Test with sample data");
console.log("  - syncCasingDataFromDOM() - Force sync from DOM");
console.log("  - generateSketchPreviewWithSync() - Sync then generate");
// Add auto-save functionality
let autoSaveTimer;
function enableAutoSave() {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
  }

  autoSaveTimer = setInterval(() => {
    if (authToken && document.querySelectorAll('input:not([value=""])').length > 5) {
      saveDraft();
    }
  }, 60000); // Auto-save every minute
}

// Call this when user logs in
enableAutoSave();
nableAutoSave();
