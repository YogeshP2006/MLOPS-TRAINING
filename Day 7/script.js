const existingBusinesses = [
  "Abacus Training Center",
  "AC Service Center",
  "Agarbatti Store",
  "Agricultural Equipment Store",
  "Aluminum Fabrication Shop",
  "Art Class Center",
  "Astrology Center",
  "ATM Center",
  "Auto Electrical Shop",
  "Auto Spare Parts Shop",
  "Automobile Accessories Shop",
  "Ayurvedic Shop",
  "Baby Products Store",
  "Badminton Court",
  "Bag Shop",
  "Bakery",
  "Banana Wholesale Shop",
  "Banking Correspondent Center",
  "Battery Shop",
  "BBQ Center",
  "Bike Service Center",
  "Bike Spare Parts Shop",
  "Bike Wash Center",
  "Biriyani Shop",
  "Blood Test Laboratory",
  "Book Store",
  "Borewell Service",
  "Bridal Makeup Studio",
  "Burger Shop",
  "Cake Shop",
  "Camera Shop",
  "Car Service Center",
  "Car Wash Center",
  "Carpenter Workshop",
  "Catering Service",
  "Cattle Feed Shop",
  "CCTV Installation Shop",
  "Cement Store",
  "Chat Shop",
  "Chicken Center",
  "Chicken Farm",
  "Chinese Fast Food Shop",
  "Chips Store",
  "Clinic",
  "Clothing Store",
  "Cloud Kitchen",
  "Coaching Center",
  "Coconut Store",
  "Coffee Powder Shop",
  "Coffee Shop",
  "Computer Service Center",
  "Computer Shop",
  "Computer Training Center",
  "Construction Materials Store",
  "Cool Drinks Shop",
  "Cosmetics Shop",
  "Courier Service",
  "Cricket Academy",
  "Crockery Shop",
  "CSC Center",
  "Cyber Cafe",
  "Dairy Farm",
  "Dairy Shop",
  "Dance Academy",
  "Decoration Service",
  "Dental Clinic",
  "Department Store",
  "Diagnostic Center",
  "Dosa Stall",
  "Driving School",
  "Drone Service Shop",
  "Dry Fruits Shop",
  "Electrical Shop",
  "Electrician Service",
  "Electronic Repair Center",
  "Electronics Shop",
  "E-Seva Center",
  "EV Charging Station",
  "Event Management Service",
  "Eye Clinic",
  "Fancy Store",
  "Fast Food Shop",
  "Fertilizer Shop",
  "Finance Company",
  "Fish Farm",
  "Fish Shop",
  "Flex Printing Shop",
  "Flour Mill Shop",
  "Flower Shop",
  "Footwear Shop",
  "Fruit Shop",
  "Furniture Store",
  "Gaming Center",
  "Gaming Zone",
  "Garage",
  "General Store",
  "Generator Rental",
  "Gift Articles Store",
  "Gift Shop",
  "Glass Shop",
  "Goat Farm",
  "Grocery Store",
  "Gym / Fitness Center",
  "Hair Wig Store",
  "Hardware Store",
  "Healthy Juice Bar",
  "Hearing Aid Center",
  "Home Appliances Store",
  "Homeopathy Clinic",
  "Household Items Store",
  "Ice Cream Shop",
  "ID Card Printing Shop",
  "Idli Shop",
  "Imitation Jewellery Store",
  "Indoor Sports Center",
  "Innerwear Shop",
  "Insurance Office",
  "Interior Design Shop",
  "Internet Browsing Center",
  "Inverter Shop",
  "Jewellery Shop",
  "Juice Shop",
  "Kids Play Area",
  "Kids Wear Shop",
  "Kirana Store",
  "Kitchenware Shop",
  "Ladies Wear Shop",
  "Lamination Shop",
  "Laptop Store",
  "Laundry Shop",
  "Lubricant Store",
  "Luggage Store",
  "Marriage Hall",
  "Massage Center",
  "Meat Shop",
  "Mechanic Shop",
  "Medical Laboratory",
  "Medical Shop",
  "Men's Wear Shop",
  "Mess / Hostel Mess",
  "Milkshake Shop",
  "Millet Food Shop",
  "Mini Mart",
  "Mini Theater",
  "Mobile Accessories Shop",
  "Mobile Shop",
  "Mocktail Shop",
  "Modular Kitchen Store",
  "Movie Theater",
  "Music Academy",
  "Nail Art Studio",
  "North Indian Restaurant",
  "Nursery / Plant Shop",
  "Office Supplies Store",
  "Oil Store",
  "Optical Shop",
  "Organic Farming Store",
  "Organic Food Store",
  "Paint Shop",
  "Pan Shop",
  "Parotta Stall",
  "Party Hall",
  "Perfume Store",
  "Pesticide Shop",
  "Pet Shop",
  "Petrol Bunk",
  "Pharmacy",
  "Photo Studio",
  "Photography Service",
  "Physiotherapy Center",
  "Pickle Shop",
  "Pizza Shop",
  "Plastic Goods Store",
  "Plumbing Service",
  "Plywood Shop",
  "Pooja Items Store",
  "Poultry Feed Shop",
  "Printing Shop",
  "Provision Store",
  "Puncture Shop",
  "Real Estate Office",
  "Recharge Shop",
  "Refrigerator Repair Shop",
  "Religious Books Store",
  "Rental Service",
  "Restaurant",
  "Rice Shop",
  "Roofing Sheet Shop",
  "Salon / Beauty Parlour",
  "Sandwich Shop",
  "Sanitary Ware Shop",
  "Saree Shop",
  "Scan Center",
  "Seafood Restaurant",
  "Seeds Store",
  "Shawarma Shop",
  "Siddha Clinic",
  "Sign Board Shop",
  "SIM Card Shop",
  "Skill Development Center",
  "Skin Care Clinic",
  "Smoothie Shop",
  "Snacks Shop",
  "Soda Shop",
  "Solar Equipment Shop",
  "Sound System Rental",
  "South Indian Restaurant",
  "Spa Center",
  "Spice Store",
  "Spoken English Center",
  "Stationery Shop",
  "Steel Utensils Shop",
  "Sunglasses Store",
  "Supermarket",
  "Sweet Shop",
  "Swimming Pool",
  "Tailoring Shop",
  "Tattoo Removal Clinic",
  "Tattoo Studio",
  "Tea Powder Shop",
  "Tea Stall",
  "Temple Flowers Shop",
  "Tender Coconut Stall",
  "Textile Shop",
  "Ticket Booking Center",
  "Tiffin Center",
  "Tiles Shop",
  "Tours & Travels",
  "Toys Shop",
  "Tractor Service Center",
  "Travel Agency",
  "Tuition Center",
  "TV Repair Shop",
  "Typing Institute",
  "Tyre Shop",
  "UPS Service Center",
  "Vastu Consultation Center",
  "Vegetable Shop",
  "Veterinary Clinic",
  "Washing Machine Service Center",
  "Watch Shop",
  "Water Can Supply Shop",
  "Welding Shop",
  "Xerox Shop",
  "X-ray Center",
  "Yoga Center",
  "Zumba Center",
];

