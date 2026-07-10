# JavaScript OOP Foundation - Health E-Commerce

This project is part of the **Komdigi Full Stack Developer Intermediate - Module 1 (Backend)**. The objective is to implement the fundamental concepts of **Object-Oriented Programming (OOP)** in JavaScript as the foundation for a Health E-Commerce application.

## Topics Covered

- Classes and Objects
- Constructors
- Encapsulation
- Inheritance
- Polymorphism
- Factory Pattern
- Method Implementation

## Project Structure

```
├── Product.js
├── Vitamin.js
├── SupplementFactory.js
├── test.js
├── package.json
└── README.md
```

## How to Run

Install dependencies (if any):

```bash
npm install
```

Run the test script:

```bash
npm test
```

## Test Result

Running the test command produces the following output:

```text
> komdigi-fsd-intermediate-modul-1-backend-health-ecommerce-js-foundation-starter@1.0.0 test
> node test.js

=== Testing OOP Concepts ===

1. Testing Product Base Class:
Test Product - Rp.50.000
Total for 3 units: Rp 150.000

2. Testing Inheritance (Vitamin):
Vitamin C 1000mg - 85.000

3. Testing Factory Pattern:
Vitamin D3 - 120.000

All tests completed!
Next: These classes will be integrated with MongoDB in Module 2!
```

## Expected Output

| Test | Status |
|------|--------|
| Product Base Class | ✅ Passed |
| Inheritance (Vitamin) | ✅ Passed |
| Factory Pattern | ✅ Passed |

## Learning Outcomes

After completing this module, the following OOP concepts have been successfully implemented:

- Created a reusable `Product` base class.
- Extended the base class using inheritance (`Vitamin`).
- Implemented the Factory Pattern to instantiate products.
- Tested each implementation to ensure the expected behavior.
