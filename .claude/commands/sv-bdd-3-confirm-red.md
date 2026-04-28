---
description: Step 3 — Run the suite and confirm the new test is red
---

Run the test suite and confirm the test you just wrote is **red**.

- **Backend:** `cd backend && dotnet test`
- **Frontend:** `cd spark-showroom && npm test -- --run`
  (or `frontend/showroom/` if that's where the package lives)

Paste the actual test runner output. Don't summarize — show it.

Confirm:

- The new test fails for the **right reason** — assertion mismatch or
  "not implemented", not a compile / build error.
- All previously-green tests are still green. If anything broke, stop
  and explain why before we touch step 4.

If the test passes already, it's wrong (asserting nothing, or
asserting something already true). Fix it and rerun before moving on.

End with: `RED — ready for /sv-bdd-4-green`, or a list of what's
blocking that.
