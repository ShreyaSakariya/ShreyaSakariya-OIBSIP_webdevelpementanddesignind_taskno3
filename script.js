/* =========================================
   ThermoShift — Temperature Converter JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── DOM References ──
    const tempInput = document.getElementById('temp-input');
    const inputError = document.getElementById('input-error');
    const inputGroup = document.getElementById('input-group');
    const inputUnitBadge = document.getElementById('input-unit-badge');

    const fromTabs = document.getElementById('from-tabs');
    const toTabs = document.getElementById('to-tabs');

    const swapBtn = document.getElementById('swap-btn');
    const convertBtn = document.getElementById('convert-btn');

    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultDisplay = document.getElementById('result-display');
    const resultFromValue = document.getElementById('result-from-value');
    const resultFromUnit = document.getElementById('result-from-unit');
    const resultToValue = document.getElementById('result-to-value');
    const resultToUnit = document.getElementById('result-to-unit');

    const formulaBox = document.getElementById('formula-box');
    const formulaCode = document.getElementById('formula-code');

    const thermoVisual = document.getElementById('thermo-visual');
    const thermoFill = document.getElementById('thermo-fill');

    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');
    const historyClear = document.getElementById('history-clear');

    // ── State ──
    let fromUnit = 'C';
    let toUnit = 'F';
    let history = [];

    // ── Unit Labels ──
    const unitLabels = {
        C: '°C',
        F: '°F',
        K: 'K'
    };

    const unitNames = {
        C: 'Celsius',
        F: 'Fahrenheit',
        K: 'Kelvin'
    };

    // ── Conversion Functions ──
    const conversions = {
        'C-F': (t) => (t * 9 / 5) + 32,
        'C-K': (t) => t + 273.15,
        'F-C': (t) => (t - 32) * 5 / 9,
        'F-K': (t) => (t - 32) * 5 / 9 + 273.15,
        'K-C': (t) => t - 273.15,
        'K-F': (t) => (t - 273.15) * 9 / 5 + 32,
        'C-C': (t) => t,
        'F-F': (t) => t,
        'K-K': (t) => t,
    };

    // ── Formulas ──
    const formulas = {
        'C-F': '°F = (°C × 9/5) + 32',
        'C-K': 'K = °C + 273.15',
        'F-C': '°C = (°F − 32) × 5/9',
        'F-K': 'K = (°F − 32) × 5/9 + 273.15',
        'K-C': '°C = K − 273.15',
        'K-F': '°F = (K − 273.15) × 9/5 + 32',
        'C-C': 'Same unit — no conversion needed',
        'F-F': 'Same unit — no conversion needed',
        'K-K': 'Same unit — no conversion needed',
    };

    // ── Tab Click Handler ──
    function setupTabs(container, onSelect, type) {
        const tabs = container.querySelectorAll('.unit-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-checked', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-checked', 'true');
                onSelect(tab.dataset.unit);
            });
        });
    }

    setupTabs(fromTabs, (unit) => {
        fromUnit = unit;
        inputUnitBadge.textContent = unitLabels[unit];
    });

    setupTabs(toTabs, (unit) => {
        toUnit = unit;
    });

    // ── Swap Units ──
    swapBtn.addEventListener('click', () => {
        const tempFrom = fromUnit;
        const tempTo = toUnit;
        fromUnit = tempTo;
        toUnit = tempFrom;

        // Update tabs
        updateActiveTabs();
        inputUnitBadge.textContent = unitLabels[fromUnit];
    });

    function updateActiveTabs() {
        fromTabs.querySelectorAll('.unit-tab').forEach(tab => {
            const isActive = tab.dataset.unit === fromUnit;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-checked', isActive.toString());
        });
        toTabs.querySelectorAll('.unit-tab').forEach(tab => {
            const isActive = tab.dataset.unit === toUnit;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-checked', isActive.toString());
        });
    }

    // ── Validate Input ──
    function validateInput(value) {
        if (value.trim() === '') return { valid: false, error: 'Please enter a temperature value' };
        const num = Number(value);
        if (isNaN(num)) return { valid: false, error: 'Please enter a valid number' };
        // Kelvin can't be below 0
        if (fromUnit === 'K' && num < 0) return { valid: false, error: 'Kelvin cannot be negative' };
        // Check for absolute zero violations
        if (fromUnit === 'C' && num < -273.15) return { valid: false, error: 'Below absolute zero (−273.15°C)' };
        if (fromUnit === 'F' && num < -459.67) return { valid: false, error: 'Below absolute zero (−459.67°F)' };
        return { valid: true, value: num };
    }

    // ── Show Error ──
    function showError(msg) {
        inputError.textContent = msg;
        inputError.classList.add('show');
        tempInput.classList.add('error');
        setTimeout(() => {
            inputError.classList.remove('show');
            tempInput.classList.remove('error');
        }, 3000);
    }

    function clearError() {
        inputError.classList.remove('show');
        tempInput.classList.remove('error');
    }

    // ── Convert Temperature ──
    function convert() {
        clearError();

        const validation = validateInput(tempInput.value);
        if (!validation.valid) {
            showError(validation.error);
            return;
        }

        const inputVal = validation.value;
        const key = `${fromUnit}-${toUnit}`;
        const result = conversions[key](inputVal);

        // Format result — show up to 2 decimal places, but trim trailing zeros
        const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(2).replace(/\.?0+$/, '');

        // Show result
        resultPlaceholder.classList.add('hidden');
        resultDisplay.classList.remove('hidden');
        formulaBox.classList.remove('hidden');
        thermoVisual.classList.remove('hidden');

        // Re-trigger animation
        resultDisplay.style.animation = 'none';
        resultDisplay.offsetHeight; // trigger reflow
        resultDisplay.style.animation = '';

        formulaBox.style.animation = 'none';
        formulaBox.offsetHeight;
        formulaBox.style.animation = '';

        // Populate
        resultFromValue.textContent = inputVal;
        resultFromUnit.textContent = unitLabels[fromUnit];
        resultToValue.textContent = formatted;
        resultToUnit.textContent = unitLabels[toUnit];
        formulaCode.textContent = formulas[key];

        // Thermometer — convert to Celsius for visualization
        let celsiusVal;
        if (toUnit === 'C') celsiusVal = result;
        else if (toUnit === 'F') celsiusVal = (result - 32) * 5 / 9;
        else celsiusVal = result - 273.15;

        // Map -40°C to 120°C → 0% to 100%
        const thermoPercent = Math.max(0, Math.min(100, ((celsiusVal + 40) / 160) * 100));
        thermoFill.style.width = thermoPercent + '%';

        // Update background orbs based on temperature
        updateAmbiance(celsiusVal);

        // Add to history
        addHistory(inputVal, unitLabels[fromUnit], formatted, unitLabels[toUnit]);
    }

    // ── Update Background Ambiance ──
    function updateAmbiance(celsius) {
        const warmOrb = document.querySelector('.orb-warm');
        const coolOrb = document.querySelector('.orb-cool');

        if (celsius > 30) {
            warmOrb.style.opacity = '0.5';
            coolOrb.style.opacity = '0.15';
        } else if (celsius < 0) {
            warmOrb.style.opacity = '0.15';
            coolOrb.style.opacity = '0.5';
        } else {
            warmOrb.style.opacity = '0.3';
            coolOrb.style.opacity = '0.3';
        }
    }

    // ── History ──
    function addHistory(fromVal, fromU, toVal, toU) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const entry = { fromVal, fromU, toVal, toU, time: timeStr };
        history.unshift(entry);

        // Keep max 8 entries
        if (history.length > 8) history.pop();

        renderHistory();
    }

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="history-empty" id="history-empty">No conversions yet. Try one above!</p>';
            return;
        }

        historyList.innerHTML = history.map((h, i) => `
            <div class="history-item" style="animation-delay: ${i * 0.05}s">
                <div class="history-conversion">
                    <span class="history-from">${h.fromVal}${h.fromU}</span>
                    <span class="history-arrow">→</span>
                    <span class="history-to">${h.toVal}${h.toU}</span>
                </div>
                <span class="history-time">${h.time}</span>
            </div>
        `).join('');
    }

    historyClear.addEventListener('click', () => {
        history = [];
        renderHistory();
    });

    // ── Quick Reference Cards ──
    document.querySelectorAll('.quick-card').forEach(card => {
        card.addEventListener('click', () => {
            const temps = card.querySelectorAll('.quick-temps span');
            if (temps.length >= 1) {
                // Extract the Celsius value
                const celsiusText = temps[0].textContent;
                const celsiusVal = parseFloat(celsiusText.replace('°C', '').replace('−', '-'));

                // Set input to Celsius value
                tempInput.value = celsiusVal;
                fromUnit = 'C';
                toUnit = 'F';
                updateActiveTabs();
                inputUnitBadge.textContent = '°C';

                // Auto-convert
                convert();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // ── Event Listeners ──
    convertBtn.addEventListener('click', convert);

    // Enter key to convert
    tempInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            convert();
        }
    });

    // Clear error on input
    tempInput.addEventListener('input', () => {
        clearError();
    });

    // Focus effect
    tempInput.addEventListener('focus', () => {
        inputGroup.classList.add('focused');
    });

    tempInput.addEventListener('blur', () => {
        inputGroup.classList.remove('focused');
    });

});