const locationOptions = [
  "100 Feet Road",
  "Alanthurai",
  "Anaikatti",
  "Anaimalai",
  "Annur",
  "Appanaickenpatti",
  "Arasur",
  "Avinashi Road",
  "Bharathi Colony",
  "Bilichi",
  "Bogampatti",
  "Brookefields",
  "Brookefields Mall",
  "Chettipalayam",
  "Chinnathadagam",
  "Chinnavedampatti",
  "Chinniampalayam",
  "Coimbatore",
  "Coimbatore Junction",
  "Coimbatore Junction Railway Station",
  "Cross Cut Road",
  "DB Road",
  "DB Road RS Puram",
  "Dhaliyur",
  "Eachanari",
  "Edayarpalayam",
  "Ettimadai",
  "Fun Republic Mall",
  "Ganapathy",
  "Gandhipuram",
  "Gandhipuram Central Bus Terminus",
  "Gopalapuram",
  "Gudalur",
  "Idikarai",
  "Jallipatti",
  "Kadampadi",
  "Kaduvettipalayam",
  "Kalangal",
  "Kalapatti",
  "Kangayampalayam",
  "Kaniyur",
  "Karamadai",
  "Karumathampatti",
  "Karunya Nagar",
  "Kinathukadavu",
  "Kovaipudur",
  "Kovilpalayam",
  "Kumarapalayam",
  "Kuniyamuthur",
  "Kurichi",
  "Lakshmi Mills",
  "Lakshmi Mills Junction",
  "Madukkarai",
  "Malaipalayam",
  "Malumichampatti",
  "Maruthamalai",
  "Mayilampatti",
  "Mettupalayam",
  "Nanjundapuram",
  "Naranapuram",
  "Narasimhanaickenpalayam",
  "Neelambur",
  "Oppanakara Street",
  "Othakalmandapam",
  "P.N. Palayam",
  "P.N. Pudur",
  "Pachapalayam",
  "Pannimadai",
  "Pappampatti",
  "Pattanam",
  "Peelamedu",
  "Periyanaickenpalayam",
  "Perur",
  "Perur Chettipalayam",
  "Podanur",
  "Pollachi",
  "Pooluvapatti",
  "Poorandampalayam",
  "Prozone Mall",
  "Puliakulam",
  "R.S. Puram",
  "Race Course",
  "Race Course Road",
  "Ram Nagar",
  "Rasipalayam",
  "Saibaba Colony",
  "Saravanampatti",
  "Sarcarsamakulam",
  "Sarkarsamakulam",
  "Selvapuram",
  "Sidhapudur",
  "Singanallur Bus Stand",
  "Singanallur Bus Terminus",
  "Sirumugai",
  "Somanur",
  "Somayampalayam",
  "Sulthanpet",
  "Sulur",
  "Sundarapuram",
  "Sungam",
  "Tatabad",
  "Telungupalayam",
  "Thadagam",
  "Thondamuthur",
  "Thudiyalur",
  "Town Hall",
  "Town Hall Market",
  "Trichy Road",
  "TVS Nagar",
  "Ukkadam",
  "Ukkadam Bus Stand",
  "Vadavalli",
  "Valparai",
  "Veerakeralam",
  "Veerapandi",
  "Vellakinar",
  "Vellalore",
  "Vellanaipatti",
];

