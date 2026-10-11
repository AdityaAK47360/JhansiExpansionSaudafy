if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
}

const slider = document.getElementById('orderSlider');
const orderDisplay = document.getElementById('orderDisplay');
const simGMV = document.getElementById('simGMV');
const simRevenue = document.getElementById('simRevenue');
const simProfit = document.getElementById('simProfit');
const simOpEx = document.getElementById('simOpEx');
const simPayback = document.getElementById('simPayback');
const simROI = document.getElementById('simROI');

// CapEx Sliders
const capexServerSlider = document.getElementById('capexServerSlider');
const capexMarketingSlider = document.getElementById('capexMarketingSlider');
const capexWorkingCapitalSlider = document.getElementById('capexWorkingCapitalSlider');
const capexMerchantSlider = document.getElementById('capexMerchantSlider');

// OpEx Sliders
const opexSalarySlider = document.getElementById('opexSalarySlider');
const opexFuelSlider = document.getElementById('opexFuelSlider');
const opexTechSlider = document.getElementById('opexTechSlider');
const opexMarketingSlider = document.getElementById('opexMarketingSlider');

// Value displays
const capexServerValue = document.getElementById('capexServerValue');
const capexMarketingValue = document.getElementById('capexMarketingValue');
const capexWorkingCapitalValue = document.getElementById('capexWorkingCapitalValue');
const capexMerchantValue = document.getElementById('capexMerchantValue');
const totalCapExValue = document.getElementById('totalCapExValue');

const opexSalaryValue = document.getElementById('opexSalaryValue');
const opexFuelValue = document.getElementById('opexFuelValue');
const opexTechValue = document.getElementById('opexTechValue');
const opexMarketingValue = document.getElementById('opexMarketingValue');
const totalOpexValue = document.getElementById('totalOpexValue');

const aov = 158;
const revPerOrder = 56;
const initialSalary = 94000;
const initialCapEx = 214000;

function updateSliderValue(slider, valueDisplay) {
    const value = parseInt(slider.value);
    valueDisplay.textContent = '₹' + value.toLocaleString('en-IN');
}

function updateCapExTotal() {
    const server = parseInt(capexServerSlider.value);
    const marketing = parseInt(capexMarketingSlider.value);
    const working = parseInt(capexWorkingCapitalSlider.value);
    const merchant = parseInt(capexMerchantSlider.value);
    const total = initialSalary + server + marketing + working + merchant;
    totalCapExValue.textContent = '₹' + total.toLocaleString('en-IN');
    return total;
}

function updateOpExTotal() {
    const salary = parseInt(opexSalarySlider.value);
    const fuel = parseInt(opexFuelSlider.value);
    const tech = parseInt(opexTechSlider.value);
    const marketing = parseInt(opexMarketingSlider.value);
    const total = salary + fuel + tech + marketing;
    totalOpexValue.textContent = '₹' + total.toLocaleString('en-IN');
    return total;
}

// CapEx Slider Event Listeners
if (capexServerSlider) {
    capexServerSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, capexServerValue);
        updateCapExTotal();
    });
}

if (capexMarketingSlider) {
    capexMarketingSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, capexMarketingValue);
        updateCapExTotal();
    });
}

if (capexWorkingCapitalSlider) {
    capexWorkingCapitalSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, capexWorkingCapitalValue);
        updateCapExTotal();
    });
}

if (capexMerchantSlider) {
    capexMerchantSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, capexMerchantValue);
        updateCapExTotal();
    });
}

// OpEx Slider Event Listeners
if (opexSalarySlider) {
    opexSalarySlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, opexSalaryValue);
        updateOpExTotal();
    });
}

if (opexFuelSlider) {
    opexFuelSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, opexFuelValue);
        updateOpExTotal();
    });
}

if (opexTechSlider) {
    opexTechSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, opexTechValue);
        updateOpExTotal();
    });
}

if (opexMarketingSlider) {
    opexMarketingSlider.addEventListener('input', (e) => {
        updateSliderValue(e.target, opexMarketingValue);
        updateOpExTotal();
    });
}

// Order Simulator
if (slider && orderDisplay && simGMV && simRevenue && simProfit && simOpEx && simPayback && simROI) {
    function updateSimulation(orders) {
        orderDisplay.textContent = Number(orders).toLocaleString('en-IN') + ' Orders';

        const gmv = orders * aov;
        const revenue = orders * revPerOrder;
        const variableCost = orders * 4;
        const baseOpEx = parseInt(opexSalarySlider.value) + parseInt(opexFuelSlider.value) + parseInt(opexTechSlider.value) + parseInt(opexMarketingSlider.value);
        const totalOpEx = baseOpEx + variableCost;
        const currentCapEx = updateCapExTotal();
        const netProfit = revenue - totalOpEx;
        const paybackMonths = (currentCapEx / Math.max(netProfit, 1)).toFixed(1);
        const roiPct = ((netProfit / currentCapEx) * 100).toFixed(1);

        simGMV.textContent = '₹' + gmv.toLocaleString('en-IN');
        simRevenue.textContent = '₹' + revenue.toLocaleString('en-IN');
        simProfit.textContent = '₹' + netProfit.toLocaleString('en-IN');
        simOpEx.textContent = '₹' + totalOpEx.toLocaleString('en-IN');

        if (netProfit > 0) {
            simPayback.textContent = paybackMonths + ' Months';
            simROI.textContent = roiPct + '% Monthly Return on CapEx';
        } else {
            simPayback.textContent = 'Scale orders to achieve profit';
            simROI.textContent = 'Negative Return';
        }
    }

    slider.addEventListener('input', (e) => {
        updateSimulation(e.target.value);
    });

    updateSimulation(slider.value);
}
