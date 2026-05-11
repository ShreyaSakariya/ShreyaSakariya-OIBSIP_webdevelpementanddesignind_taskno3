# 🌡️ ThermoShift — Temperature Converter

A premium, dark-themed temperature converter supporting **Celsius**, **Fahrenheit**, and **Kelvin** conversions with real-time visualization, built with **HTML**, **CSS**, and **JavaScript** as part of **Level 1 Internship — Task 3**.

---

## 📸 Preview

Open `index.html` in any modern browser to use the converter.

---

## 📂 Project Structure

```
TASK_3/
├── index.html      # Main HTML file (converter UI)
├── style.css       # Complete CSS styling (dark theme, gradients, animations)
├── script.js       # JavaScript (conversion logic, validation, history, visualization)
└── README.md       # Project documentation (this file)
```

---

## ✨ Features Implemented

### 🔢 Temperature Input
- Large monospace input field with placeholder text
- Real-time unit badge (°C / °F / K) updates on selection
- **Input validation**:
  - Rejects non-numeric values
  - Validates against absolute zero for each unit
  - Visual shake animation + red border on invalid input
  - Error message displayed below input
- Keyboard support: press Enter to convert

### 🔘 Unit Selection (From & To)
- Tab-style radio buttons for **Celsius**, **Fahrenheit**, and **Kelvin**
- "From" tabs (warm orange accent) and "To" tabs (cool blue accent)
- Active tab highlighting with glow effect
- **Swap button** (⇄) to instantly switch "From" and "To" units
  - 180° rotation animation on hover

### 🔄 Convert Button
- Full-width gradient button (orange → pink)
- Hover lift effect with intensified glow shadow
- Active press effect (scale down)
- Arrow icon slides on hover

### 📊 Result Display
- Shows conversion in format: `100 °C = 212 °F`
- Result value in large gradient text (cool blue/purple)
- Pop-in animation on each conversion
- **Formula box**: Shows the mathematical formula used (e.g. `°F = (°C × 9/5) + 32`)
- **Thermometer bar visualization**:
  - Gradient color bar from Cold (blue) → Mild (green/yellow) → Hot (red)
  - Fill width maps temperature to visual scale (−40°C to 120°C range)
  - Labels: 🥶 Cold · 😊 Mild · 🔥 Hot

### 🌡️ All Conversion Formulas

| From → To | Formula |
|-----------|---------|
| °C → °F | °F = (°C × 9/5) + 32 |
| °C → K | K = °C + 273.15 |
| °F → °C | °C = (°F − 32) × 5/9 |
| °F → K | K = (°F − 32) × 5/9 + 273.15 |
| K → °C | °C = K − 273.15 |
| K → °F | °F = (K − 273.15) × 9/5 + 32 |

### 📋 Quick Reference Cards
- 4 clickable reference cards with common temperature points:
  - ❄️ **Water Freezes**: 0°C / 32°F / 273.15K
  - 🫀 **Body Temp**: 37°C / 98.6°F / 310.15K
  - ♨️ **Water Boils**: 100°C / 212°F / 373.15K
  - 🧊 **Absolute Zero**: −273.15°C / −459.67°F / 0K
- Clicking a card auto-fills the input and converts instantly

### 📜 Conversion History
- Tracks up to 8 recent conversions
- Each entry shows: from value → to value with timestamp
- Color-coded: warm orange (from) → cool blue (to)
- "Clear All" button to reset history
- Slide-in animation for new entries

### 🎨 Dynamic Background
- Floating gradient orbs (warm orange + cool blue)
- **Ambient feedback**: orbs change opacity based on converted temperature
  - Hot temps (>30°C): warm orb intensifies
  - Cold temps (<0°C): cool orb intensifies
  - Mild temps: balanced

---

## 🎨 Design Techniques

| Technique | Description |
|-----------|-------------|
| **CSS Custom Properties** | 30+ design tokens for full theming |
| **Dark Theme** | Deep background (#06060b) with warm/cool gradient accents |
| **JetBrains Mono** | Monospace font for temperature values and formulas |
| **Gradient Button** | Warm orange → pink gradient with hover glow |
| **Input Validation UX** | Shake animation, red border, error messages |
| **Thermometer Gradient** | Blue → Green → Yellow → Orange → Red bar |
| **Pop-in Animations** | Scale + fade result display on each conversion |
| **Ambient Orbs** | Background responds to temperature values |
| **Responsive Layout** | Vertical stacking on mobile, swap button rotates 90° |
| **Hover Micro-Interactions** | Card lifts, button glows, swap rotates, arrows slide |

---

## 🛠️ Tools & Technologies

| Tool / Technology | Purpose |
|-------------------|---------|
| **HTML5** | Semantic page structure with ARIA labels |
| **CSS3** | Styling, layout, gradients, animations, responsive design |
| **Vanilla JavaScript** | Conversion logic, DOM manipulation, validation, history |
| **Google Fonts** | Inter (UI) + JetBrains Mono (values/formulas) |
| **CSS Grid** | Quick reference card layout |
| **CSS Custom Properties** | Design token management |

---

## 🧠 Key Concepts Demonstrated

- **Input Validation**: Checks for empty input, non-numeric values, and absolute zero violations
- **DOM Manipulation**: Dynamic result rendering, history list updates, class toggling
- **Event Handling**: Click, keydown (Enter), input, focus, blur events
- **CSS Animations**: `@keyframes` for shake, pop, float, pulse, spin, slide-in
- **Data Mapping**: Temperature to thermometer bar width conversion
- **State Management**: Tracking from/to units and conversion history in JavaScript
- **Accessibility**: ARIA roles, labels, keyboard navigation support

---

## 📱 Responsive Design

| Breakpoint | Layout Changes |
|------------|----------------|
| `> 640px` | Side-by-side unit selectors, horizontal result, 2-column quick cards |
| `≤ 640px` | Stacked units, vertical result, single-column cards, rotated swap button |

---

## 🚀 How to Run

1. Open `index.html` in any modern web browser
2. Enter a temperature value in the input field
3. Select "From" and "To" units (Celsius, Fahrenheit, or Kelvin)
4. Click **Convert** or press **Enter**
5. View the result, formula, and thermometer visualization below

---

## 📝 Author

**Shreya Sakariya**  
Level 1 Internship — Task 3: Temperature Converter

---

> *Built to demonstrate JavaScript DOM manipulation, input validation, conversion logic, and dynamic UI feedback with a premium visual experience.*