// Always target the Flask backend to avoid hitting a static server on the same port.
const API_BASE_URL = "http://127.0.0.1:5000";
const API_URL = `${API_BASE_URL}/predict`;
const OPTIONS_URL = `${API_BASE_URL}/options`;
const HEALTH_URL = `${API_BASE_URL}/`;

const form = document.getElementById("analysis-form");
const resultSection = document.getElementById("result");
const resultBody = document.getElementById("resultBody");
const loader = document.getElementById("loader");
const apiStatus = document.getElementById("apiStatus");

const businessInput = document.getElementById("businessInput");
const businessMenu = document.getElementById("businessMenu");
const businessToggle = document.getElementById("businessToggle");
const locationInput = document.getElementById("locationInput");
const locationMenu = document.getElementById("locationMenu");
const locationToggle = document.getElementById("locationToggle");
const investmentAmount = document.getElementById("investmentAmount");
const crowdVideo = document.getElementById("crowdVideo");
const videoHint = document.getElementById("videoHint");

let businessChoices = [...existingBusinesses];
let locationChoices = [...locationOptions];

if (!form) {
  console.error("Prediction form was not found. Check the analysis-form id in index.html.");
}

setupComboInput(businessInput, businessMenu, businessToggle, () => businessChoices);
setupComboInput(locationInput, locationMenu, locationToggle, () => locationChoices);
checkBackendStatus();
loadDatasetOptions();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const finalBusiness = businessInput.value.trim();
  const finalLocation = locationInput.value.trim();
  const investmentValue = parseInt(investmentAmount.value, 10);
  const selectedVideo = crowdVideo?.files?.[0] || null;

  if (!finalBusiness) {
    showInlineMessage("Missing Business Type", "Please choose or type a business type.");
    return;
  }

  if (!finalLocation) {
    showInlineMessage("Missing Location", "Please choose or type a location in Coimbatore.");
    return;
  }

  if (!Number.isFinite(investmentValue) || investmentValue <= 0) {
    showInlineMessage("Invalid Investment", "Please enter a valid investment amount.");
    return;
  }

  if (selectedVideo && selectedVideo.type && !selectedVideo.type.startsWith("video/")) {
    showInlineMessage("Invalid Video", "Please upload a valid video file.");
    return;
  }

  resultSection.classList.remove("hidden");
  loader.classList.remove("hidden");
  resultBody.innerHTML = "";
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const formData = new FormData();
    formData.append("business", finalBusiness);
    formData.append("location", finalLocation);
    formData.append("investmentAmount", String(investmentValue));
    if (selectedVideo) {
      formData.append("crowdVideo", selectedVideo);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Prediction request failed.");
    }

    const data = await response.json();
    const probability = Number(data.probability ?? 0);
    const riskLevel = getRiskLevel(data.risk_level || probability);
    const resultLabel = data.final_decision || "Not Recommended";
    const feasibility = data.feasibility_result || "";
    const opportunityLevel = data.opportunity_level || "Not Available";
    const marketAnalysis =
      data.market_analysis || "Market analysis is not available.";
    const recommendationReason =
      data.recommendation_reason || "No recommendation reason available.";
    const opportunityClass = getOpportunityClass(opportunityLevel);
    const decisionClass = getDecisionClass(resultLabel);

    const marketDetails = data.market_details || {};
    const crowdAnalysis = data.crowd_analysis || {};
    const signals = {
      nearby:
        marketDetails.nearby_same_shops ??
        data.nearby_same_shop_count ??
        "-",
      competition: marketDetails.competition_level ?? "-",
      population: marketDetails.population_density ?? "-",
      demand: marketDetails.demand_score ?? "-",
      crowd: crowdAnalysis.crowd_level ?? marketDetails.population_density ?? "-",
      crowdConfidence: Number(crowdAnalysis.confidence_percent),
      crowdFrames: crowdAnalysis.processed_frames ?? "-",
    };

    const alternatives = Array.isArray(data.recommended_alternatives)
      ? data.recommended_alternatives
      : [];
    const relatedBusinesses = Array.isArray(data.related_businesses)
      ? data.related_businesses
      : Array.isArray(data.related_shops)
      ? data.related_shops
      : Array.isArray(data.related_businesses_used)
      ? data.related_businesses_used
      : [];
    const relatedMessage =
      data.same_shop_message ||
      data.related_message ||
      "No same business shops found in this location.";
    const alternativeNote =
      data.alternative_note ||
      "No better alternatives available for this location.";

    const recommendationRows = alternatives.length
      ? alternatives
          .map(
            (item) => {
              const alternative = normalizeAlternative(item);
              const scoreText = Number.isFinite(alternative.probability)
                ? `${alternative.probability}%`
                : "-";
              const tagText = alternative.feasibility || "Recommended";

              return `
              <div class="alt-row">
                <span>${escapeHtml(alternative.business)}</span>
                <span class="alt-score">${scoreText}</span>
                <span class="alt-tag">${escapeHtml(tagText)}</span>
              </div>
            `;
            }
          )
          .join("")
      : `
          <div class="alt-row">
            <span>${escapeHtml(alternativeNote)}</span>
            <span>-</span>
            <span class="alt-tag">Info</span>
          </div>
        `;

    const hasOnlySelectedRelated =
      relatedBusinesses.length === 1 &&
      normalizeTextValue(relatedBusinesses[0]) === normalizeTextValue(finalBusiness);

    const relatedSection = hasOnlySelectedRelated
      ? ""
      : `
        <div class="result-divider"></div>

        <div class="result-section">
          <h4>Related Business Categories</h4>
          ${
            relatedBusinesses.length
              ? `
                <p class="section-note">${relatedBusinesses.length} related categor${
                  relatedBusinesses.length === 1 ? "y" : "ies"
                } used for reference.</p>
                <div class="related-list">
                  ${relatedBusinesses
                    .map((item) => `<span>${escapeHtml(item)}</span>`)
                    .join("")}
                </div>
              `
              : `<p class="section-note">${escapeHtml(relatedMessage)}</p>`
          }
        </div>
      `;

    const newBusinessNote = data.new_business_note
      ? `<p class="summary-sub">${escapeHtml(data.new_business_note)}</p>`
      : "";

    loader.classList.add("hidden");
    resultBody.innerHTML = `
      <div class="result-panel">
        <div class="result-head">
          <div>
            <h3>Business Feasibility Result</h3>
            <p>AI-powered prediction summary</p>
          </div>
          <span class="risk-badge risk-${riskLevel.className}">${riskLevel.label}</span>
        </div>

        <div class="result-divider"></div>

        <div class="result-summary">
          <p class="summary-title">${escapeHtml(finalBusiness)}</p>
          <p class="summary-sub">Coimbatore - ${escapeHtml(finalLocation)}</p>
          ${newBusinessNote}

          <div class="probability-block">
            <span>Success Probability</span>
            <strong>${probability}%</strong>
          </div>
          <div class="probability-bar" role="presentation">
            <div class="probability-fill" style="width: ${probability}%"></div>
          </div>

          <p class="decision">Feasibility Result: <strong>${escapeHtml(
            feasibility
          )}</strong></p>
          <p class="decision">Final Decision: <strong>${escapeHtml(
            resultLabel
          )}</strong></p>
        </div>

        <div class="result-divider"></div>

        <div class="result-section">
          <h4>Market Details</h4>
          <div class="detail-rows">
            <div><span>Nearby Same Shops</span><strong>${signals.nearby}</strong></div>
            <div><span>Competition Level</span><strong>${signals.competition}</strong></div>
            <div><span>Crowd Level From Video</span><strong>${escapeHtml(signals.crowd)}</strong></div>
            <div><span>Crowd Confidence</span><strong>${
              Number.isFinite(signals.crowdConfidence)
                ? `${signals.crowdConfidence}%`
                : "-"
            }</strong></div>
            <div><span>Processed Video Frames</span><strong>${signals.crowdFrames}</strong></div>
            <div><span>Demand Score</span><strong>${signals.demand}</strong></div>
          </div>
        </div>

        <div class="result-divider"></div>

        <div class="result-section">
          <h4>AI Market Analysis</h4>
          <div class="analysis-box">
            <div><span>Risk Level</span><strong class="analysis-pill ${riskLevel.className}">${escapeHtml(riskLevel.label)}</strong></div>
            <div><span>Opportunity</span><strong class="analysis-pill ${opportunityClass}">${escapeHtml(opportunityLevel)}</strong></div>
            <div><span>Final Decision</span><strong class="analysis-pill ${decisionClass}">${escapeHtml(resultLabel)}</strong></div>
            <p>${escapeHtml(marketAnalysis)}</p>
            <p>${escapeHtml(recommendationReason)}</p>
          </div>
        </div>

        ${relatedSection}

        <div class="result-divider"></div>

        <div class="result-section">
          <h4>Recommended Alternatives</h4>
          <div class="alt-rows">
            ${recommendationRows}
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    loader.classList.add("hidden");
    const message =
      error instanceof Error
        ? error.message
        : "Unable to reach the backend API.";
    resultBody.innerHTML = `
      <div class="result-panel">
        <div class="result-head">
          <div>
            <h3>Prediction Error</h3>
            <p>Unable to reach the backend API.</p>
          </div>
          <span class="risk-badge risk-high">Error</span>
        </div>
        <div class="result-divider"></div>
        <div class="result-summary">
          <p class="summary-sub">${escapeHtml(message)}</p>
          <p class="summary-sub">Start the backend with: .\\.venv\\Scripts\\python.exe .\\run_backend.py</p>
        </div>
      </div>
    `;
  }
});

function showInlineMessage(title, message) {
  resultSection.classList.remove("hidden");
  loader.classList.add("hidden");
  resultBody.innerHTML = `
    <div class="result-panel">
      <div class="result-head">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>Prediction cannot start yet.</p>
        </div>
        <span class="risk-badge risk-medium">Required</span>
      </div>
      <div class="result-divider"></div>
      <div class="result-summary">
        <p class="summary-sub">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("reset", () => {
  resultSection.classList.add("hidden");
  loader.classList.add("hidden");
  resultBody.innerHTML = "";
  if (videoHint) {
    videoHint.textContent = "Upload a short crowd video for live crowd-level analysis.";
  }
});

