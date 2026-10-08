# How Debounce + Validation Work Together

## Layer 1: Inputs Component (UI Level)
```tsx
// src/app/components/Inputs.tsx

<input type="number"
    value={value}
    onChange={(e) => {
        calc(Math.min(Number(e.target.value), max))  // ← Immediate UI update
    }}
    onBlur={(e) => {
        let num = Number(e.target.value)
        if(isNaN(num) || num < min) num = min  // ← Final validation on blur
        calc(num)
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
        setDebouncedInputs(inputs)  // ← Updates after 150ms of no changes
    }, 150);
    return () => clearTimeout(timer);
}, [inputs]);

// Calculations use debounced values
const base = debouncedInputs.roomArea * BTU_PER_SQ_FT;
```
**What happens:**
- User drags slider → `inputs` updates immediately (UI stays responsive)
- Timer resets on every change
- After 150ms of no changes → `debouncedInputs` updates
- Recalculations only happen when user stops

---

## Layer 3: calc Functions (Validation Level)
```tsx
// src/app/BTUCalculator/BTUComponents/Main.tsx

function calcRoomArea(value: number) {
    const validated = Math.max(0, Math.min(5000, value));  // ← Range validation
    setInputs({...inputs, roomArea: validated})
}
```
**What happens:**
- Prevents negative values
- Prevents unrealistic max values (e.g., 5000 sq ft room)
- Validates before state update

---

## Complete Flow Example

### Scenario: User types "50000" in room area field

```
1. User types "5" → onChange → calc(5) → validated → inputs.roomArea = 5
   ↓ (150ms timer starts)

2. User types "0" → onChange → calc(50) → validated → inputs.roomArea = 50
   ↓ (timer resets)

3. User types "0" → onChange → calc(500) → validated → inputs.roomArea = 500
   ↓ (timer resets)

4. User types "0" → onChange → calc(5000) → validated → inputs.roomArea = 5000
   ↓ (timer resets)

5. User types "0" → onChange → calc(50000) → validated to 5000 → inputs.roomArea = 5000
   ↓ (timer resets)

6. User stops typing → 150ms passes → debouncedInputs.roomArea = 5000
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
... 150ms passes ...
40 → calc (only once!) ✅
```

---

## Why This Matters for Your Project

### Performance Benefits:
- **Fewer recalculations**: 1 instead of 7+ during rapid input
- **Smoother UI**: Slider doesn't lag from heavy calculations
- **Battery friendly**: Less CPU usage on mobile

### User Experience:
- **Responsive**: UI updates immediately (inputs state)
- **Accurate**: Calculations settle when user stops (debouncedInputs)
- **Safe**: Validation prevents crashes (calc functions + onBlur)

---

## Potential Issue & Solution

### Current Problem:
The Inputs component has its own validation (`Math.min(Number(e.target.value), max)`) that conflicts with the calc function validation.

### Example:
```tsx
// Inputs.tsx line 36
onChange={(e) => {
    calc(Math.min(Number(e.target.value), max))  // ← caps at max
}}

// Main.tsx line 37
function calcRoomArea(value: number) {
    const validated = Math.max(0, Math.min(5000, value));  // ← caps at 5000
    setInputs({...inputs, roomArea: validated})
}
```

If max=2000 (from props) but calc validates to 5000, there's a mismatch.

### Recommended Fix:
Remove validation from Inputs.tsx, keep it only in calc functions:
```tsx
// Inputs.tsx - simplified
onChange={(e) => {
    calc(Number(e.target.value))  // ← pass raw value
}}
```

This keeps validation logic in one place (the calc functions).
