# How Debounce + Validation Work Together

## Layer 1: Inputs Component (UI Level)

```tsx
// src/app/components/Inputs.tsx

<input
  type="number"
  value={value}
  onChange={(e) => {
    calc(Math.min(Number(e.target.value), max)); // ← Immediate UI update
  }}
  onBlur={(e) => {
    let num = Number(e.target.value);
    if (isNaN(num) || num < min) num = min; // ← Final validation on blur
    calc(num);
  }}
/>
```

**What happens:**

- `onChange`: Updates UI immediately (slider moves smoothly)
- `onBlur`: Final validation when user leaves the field (fixes invalid values)

---

## Layer 2: Main Component (Debounce Level)

```tsx
// src/app/BTUCalculator/BTUComponents/Main.tsx

const [inputs, setInputs] = useState({...})  // ← Raw inputs (immediate)
const [debouncedInputs, setDebouncedInputs] = useState(inputs)  // ← Delayed inputs

useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedInputs(inputs)  // ← Updates after 200ms of no changes
    }, 200);
    return () => clearTimeout(timer);
}, [inputs]);

// Calculations use debounced values
const base = debouncedInputs.roomArea * BTU_PER_SQ_FT;
```

**What happens:**

- User drags slider → `inputs` updates immediately (UI stays responsive)
- Timer resets on every change
- After 200ms of no changes → `debouncedInputs` updates
- Recalculations only happen when user stops

---

## Layer 3: calc Functions (State Update Level)

```tsx
// src/app/BTUCalculator/BTUComponents/Main.tsx

function calcRoomArea(value: number) {
  setInputs({ ...inputs, roomArea: value });
}
```

**What happens:**

- Updates the raw inputs state immediately
- UI remains responsive during typing
- Validation is handled by the Inputs component (min/max props)

---

## Complete Flow Example

### Scenario: User types "50000" in room area field

```
1. User types "5" → onChange → calc(5) → inputs.roomArea = 5
   ↓ (200ms timer starts)

2. User types "0" → onChange → calc(50) → inputs.roomArea = 50
   ↓ (timer resets)

3. User types "0" → onChange → calc(500) → inputs.roomArea = 500
   ↓ (timer resets)

4. User types "0" → onChange → calc(5000) → inputs.roomArea = 5000
   ↓ (timer resets)

5. User types "0" → onChange → calc(50000) → inputs.roomArea = 50000
   ↓ (timer resets)

6. User stops typing → 200ms passes → debouncedInputs.roomArea = 50000
   ↓

7. Recalculation happens (only ONCE)
```

### Scenario: User drags slider rapidly

```
User drags: 10 → 15 → 20 → 25 → 30 → 35 → 40 (all in 300ms)

OLD behavior:
10 → calc
15 → calc
20 → calc
25 → calc
30 → calc
35 → calc
40 → calc
= 7 recalculations ⚠️

NEW behavior:
10 → (timer starts)
15 → (timer resets)
20 → (timer resets)
25 → (timer resets)
30 → (timer resets)
35 → (timer resets)
40 → (timer resets)
... 200ms passes ...
40 → calc (only once!) ✅
```

---

## Improvements Made

### Performance Benefits:

- **Fewer recalculations**: 1 instead of 7+ during rapid input
- **Smoother UI**: Slider doesn't lag from heavy calculations
- **Battery friendly**: Less CPU usage on mobile

### User Experience:

- **Responsive**: UI updates immediately (inputs state)
- **Accurate**: Calculations settle when user stops (debouncedInputs)
- **Safe**: Validation prevents crashes (Inputs component with min/max props)

---

## Validation Strategy

Validation is handled in the Inputs component using HTML5 min/max attributes and JavaScript validation:

```tsx
// src/app/components/Inputs.tsx
<input
  type="number"
  min={min}
  max={max}
  onChange={(e) => {
    calc(Math.min(Number(e.target.value), max)); // Caps at max
  }}
  onBlur={(e) => {
    let num = Number(e.target.value);
    if (isNaN(num) || num < min) num = min; // Enforces minimum on blur
    calc(num);
  }}
/>
```

**What happens:**

- `onChange`: Caps values at the max prop during typing
- `onBlur`: Enforces minimum when user leaves the field
- `min`/`max` attributes: Provide browser validation

This keeps validation logic in one place (the Inputs component) and allows each input to have its own constraints via props.