if (crowdVideo && videoHint) {
  crowdVideo.addEventListener("change", () => {
    const file = crowdVideo.files?.[0];
    videoHint.textContent = file
      ? `${file.name} selected`
      : "Upload a short crowd video for live crowd-level analysis.";
  });
}

function getRiskLevel(value) {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized.includes("low")) {
      return { label: "Low Risk", className: "low" };
    }
    if (normalized.includes("medium")) {
      return { label: "Medium Risk", className: "medium" };
    }
    return { label: "High Risk", className: "high" };
  }

  const probability = Number(value);
  if (probability >= 70) {
    return { label: "Low Risk", className: "low" };
  }
  if (probability >= 45) {
    return { label: "Medium Risk", className: "medium" };
  }
  return { label: "High Risk", className: "high" };
}

function getOpportunityClass(value) {
  const normalized = String(value).trim().toLowerCase();

  if (normalized.includes("high")) {
    return "low";
  }

  if (
    normalized.includes("medium") ||
    normalized.includes("moderate")
  ) {
    return "medium";
  }

  return "high";
}

function getDecisionClass(value) {
  const normalized = String(value).trim().toLowerCase();

  if (normalized.includes("not recommended")) {
    return "high";
  }

  if (
    normalized.includes("potential") ||
    normalized.includes("moderate")
  ) {
    return "medium";
  }

  if (normalized.includes("recommended")) {
    return "low";
  }

  return "medium";
}

