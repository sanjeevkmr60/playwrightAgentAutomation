# Sauce Demo Core Operations Test Plan

## Application Overview

Validate five representative end-user operations in the live Sauce Demo e-commerce application: signing in, browsing and inspecting products, managing the cart, checkout information validation, and completing a purchase. Each scenario is independent and starts from a fresh browser state with no authenticated session and an empty cart. Use the publicly listed standard_user account (password: secret_sauce).

## Test Scenarios

### 1. Core shopper operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with the standard demo account

**File:** `tests/core-operations/sign-in.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser state.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
  2. Enter standard_user as the username and secret_sauce as the password, then select Login.
    - expect: The user is signed in and routed to the Products catalog at /inventory.html.
    - expect: The catalog displays six products and the cart is empty.

#### 1.2. Browse, sort, and inspect a product

**File:** `tests/core-operations/browse-products.spec.ts`

**Steps:**
  1. In a fresh browser state, open the site and sign in with standard_user / secret_sauce.
    - expect: The Products catalog is displayed with six products and the Sort products dropdown.
  2. Select Price (low to high) from Sort products.
    - expect: The selected sort label changes to Price (low to high).
    - expect: Sauce Labs Onesie appears first and Sauce Labs Fleece Jacket appears last in the observed product ordering.
  3. Open the Sauce Labs Backpack product details.
    - expect: The detail view shows Sauce Labs Backpack, its product description, and the $29.99 price.
    - expect: The Add to cart action is available.
  4. Select Back to products.
    - expect: The Products catalog is displayed again.

#### 1.3. Add a product and verify the cart

**File:** `tests/core-operations/cart-management.spec.ts`

**Steps:**
  1. In a fresh browser state, sign in with standard_user / secret_sauce and open the Sauce Labs Backpack details.
    - expect: The backpack detail view is displayed and the cart is empty.
  2. Select Add to cart.
    - expect: The product action changes to Remove.
    - expect: The cart control indicates 1 item.
  3. Open the cart.
    - expect: The Your Cart view contains Sauce Labs Backpack with quantity 1.
    - expect: Continue Shopping and Checkout controls are available.

#### 1.4. Block checkout when required information is missing

**File:** `tests/core-operations/checkout-validation.spec.ts`

**Steps:**
  1. In a fresh browser state, sign in with standard_user / secret_sauce, add Sauce Labs Backpack to the cart, and open the cart.
    - expect: The cart contains one backpack.
  2. Select Checkout and leave First Name, Last Name, and Zip/Postal Code blank.
    - expect: The Checkout: Your Information form displays all three fields and a Continue button.
  3. Select Continue without entering any information.
    - expect: The user remains on Checkout: Your Information.
    - expect: An error alert is displayed and progression to the order overview is blocked.

#### 1.5. Complete a purchase and verify the confirmation

**File:** `tests/core-operations/complete-purchase.spec.ts`

**Steps:**
  1. In a fresh browser state, sign in with standard_user / secret_sauce, open Sauce Labs Backpack details, select Add to cart, and open the cart.
    - expect: The cart contains one Sauce Labs Backpack.
  2. Select Checkout, enter Alex as First Name, Morgan as Last Name, and 10001 as Zip/Postal Code, then select Continue.
    - expect: The Checkout: Overview page is displayed with one backpack.
    - expect: Payment Information shows SauceCard #31337 and Shipping Information shows Free Pony Express Delivery!.
    - expect: The item total is $29.99, tax is $2.40, and total is $32.39.
  3. Select Finish.
    - expect: The Checkout: Complete! page displays Thank you for your order! and the dispatched-order confirmation message.
    - expect: The cart is empty.