async function loadDatasetOptions() {
  try {
    const response = await fetch(OPTIONS_URL);
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    if (Array.isArray(data.businesses) && data.businesses.length) {
      businessChoices = data.businesses;
    }
    if (Array.isArray(data.locations) && data.locations.length) {
      locationChoices = data.locations;
    }
  } catch (error) {
    // Keep the built-in fallback lists if the backend is not running yet.
  }
}

async function checkBackendStatus() {
  if (!apiStatus) {
    return;
  }

  try {
    const response = await fetch(HEALTH_URL, { method: "GET" });
    if (!response.ok) {
      throw new Error("Backend returned an error.");
    }

    apiStatus.textContent = "Backend connected";
    apiStatus.classList.remove("offline");
    apiStatus.classList.add("online");
  } catch (error) {
    apiStatus.textContent =
      "Backend not connected. Run: .\\.venv\\Scripts\\python.exe .\\run_backend.py";
    apiStatus.classList.remove("online");
    apiStatus.classList.add("offline");
  }
}

function setupComboInput(inputEl, menuEl, toggleEl, getOptions) {
  const showMenu = () => {
    renderComboMenu(inputEl, menuEl, getOptions());
    menuEl.classList.remove("hidden");
  };

  inputEl.addEventListener("focus", showMenu);
  inputEl.addEventListener("input", showMenu);

  toggleEl.addEventListener("click", () => {
    if (menuEl.classList.contains("hidden")) {
      showMenu();
      inputEl.focus();
      return;
    }
    menuEl.classList.add("hidden");
  });

  menuEl.addEventListener("mousedown", (event) => {
    const option = event.target.closest(".combo-option");
    if (!option) {
      return;
    }

    inputEl.value = option.dataset.value || option.textContent;
    menuEl.classList.add("hidden");
  });
}

function renderComboMenu(inputEl, menuEl, options) {
  const searchText = inputEl.value.trim().toLowerCase();
  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(searchText)
  );
  const visibleOptions = filteredOptions.length ? filteredOptions : options;

  menuEl.innerHTML = "";

  const fragment = document.createDocumentFragment();
  visibleOptions.forEach((item) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "combo-option";
    option.dataset.value = item;
    option.textContent = item;
    fragment.appendChild(option);
  });

  menuEl.appendChild(fragment);
}

document.addEventListener("mousedown", (event) => {
  const activeCombo = event.target.closest(".combo-wrap");
  document.querySelectorAll(".combo-menu").forEach((menu) => {
    if (!activeCombo || !activeCombo.contains(menu)) {
      menu.classList.add("hidden");
    }
  });
});

function normalizeAlternative(item) {
  if (item && typeof item === "object") {
    return {
      business: item.business || item.Business_Type || "Alternative",
      probability: Number(item.probability),
      feasibility: item.feasibility_result || item.feasibility || "Recommended",
    };
  }

  return {
    business: String(item),
    probability: NaN,
    feasibility: "Recommended",
  };
}

function normalizeTextValue(value) {
  return String(value).trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
